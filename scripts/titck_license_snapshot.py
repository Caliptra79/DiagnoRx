#!/usr/bin/env python3
"""Check historical GTIN leads in a DATE-SPECIFIC official TİTCK XLSX.
A dated listing is NOT proof of current authorization or any KÜB content.
Reads Office Open XML using Python standard library only.
"""
import argparse
import datetime as dt
import io
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from decimal import Decimal, InvalidOperation
from pathlib import Path

SOURCE_URL = ("https://titck.gov.tr/storage/Archive/2026/dynamicModulesAttachment/"
              "RuhsatlBeeriTbbirnlerListesi07.08.2026_712c1271-5881-4c23-869a-7c43ddb4f5ad.xlsx")
SNAPSHOT_DATE = "2026-08-07"
NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
MAX_DOWNLOAD = 35_000_000

def normalized_gtin(value):
    raw = str(value or "").strip()
    if not re.fullmatch(r"\d{13}", raw):
        try:
            v = Decimal(raw)
            raw = str(int(v)) if v == v.to_integral_value() else ""
        except (InvalidOperation, ValueError):
            raw = ""
    return raw if re.fullmatch(r"\d{13}", raw) else None

def parse_xlsx(blob, expected):
    found = {code: [] for code in expected}
    sheets = 0
    examined = 0
    with zipfile.ZipFile(io.BytesIO(blob)) as archive:
        shared = []
        if "xl/sharedStrings.xml" in archive.namelist():
            tree = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            for item in tree.findall(NS + "si"):
                shared.append("".join(t.text or "" for t in item.iter(NS + "t")))
        targets = sorted(n for n in archive.namelist()
                         if re.fullmatch(r"xl/worksheets/sheet\d+\.xml", n))
        if not targets:
            raise ValueError("No XLSX worksheet XML found")
        for sheet in targets:
            sheets += 1
            with archive.open(sheet) as stream:
                for _, row in ET.iterparse(stream, events=("end",)):
                    if row.tag != NS + "row":
                        continue
                    examined += 1
                    cells = []
                    for cell in row.findall(NS + "c"):
                        val = cell.findtext(NS + "v")
                        if cell.attrib.get("t") == "s":
                            try:
                                val = shared[int(val)]
                            except (IndexError, ValueError, TypeError):
                                val = ""
                        elif cell.attrib.get("t") == "inlineStr":
                            inline = cell.find(NS + "is")
                            val = "".join(t.text or "" for t in inline.iter(NS + "t")) if inline is not None else ""
                        cells.append({"column": cell.attrib.get("r", ""), "value": str(val or "")[:180]})
                    for c in cells:
                        number = normalized_gtin(c["value"])
                        if number in found:
                            found[number].append({
                                "worksheetXml": sheet, "row": int(row.attrib.get("r", examined)),
                                "barcodeCell": c["column"], "rowPreview": cells[:20]})
                    row.clear()
    return found, {"worksheetsExamined": sheets, "rowsExamined": examined}

def compare(historical, blob, checked_on):
    codes = [str(x["gtin13"]) for x in historical["leads"]]
    found, counts = parse_xlsx(blob, set(codes))
    entries = []
    for lead in historical["leads"]:
        hits = found[str(lead["gtin13"])]
        entries.append({
            "medicineName": lead["medicineName"],
            "historicalProductName": lead["archivalProductName"],
            "gtin13": lead["gtin13"], "sgkHistoricalPage": lead["sourcePage"],
            "snapshotFinding": "GTIN_PRESENT_IN_DATED_LICENSE_LIST_REQUIRES_REVIEW"
                if hits else "GTIN_NOT_FOUND_IN_DATED_LICENSE_LIST_INCONCLUSIVE",
            "matches": hits[:4],
            "currentLicenseVerified": False, "currentKUBVerified": False,
            "clinicalApproval": False})
    return {
        "status": "DATED_LICENSE_SNAPSHOT_EVIDENCE_NOT_CURRENT_APPROVAL",
        "officialSourceUrl": SOURCE_URL,
        "sourceListDate": SNAPSHOT_DATE, "checkedOn": checked_on,
        "limitations": ("List dated 2026-08-07 is not live licensing status; no product-KUB verification. "
                        "GTIN occurrence must be visually checked against row/product/firm. "
                        "Not-found is not evidence of withdrawal."),
        "parsed": counts,
        "counts": {"historicalLeads": len(entries),
                   "presentInDatedSnapshot": sum(bool(x["matches"]) for x in entries),
                   "currentKUBVerified": 0, "clinicallyApproved": 0},
        "entries": entries}

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--fetch", action="store_true")
    p.add_argument("--input", help="Local official XLSX downloaded manually")
    p.add_argument("--output", default="audit/generated/titck-license-snapshot.json")
    a = p.parse_args()
    historical = json.loads(Path("audit/kub-historical-leads.json").read_text(encoding="utf-8"))
    checked = dt.datetime.now(dt.timezone.utc).date().isoformat()
    try:
        if a.input:
            data = Path(a.input).read_bytes()
        elif a.fetch:
            # HTTPS; only the fixed TİTCK URL. No scraped/crowdsourced data.
            with urllib.request.urlopen(SOURCE_URL, timeout=18) as response:
                if response.geturl().split("/")[2].lower() not in ("titck.gov.tr", "www.titck.gov.tr"):
                    raise ValueError("Snapshot redirected off official TİTCK domain")
                data = response.read(MAX_DOWNLOAD + 1)
        else:
            p.error("Specify --fetch or --input")
        if len(data) > MAX_DOWNLOAD:
            raise ValueError("Official snapshot is larger than permitted download")
        output = compare(historical, data, checked)
    except (OSError, ValueError, zipfile.BadZipFile, ET.ParseError) as exc:
        output = {"status": "OFFICIAL_SNAPSHOT_UNAVAILABLE_NOT_VERIFIED",
                  "sourceListDate": SNAPSHOT_DATE, "officialSourceUrl": SOURCE_URL,
                  "checkedOn": checked, "reason": str(exc)[:300],
                  "counts": {"historicalLeads":len(historical["leads"]),
                             "currentKUBVerified":0, "clinicallyApproved":0}, "entries":[]}
    dest = Path(a.output)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(output, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    print("Dated TİTCK licensing snapshot check:", output["status"], output["counts"])
    # Unavailable snapshot is visibly reported, not a false clinical pass.

if __name__ == "__main__":
    main()
