import io
import json
import sys
import unittest
import xml.sax.saxutils
import zipfile
from pathlib import Path

sys.path.insert(0, "scripts")
import titck_license_snapshot as checker

def synthetic_workbook():
    ns = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    strings = ["Ürün Adı", "Barkod", "PAROL TEST ONLY"]
    shared = f'<sst xmlns="{ns}" count="3" uniqueCount="3">' + "".join(
        f"<si><t>{xml.sax.saxutils.escape(s)}</t></si>" for s in strings) + "</sst>"
    sheet = (f'<worksheet xmlns="{ns}"><sheetData>'
             '<row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c></row>'
             '<row r="2"><c r="A2" t="s"><v>2</v></c><c r="B2"><v>8699717010109</v></c></row>'
             '</sheetData></worksheet>')
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", compression=zipfile.ZIP_DEFLATED) as z:
        z.writestr("xl/sharedStrings.xml", shared)
        z.writestr("xl/worksheets/sheet1.xml", sheet)
    return buf.getvalue()

class DatedSnapshotTests(unittest.TestCase):
    def test_match_and_absence_keep_unverified(self):
        sample = {"leads":[
            {"gtin13":"8699717010109","medicineName":"Parasetamol 500 mg tablet",
             "archivalProductName":"PAROL test","sourcePage":152},
            {"gtin13":"8699548123221","medicineName":"İbuprofen 400 mg tablet",
             "archivalProductName":"BRUFEN test","sourcePage":42}]}
        out = checker.compare(sample, synthetic_workbook(), "2026-10-24")
        self.assertEqual(out["counts"]["presentInDatedSnapshot"],1)
        self.assertEqual(out["counts"]["clinicallyApproved"],0)
        self.assertEqual(out["entries"][0]["snapshotFinding"],
                         "GTIN_PRESENT_IN_DATED_LICENSE_LIST_REQUIRES_REVIEW")
        self.assertEqual(out["entries"][1]["snapshotFinding"],
                         "GTIN_NOT_FOUND_IN_DATED_LICENSE_LIST_INCONCLUSIVE")
        self.assertFalse(out["entries"][0]["currentLicenseVerified"])
        self.assertFalse(out["entries"][0]["clinicalApproval"])
        self.assertEqual(out["parsed"]["rowsExamined"],2)
    def test_excel_number_notation(self):
        self.assertEqual(checker.normalized_gtin("8.699717010109E+12"),"8699717010109")
        self.assertIsNone(checker.normalized_gtin("not a barcode"))
        self.assertIsNone(checker.normalized_gtin("8699717010108.1"))

if __name__ == "__main__":
    unittest.main()
