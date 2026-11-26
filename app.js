"use strict";

/* ---------- Durum ---------- */
const KATS = [...new Set(RX.map(r => r.kat))];
let view = {name:"list"};
const ctx = new Set();
let cat = "Tümü", query = "", cur = null;
const $ = s => document.querySelector(s);
const app = $("#app");

/* ---------- Ayarlar (tema, yazı, erişilebilirlik) ---------- */
const SVGO = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const AY_DEF = {mode:"system", siyah:"0", palet:"default", yogunluk:"comfy", yazi:"normal", font:"system", cvd:"off", hareket:"auto", acilis:"on"};
function loadAy(){
  try{ const j = localStorage.getItem("dx-ayar"); if(j) return JSON.parse(j); }catch(e){}
  const o = {};
  try{
    const t = localStorage.getItem("tema"); if(t === "light" || t === "dark") o.mode = t;
    const p = localStorage.getItem("palet"); if(p) o.palet = p;
    if(localStorage.getItem("yogunluk") === "compact") o.yogunluk = "compact";
    if(localStorage.getItem("siyah") === "1") o.siyah = "1";
  }catch(e){}
  return o;
}
let AY = Object.assign({}, AY_DEF, loadAy());
if(AY.mode === "oled"){ AY.mode = "dark"; AY.siyah = "1"; }
function saveAy(){ try{ localStorage.setItem("dx-ayar", JSON.stringify(AY)); }catch(e){} }
function skyBuild(){
  let s = document.getElementById("sky");
  if(AY.palet !== "aurora"){ if(s) s.remove(); return; }
  if(s || !document.body) return;
  s = document.createElement("div"); s.id = "sky"; s.setAttribute("aria-hidden", "true");
  let h = '<i class="au au1"></i><i class="au au2"></i><i class="au au3"></i><i class="cur c1"></i><i class="cur c2"></i><i class="cur c3"></i>';
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const n = window.innerWidth < 600 ? 46 : 84;
  for(let i = 0; i < n; i++) h += `<i class="st" style="left:${(rnd()*100).toFixed(1)}%;top:${(rnd()*100).toFixed(1)}%;--s:${(rnd()*1.8+.8).toFixed(1)}px;--d:${(rnd()*6).toFixed(1)}s;--t:${(3+rnd()*5).toFixed(1)}s"></i>`;
  for(let i = 0; i < 7; i++) h += `<i class="sp" style="left:${(8+rnd()*84).toFixed(1)}%;top:${(4+rnd()*70).toFixed(1)}%;--d:${(rnd()*8).toFixed(1)}s"></i>`;
  s.innerHTML = h + '<i class="sh sh1"></i><i class="sh sh2"></i><i class="sh sh3"></i>';
  document.body.prepend(s);
}
document.addEventListener("visibilitychange", () => document.documentElement.toggleAttribute("data-paused", document.hidden));
function applyAy(){
  const r = document.documentElement;
  let dark = AY.mode === "dark";
  if(AY.mode === "system"){ try{ dark = !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches); }catch(e){} }
  r.setAttribute("data-theme", dark ? "dark" : "light");
  const set = (k, on, v) => on ? r.setAttribute(k, v) : r.removeAttribute(k);
  set("data-palette", AY.palet !== "default", AY.palet);
  set("data-density", AY.yogunluk === "compact", "compact");
  set("data-black", AY.siyah === "1", "1");
  r.setAttribute("data-fs", AY.yazi);
  r.setAttribute("data-font", AY.font);
  set("data-cvd", AY.cvd !== "off", AY.cvd);
  set("data-motion", AY.hareket === "reduce", "reduce");
  set("data-splash", AY.acilis === "off", "off");
  const m = document.querySelector('meta[name="theme-color"]');
  if(m) m.setAttribute("content", AY.palet === "aurora" ? "#060a1c" : dark ? "#1a232e" : "#3d5a80");
  skyBuild();
}
applyAy();
try{
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const ch = () => { if(AY.mode === "system") applyAy(); };
  if(mq.addEventListener) mq.addEventListener("change", ch);
}catch(e){}

/* ---------- Yardımcılar ---------- */
function drugBlockers(x){ return (x.x || []).filter(t => ctx.has(t)); }
function drugWarns(x){ return (x.w || []).filter(t => ctx.has(t)); }
function norm(s){ return s.toLocaleLowerCase("tr").normalize("NFD").replace(/[\u0300-\u036f]/g,""); }

/* ---------- Hasta durumu çubuğu ---------- */
function renderCtx(){
  const host = $("#ctxHost");
  if(view.name !== "rx"){ host.innerHTML = ""; return; }
  const open = host.querySelector("details")?.open || ctx.size > 0;
  const sel = Object.keys(CTX).filter(k => ctx.has(k));
  const sub = sel.length ? sel.map(k => CTX[k]).join(", ") : "Alerji, gebelik, böbrek gibi durumları işaretleyin";
  host.innerHTML = `<details class="hd" ${open ? "open" : ""}>
    <summary><span class="hdi">${HD_ICON}</span><span class="hdt"><span class="hdn">Hasta Durumu</span><span class="hds">${sub}</span></span>${sel.length ? `<span class="count-pill">${sel.length}</span>` : ""}<span class="hdc">${CHEV}</span></summary>
    <div class="hdb">
      <div class="opts">${Object.keys(CTX).map(k => `<button type="button" class="opt" data-ctx="${k}" aria-pressed="${ctx.has(k)}"><span class="ck">${CHECK}</span><span>${CTX[k]}</span></button>`).join("")}</div>
      <p class="hint">Seçtiğiniz durumlarda uygun olmayan ilaçlar işaretlenir; doz ayarı gerekenler için uyarı gösterilir.</p>
      ${sel.length ? `<button type="button" class="ctxclear" data-ctxclear>Seçimleri temizle</button>` : ""}
    </div></details>`;
}

/* ---------- Liste görünümü ---------- */
function listShell(){
  return segHTML("list") + `<div class="search"><input id="q" type="search" placeholder="Tanı, ilaç veya ICD kodu ara" value="${query.replace(/"/g,"&quot;")}" autocomplete="off" aria-label="Ara"></div>
  ${catSelHTML()}
  <div id="results"></div>`;
}
const CHEV = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
function catCount(c){ return c === "Tümü" ? RX.length : RX.filter(r => r.kat === c).length; }
function catSelHTML(){
  const cats = ["Tümü", ...KATS];
  const kAttr = c => c === "Tümü" ? "" : ` data-k="${KATS.indexOf(c)}"`;
  return `<div class="catsel">
    <button type="button" class="catbtn" id="catBtn" aria-haspopup="listbox" aria-expanded="false"><span class="ci" id="catIco">${catIcon("Tümü")}</span><span class="lbl" id="catLbl">Tümü</span><span class="cnt" id="catCnt"></span>${CHEV}</button>
    <div class="catpanel" id="catPanel" role="listbox" aria-label="Bölüm seçin" hidden>${cats.map(c => `<button type="button" class="catopt" role="option" data-cat="${c}"${kAttr(c)} aria-selected="false"><span class="ci">${catIcon(c)}</span><span class="nm">${c}</span><span class="cnt">${catCount(c)}</span></button>`).join("")}</div>
  </div>`;
}
function updateCatUI(){
  const btn = $("#catBtn"); if(!btn) return;
  if(cat === "Tümü") btn.removeAttribute("data-k"); else btn.setAttribute("data-k", KATS.indexOf(cat));
  $("#catLbl").textContent = cat; $("#catCnt").textContent = catCount(cat); $("#catIco").innerHTML = catIcon(cat);
  document.querySelectorAll("#catPanel .catopt").forEach(b => b.setAttribute("aria-selected", b.dataset.cat === cat));
}
function toggleCat(force){
  const panel = $("#catPanel"), btn = $("#catBtn"); if(!panel || !btn) return;
  const open = force === undefined ? panel.hidden : force;
  panel.hidden = !open; btn.setAttribute("aria-expanded", String(open));
}
function renderResults(){
  const nq = norm(query.trim());
  const f = RX.filter(r => (cat === "Tümü" || r.kat === cat) &&
    (!nq || norm([r.ad, r.icd, r.kat, ...r.ilac.map(i => i.n)].join(" ")).includes(nq)))
    .map((r, i) => [r, i]).sort((x, y) => (KATS.indexOf(x[0].kat) - KATS.indexOf(y[0].kat)) || (x[1] - y[1])).map(x => x[0]);
  const card = r => `<li><button type="button" class="item" data-go="rx:${r.id}" data-k="${KATS.indexOf(r.kat)}"><span class="ib">${catIcon(r.kat)}</span><span class="tx"><span class="t">${r.ad}</span><span class="m"><span class="k">${r.kat}</span><span>${r.icd}</span>${hasNote("rx:" + r.id) ? `<span class="nd" title="Notunuz var">${NOTE_ICON}</span>` : ""}</span></span></button></li>`;
  let html = `<p class="resultcount">${f.length} reçete</p>`;
  if(!f.length){
    html += `<div class="empty">Eşleşen reçete yok. Aramayı kısaltın veya kategori seçimini "Tümü" yapın.</div>`;
  }else{
    const groups = [];
    f.forEach(r => { const g = groups[groups.length - 1]; if(g && g.kat === r.kat) g.items.push(r); else groups.push({kat:r.kat, items:[r]}); });
    html += groups.map(g => `<div class="grouphead" data-k="${KATS.indexOf(g.kat)}"><span class="gh">${catIcon(g.kat)}${g.kat}</span><span>${g.items.length} reçete</span></div><ul class="list">${g.items.map(card).join("")}</ul>`).join("");
  }
  $("#results").innerHTML = html;
  updateCatUI();
}

function brandsFor(n){ for(const [re,b] of BR){ if(re.test(n)) return b; } return []; }

function pillsHTML(br){
  const LIM = 5, pill = b => `<span class="pill${VERIFIED.has(b) ? " ok" : ""}">${b}</span>`;
  if(br.length <= LIM) return br.map(pill).join("");
  return br.slice(0, LIM).map(pill).join("") + `<span class="morep" hidden>${br.slice(LIM).map(pill).join("")}</span><button type="button" class="morebtn" data-more aria-label="Diğer piyasa adlarını göster">+${br.length - LIM} daha</button>`;
}
function medHTML(x, no){
  const bl = drugBlockers(x), wr = drugWarns(x), bad = bl.length > 0;
  const m = x.n.match(/^(.*?)(\s(?:\d|%).*)?$/), gen = m[1], form = m[2] || "";
  const br = brandsFor(x.n);
  return `<li class="med ${bad ? "bad" : ""}"><span class="no">${no}</span><div class="mb">
    ${x.c ? `<span class="cond">${x.c}</span>` : ""}
    <div class="gen"><span class="fi">${formIcon(x.n)}</span><span class="gn"><b>${gen}</b>${form}</span></div>
    <div class="row"><span class="bl">Piyasa adı</span><span>${br.length ? pillsHTML(br) : `<span class="nb">${/^(Burun serum|Emolient|Nemlendirici|Kulak damlası, serumen|Hızlı etkili karbonhidrat|Kompleks karbonhidrat|Kalamin)/.test(x.n) ? "reçetesiz ürün, marka seçimi serbest" : /majistral/.test(x.n) ? "majistral formül, eczanede hazırlanır" : "ilacabak'ta henüz doğrulanmadı"}</span>`}</span></div>
    <div class="row"><span class="bl">Kullanım</span><span>${x.d}</span></div>
    <div class="row"><span class="bl">Süre, adet</span><span>${[x.s, x.k ? "toplam " + x.k : ""].filter(Boolean).join(", ")}</span></div>
    ${x.t ? `<div class="note">${x.t}</div>` : ""}
    ${bad ? `<div class="bad-note">Bu hastada uygun değil: ${bl.map(t => CTXWHY[t]).join(", ")}</div>` : ""}
    ${wr.length && !bad ? `<div class="w-note">Dikkat: ${wr.map(t => CTXWHY[t]).join(", ")} nedeniyle doz ayarı veya ek önlem gerekebilir</div>` : ""}
    ${bad ? "" : ruleWarns(x).map(([lbl, why]) => `<div><span class="w-note">Dikkat (${lbl}): ${why}</span></div>`).join("")}
  </div></li>`;
}
function detailHTML(r){
  let n = 0;
  const list = g => r.ilac.filter(x => x.g === g).map(x => medHTML(x, ++n)).join("");
  const ana = list("ana"), dst = list("destek");
  let a = 0;
  const alt = r.ilac.filter(x => x.g === "alt").map(x => medHTML(x, String.fromCharCode(65 + a++))).join("");
  return `<button type="button" class="back" data-go="list">Tüm reçeteler</button>
  <article class="sheet">
    <header class="sh"><span class="rxm" aria-hidden="true">℞</span><div><h2>${r.ad}</h2><p class="mt"><span>ICD-10: ${r.icd}</span><span>${r.kat}</span></p></div><button type="button" class="shbtn" data-share="rx:${r.id}" aria-label="Bağlantıyı paylaş" title="Bağlantıyı paylaş">${SHARE_ICON}</button></header>
    ${ana ? `<h3 class="sec">Reçete</h3><ol class="meds">${ana}</ol>` : ""}
    ${dst ? `<h3 class="sec">${ana ? "Destek tedavi" : "Reçete"}</h3><ol class="meds">${dst}</ol>` : ""}
    ${alt ? `<h3 class="sec alt">Alternatif seçenekler</h3><p class="sechint">Birinci seçenek kullanılamıyorsa veya hastaya uygun değilse.</p><ol class="meds">${alt}</ol>` : ""}
    <p class="sign">Dozlar erişkin içindir. Çocuk hastada Pediatrik Doz Hesaplayıcı'yı kullanın. Piyasa adları ve SUT reçeteleme kısıtlamaları ilacabak.com kayıtlarına dayanır; ilaç adlarının sırası öneri değildir.</p>
  </article>
  <div class="card ok"><h3>Reçeteyle taburculuğa uygun olma koşulu</h3><p style="margin:0">${r.uygun}</p></div>
  <div class="card red"><h3>Reçeteyle taburcu etmeyin, sevk edin veya gözlemleyin</h3><ul>${r.sevk.map(s => `<li>${s}</li>`).join("")}</ul></div>
  <div class="card"><h3>Hastaya öneriler</h3><ul>${r.oneri.map(s => `<li>${s}</li>`).join("")}</ul></div>
  ${noteCard("rx:" + r.id)}
  <p class="src">Dayanak: ${r.kaynak}. Yayın öncesinde güncel kılavuzla doğrulanmalıdır.</p>`;
}

/* ---------- Kronik hasta görünümleri ---------- */
function segHTML(active){
  return `<div class="seg" role="tablist">
    <button type="button" data-go="list" aria-pressed="${active === "list"}">${ICON_RX}<span>Tanıya Göre Hazır Reçete</span></button>
    <button type="button" data-go="kronik" aria-pressed="${active === "kronik"}">${ICON_REPORT}<span>Raporlu İlaç Reçeteleri</span></button>
  </div>`;
}
function kronikListHTML(){
  return segHTML("kronik") + `<p class="hint" style="margin:0 0 10px">Bilinen kronik hastalığı olan ve raporlu ilaç kullanan hastada reçeteyi yazmadan önce bakılacaklar: rapor koşulu, kontrol listesi ve sevk durumları. Bu notlar ilaç veya doz değiştirmez.</p>
  <ul class="list">${KR.map((k, i) => `<li><button type="button" class="item" data-go="kr:${k.id}" data-k="6"><span class="ib">${catIcon("Rapor")}</span><span class="tx"><span class="t">${k.ad}</span><span class="m"><span class="k">Raporlu ilaç reçetesi</span><span>${k.icd}</span>${hasNote("kr:" + k.id) ? `<span class="nd" title="Notunuz var">${NOTE_ICON}</span>` : ""}</span></span></button></li>`).join("")}</ul>`;
}
function krHTML(k){
  const ul = a => `<ul class="chk">${a.map(x => `<li>${x}</li>`).join("")}</ul>`;
  return `<button type="button" class="back" data-go="kronik">Raporlu ilaç reçeteleri</button>
  <article class="sheet">
    <header class="sh"><span class="rxm" aria-hidden="true">↻</span><div><h2>${k.ad}</h2><p class="mt"><span>ICD-10: ${k.icd}</span><span>Raporlu ilaç reçetesi notu</span></p></div><button type="button" class="shbtn" data-share="kr:${k.id}" aria-label="Bağlantıyı paylaş" title="Bağlantıyı paylaş">${SHARE_ICON}</button></header>
    <p class="sechint" style="margin:12px 0 0">Hastanın mevcut ilacı ve dozu aynen sürdürülür; bu not doz veya ilaç değişikliği için değildir.</p>
    ${k.rapor ? `<h3 class="sec">Rapor koşulları (SUT)</h3>${ul(k.rapor)}` : ""}
    <h3 class="sec">Yazmadan önce kontrol edin</h3>${ul(k.kontrol)}
    <h3 class="sec alt">Yazmayın, değerlendirin veya sevk edin</h3>${ul(k.sevk)}
    <h3 class="sec">Sık kullanılan ilaç grupları</h3>
    <ol class="meds">${k.gruplar.map((g, i) => `<li class="med"><span class="no">${i + 1}</span><div class="mb"><div class="gen"><b>${g.g}</b></div><div class="row"><span class="bl">Etken madde</span><span>${g.e}</span></div>${g.t ? `<div class="note">${g.t}</div>` : ""}</div></li>`).join("")}</ol>
    <h3 class="sec">Hastaya hatırlatın</h3>${ul(k.hatirlat)}
    ${k.sut ? `<p class="sign">${k.sut}</p>` : ""}
    ${noteCard("kr:" + k.id)}
    <p class="sign">SUT 4.1.1 gereği aile hekimleri aile hekimliği uzmanının yazabildiği ilaçları reçete edebilir; ilacın rapor koşulu, miktar ve süre sınırları için güncel SUT ve hastanın raporunu kontrol edin. Dayanak: ${k.kaynak}.</p>
  </article>`;
}

/* ---------- İkonlar ---------- */
const SV = (d, n = 20) => `<svg viewBox="0 0 24 24" width="${n}" height="${n}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const CAT_ICO = {
  "Solunum / KBB": SV('<path d="M3 8h10a3 3 0 1 0-3-3"/><path d="M3 12h14a3 3 0 1 1-3 3"/><path d="M3 16h7"/>'),
  "Sindirim": SV('<path d="M7 3v6M5 3v6a2 2 0 0 0 4 0V3M7 9v12"/><path d="M17 3c-2 2-2 6 0 8v10"/>'),
  "Üriner ve Jinekoloji": SV('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
  "Kas-İskelet ve Ağrı": SV('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
  "Cilt, Göz ve Diş": SV('<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>'),
  "Kan ve Vitamin Eksiklikleri": SV('<path d="M9 3h6v3H9z"/><rect x="6" y="6" width="12" height="14" rx="3"/><path d="M12 20v2"/><path d="M12 10v6M9 13h6"/>'),
  "Psikiyatri": SV('<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>'),
  "Kronik Hastalık Alevlenmesi": SV('<path d="M3 12h4l2-5 4 10 2-5h6"/>'),
  "Enfeksiyon": SV('<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'),
  "Tümü": SV('<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>'),
  "Rapor": SV('<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>')
};
const catIcon = c => CAT_ICO[c] || CAT_ICO["Tümü"];
const SHARE_ICON = SV('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/>', 20);
const NOTE_ICON = SV('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>', 14);
const HD_ICON = SV('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M19 8v6M16 11h6"/>', 22);
const CHECK = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>';
const ICON_RX = SV('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>', 22);
const ICON_REPORT = SV('<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>', 22);
const FORM_ICO = {
  tab: SV('<circle cx="12" cy="12" r="8"/><path d="M4 12h16"/>'),
  cap: SV('<rect x="3" y="8" width="18" height="8" rx="4"/><path d="M12 8v8"/>'),
  tube: SV('<path d="M9 3h6v4H9z"/><path d="M8 7h8l-1 14H9z"/>'),
  drop: SV('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
  inh: SV('<path d="M3 8h10a3 3 0 1 0-3-3"/><path d="M3 12h14a3 3 0 1 1-3 3"/><path d="M3 16h7"/>'),
  amp: SV('<path d="M10 3h4M12 3v3"/><rect x="8" y="6" width="8" height="15" rx="2"/><path d="M8 11h8"/>'),
  bottle: SV('<path d="M10 3h4v3l2 3v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z"/><path d="M8 13h8"/>'),
  sup: SV('<path d="M5 12c0-4 4-7 11-7 3 0 3 4 3 7s0 7-3 7c-7 0-11-3-11-7z"/>')
};
function formIcon(n){
  const t = n.toLocaleLowerCase("tr");
  if(/inhaler/.test(t)) return FORM_ICO.inh;
  if(/ampul|flakon|\bim\b/.test(t)) return FORM_ICO.amp;
  if(/supozituvar/.test(t)) return FORM_ICO.sup;
  if(/kapsül/.test(t)) return FORM_ICO.cap;
  if(/krem|jel|pomad|merhem/.test(t)) return FORM_ICO.tube;
  if(/damla/.test(t)) return FORM_ICO.drop;
  if(/şampuan|sprey|gargara|süspansiyon|çözelti|şurup|poşet|toz|yıkama/.test(t)) return FORM_ICO.bottle;
  return FORM_ICO.tab;
}

/* ---------- Ayarlar sayfası ---------- */
const PALETS = [["default","Gri-Mavi","#3d5a80"],["ocean","Okyanus","#1f6fa8"],["mint","Nane","#2f7d6b"],["forest","Orman","#3b7a3e"],["lavender","Lavanta","#6b5ca5"],["rose","Gül","#b0446a"],["sunset","Gün Batımı","#c0562a"],["graphite","Grafit","#4a5568"],["aurora","Aurora (canlı)","#6ff2d0"]];
function setOpts(key, list){
  return `<div class="pals">${list.map(([v, l, c]) => `<button type="button" class="pal" data-set="${key}:${v}" aria-pressed="${AY[key] === v}">${c ? `<span class="sw" style="background:${c}"></span>` : ""}${l}</button>`).join("")}</div>`;
}
function settingsHTML(){
  return `<button type="button" class="back" data-go="list">Geri</button>
  <article class="sheet">
    <header class="sh"><span class="rxm" aria-hidden="true">${SV('<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>', 38)}</span><div><h2>Ayarlar</h2><p class="mt"><span>Görünüm, yazı ve erişilebilirlik</span></p></div></header>
    <h3 class="sec">Görünüm</h3>
    <p class="lgh">Tema</p>${setOpts("mode", [["system","Sistem"],["light","Açık"],["dark","Koyu"]])}
    <p class="lgh">Koyu temada zemin</p>${setOpts("siyah", [["0","Standart"],["1","Saf siyah"]])}
    <p class="lgh">Renk paleti</p>${setOpts("palet", PALETS)}
    <p class="lgh">Liste yoğunluğu</p>${setOpts("yogunluk", [["comfy","Rahat"],["compact","Sıkı"]])}
    <h3 class="sec">Yazı</h3>
    <p class="lgh">Yazı boyutu</p>${setOpts("yazi", [["small","Küçük"],["normal","Normal"],["large","Büyük"],["xl","Çok büyük"]])}
    <p class="lgh">Yazı stili</p>${setOpts("font", [["system","Sistem"],["serif","Serif"],["readable","Okunaklı"]])}
    <div class="preview"><b>Amoksisilin-klavulanat 1000 mg</b><br>2x1 (tok karnına), 7 gün. Penisilin alerjisinde kullanmayın.</div>
    <h3 class="sec">Erişilebilirlik</h3>
    <p class="lgh">Renk körlüğü</p>${setOpts("cvd", [["off","Kapalı"],["rg","Kırmızı-yeşil"],["mono","Gri tonlama"]])}
    <p class="hint" style="margin:4px 0 0">Kırmızı-yeşil modunda uyarı renkleri mavi ve turuncuya çevrilir, bölüm renkleri ayırt edilebilir tonlara geçer. Bölümler her durumda simgeleriyle de tanınır.</p>
    <p class="lgh">Hareket</p>${setOpts("hareket", [["auto","Sistem"],["reduce","Azalt"]])}
    <p class="lgh">Açılış ekranı</p>${setOpts("acilis", [["on","Açık"],["off","Kapalı"]])}
    <button type="button" class="btn-reset" data-reset>Ayarları sıfırla</button>
  </article>`;
}

/* ---------- Özdeyiş ---------- */
function mottoHTML(){
  return `<div class="motto"><p class="son">Karar destek aracıdır, son karar hekime aittir</p><p class="quote">“Beni Türk hekimlerine emanet ediniz.”</p>${SIGN ? `<img class="sign" src="${SIGN}" alt="K. Atatürk imzası">` : ""}<p class="cp">© 2026 DiagnoRx</p></div>`;
}
function updateDate(){
  try{ $("#dateLine").textContent = new Date().toLocaleDateString("tr-TR", {day:"numeric", month:"long", year:"numeric", weekday:"long"}); }catch(e){}
}

/* ---------- Hakkında ---------- */

const LEG_FORM = [["tab","Tablet, draje"],["cap","Kapsül"],["tube","Krem, jel, pomad"],["drop","Göz veya kulak damlası"],["inh","İnhaler"],["amp","Ampul, flakon, enjeksiyon"],["bottle","Şurup, süspansiyon, sprey, gargara, şampuan, çözelti, poşet"],["sup","Supozituvar"]];
function legendHTML(){
  const row = (ico, txt) => `<div class="lg"><span class="lgi">${ico}</span><span>${txt}</span></div>`;
  return `<h3 class="sec">İlaç şekli simgeleri</h3>
    <p class="sechint" style="margin:0 0 8px">Her ilacın adının solundaki simge ilacın şeklini gösterir. Piyasa adlarının yanındaki ✓ işareti, ürünün 2026 yılında ilacabak veya ilacrehberi'nde güncel fiyat listesinde görüldüğünü belirtir; işaretsizler henüz tek tek kontrol edilmemiştir.</p>
    <div class="legend">${LEG_FORM.map(([k, t]) => row(FORM_ICO[k], t)).join("")}</div>`;
}
function aboutHTML(){
  const li = a => `<ul class="chk">${a.map(x => `<li>${x}</li>`).join("")}</ul>`;
  return `<button type="button" class="back" data-go="list">Geri</button>
  <article class="sheet">
    <header class="sh"><img class="about-logo" src="${LOGO}" width="56" height="56" alt=""><div><h2>DiagnoRx</h2><p class="mt"><span>Sürüm ${APP_VERSION}</span><span>Veri tarihi: ${DATA_DATE}</span></p></div></header>
    ${legendHTML()}
    <h3 class="sec">Kapsam</h3>${li([`${RX.length} tanıya göre hazır reçete ve ${KR.length} raporlu ilaç notu`,"Acil servis ve aile hekimliği için erişkin dozları; çocuklarda Pediatrik Doz Hesaplayıcı kullanılmalıdır","Kırmızı ve yeşil reçeteli ilaçlar kapsam dışıdır","İlaçlar etken madde ve piyasa adıyla verilir; markalar tüm eşdeğerleri kapsamaz"])}
    <h3 class="sec">Kaynaklar</h3>${li(["İlaç ve piyasa adı bilgileri: ilacabak.com, ilacrehberi.com, TİTCK kısa ürün bilgisi ve kullanma talimatları, vademecum.es","SUT kısıtları: ilacabak'ın SUT sayfalarından okunan EK-4/E ve EK-4/F listeleri ile 4.2.15, 4.2.19, 4.2.24, 4.2.28 ve 4.2.38 maddeleri","Klinik yaklaşım: ilgili uluslararası ve ulusal rehberler (her reçetenin altında dayanak satırı)"])}
    <h3 class="sec alt">Sorumluluk ve sınırlar</h3>${li(["DiagnoRx bir karar destek taslağıdır; muayene, tanı ve reçete sorumluluğu hekime aittir","Doz ve SUT bilgileri yayın tarihinde derlenmiştir; güncel prospektüs ve SUT ile doğrulanmalıdır","Bazı ilaç grupları için SUT'ta rapor koşulu başka maddelerde bulunabilir; okunmayan maddeler doğrulanmış sayılmaz"])}
    <details class="lic">
      <summary>Telif, Lisans ve Gizlilik</summary>
      <div class="licb">
        <p class="lgh">Hedef kitle</p>
        ${li(["DiagnoRx yalnızca sağlık profesyonellerine yöneliktir; halka açık bilgilendirme veya ilaç tanıtımı amacı taşımaz"])}
        <p class="lgh">Bu uygulama</p>
        ${li(["© 2026 DiagnoRx. Tüm hakları saklıdır","Uygulamanın düzeni, metin derlemesi ve tasarımı DiagnoRx'e aittir; izinsiz çoğaltılamaz ve dağıtılamaz"])}
        <p class="lgh">Bilgi kaynakları</p>
        ${li(["İlaç adı, doz ve SUT kuralları gibi olgusal bilgiler kaynaklardan derlenmiştir; kaynak sitelerin metinleri kopyalanmamıştır","İlacabak.com içeriği © 2005–2026 İlacabak.com'a aittir; yalnızca tek tek ürün ve kural bilgileri başvuru amacıyla kullanılmıştır","TİTCK kısa ürün bilgisi ve kullanma talimatları ile SUT (Resmî Gazete'de yayımlanan Tebliğ) kamuya açık belgelerdir","İlacrehberi.com ve vademecum.es kayıtları yalnızca ürün varlığını doğrulamak için kullanılmıştır"])}
        <p class="lgh">Markalar ve ürün adları</p>
        ${li(["Ürün adları ilgili firmaların tescilli markalarıdır; yalnızca ilacı tanımlamak amacıyla kullanılmıştır","DiagnoRx bu firmalarla bağlantılı değildir; hiçbir ürünü tanıtmaz ve sıralama bir öneri değildir"])}
        <p class="lgh">Görseller ve söz</p>
        ${li(["Uygulama logosu ve imza görseli uygulama sahibi tarafından sağlanmıştır; kullanım hakkı ve kaynak sorumluluğu sahibine aittir","Atatürk'e atfedilen söz alıntıdır; saygı çerçevesinde ve kaynak gösterilerek kullanılmıştır"])}
        <p class="lgh">Yazı tipleri</p>
        ${li(["Uygulama harici yazı tipi yüklemez; cihazın sistem yazı tipleri (Georgia, Palatino vb.) kullanılır"])}
        <p class="lgh">Gizlilik</p>
        ${li(["Uygulama kişisel veri toplamaz ve hiçbir sunucuya veri göndermez","Notlarınız, tema ve görünüm tercihleriniz yalnızca cihazınızda saklanır","Paylaşma bağlantısı yalnızca reçetenin adresini içerir; hasta bilgisi içermez"])}
        <p class="lgh">Simgeler</p>
        ${li(["Bazı simgeler Lucide (ISC) ve Feather (MIT) simge kümelerinden uyarlanmıştır; diğerleri özgündür"])}
        <details class="lic2"><summary>Lucide (ISC) lisans metni</summary><pre>ISC License

Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.</pre></details>
        <details class="lic2"><summary>Feather (MIT) lisans metni</summary><pre>The MIT License (MIT) (for portions derived from Feather)

Copyright (c) 2013-2023 Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</pre></details>
      </div>
    </details>
    ${mottoHTML()}
  </article>`;
}

/* ---------- Kişisel not ve paylaşım ---------- */
const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function getNote(key){ try{ return localStorage.getItem("not:" + key) || ""; }catch(e){ return ""; } }
function saveNote(key, v){ try{ if(v.trim()) localStorage.setItem("not:" + key, v); else localStorage.removeItem("not:" + key); }catch(e){} }
const hasNote = key => !!getNote(key);
function noteCard(key){
  return `<div class="card"><h3>Notum</h3><textarea class="mynote" data-note="${key}" rows="3" placeholder="Bu reçete için kendi notunuz (örneğin kliniğinizde bulunmayan ilaç)" aria-label="Kişisel not">${esc(getNote(key))}</textarea><p class="hint" style="margin:6px 0 0">Notunuz yalnızca bu cihazda saklanır; başka kimse görmez.</p></div>`;
}
function toast(msg){
  const el = $("#toast"); if(!el) return;
  el.textContent = msg; el.classList.add("on");
  clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove("on"), 1900);
}
async function shareLink(t){
  const i = t.indexOf(":"), kind = t.slice(0, i), id = t.slice(i + 1);
  const url = location.href.split("#")[0] + (kind === "kr" ? "#k=" : "#r=") + id;
  const item = kind === "kr" ? KR.find(k => k.id === id) : RX.find(r => r.id === id);
  try{ if(navigator.share){ await navigator.share({title:"DiagnoRx: " + (item ? item.ad : ""), url}); return; } }
  catch(e){ if(e && e.name === "AbortError") return; }
  try{ await navigator.clipboard.writeText(url); toast("Bağlantı kopyalandı"); }
  catch(e){ toast("Bağlantı kopyalanamadı"); }
}
function openFromHash(){
  const m = /^#([rk])=([\w-]+)$/.exec(location.hash || "");
  if(!m) return;
  const id = m[2], isK = m[1] === "k";
  if(isK ? KR.some(k => k.id === id) : RX.some(r => r.id === id)) go((isK ? "kr:" : "rx:") + id);
}

/* ---------- Yönlendirme ve olaylar ---------- */
const vstack = [];   // geri dönüş yığını: önceki görünüm ve kaydırma konumu
function pushHist(){ try{ history.pushState({dx:1}, ""); return true; }catch(e){ return false; } }
function go(t){
  let nv;
  if(t === "list") nv = {name:"list"};
  else if(t === "kronik") nv = {name:"kronik"};
  else if(t === "about") nv = {name:"about"};
  else if(t === "settings") nv = {name:"settings"};
  else if(t.startsWith("rx:")){
    const r = RX.find(x => x.id === t.slice(3)); if(!r) return;
    cur = r; nv = {name:"rx"};
  }else if(t.startsWith("kr:")){
    const k = KR.find(x => x.id === t.slice(3)); if(!k) return;
    cur = k; nv = {name:"kr"};
  }else return;
  const fwd = nv.name === "about" || nv.name === "settings" || nv.name === "rx" || nv.name === "kr";
  if(fwd) vstack.push({view:{name:view.name}, y:window.scrollY, h:pushHist()});
  else vstack.length = 0;
  view = nv;
  route();
}
function goBack(){
  const prev = vstack.pop();
  view = prev ? prev.view : {name:"list"};
  route();
  if(prev) window.scrollTo(0, prev.y);
}
function route(){
  if(view.name === "rx") app.innerHTML = detailHTML(cur);
  else if(view.name === "kr") app.innerHTML = krHTML(cur);
  else if(view.name === "kronik") app.innerHTML = kronikListHTML();
  else if(view.name === "about") app.innerHTML = aboutHTML();
  else if(view.name === "settings") app.innerHTML = settingsHTML();
  else { app.innerHTML = listShell(); renderResults(); }
  $("#foot").innerHTML = view.name === "about" ? "" : mottoHTML();
  renderCtx();
  app.classList.remove("enter"); void app.offsetWidth; app.classList.add("enter");
  window.scrollTo(0, 0);
}
document.addEventListener("click", e => {
  if(e.target.closest("[data-ctxclear]")){
    ctx.clear(); const y = window.scrollY;
    if(view.name === "rx" && cur) app.innerHTML = detailHTML(cur);
    renderCtx(); window.scrollTo(0, y); return;
  }
  const c = e.target.closest("[data-ctx]");
  if(c){
    const k = c.dataset.ctx;
    ctx.has(k) ? ctx.delete(k) : ctx.add(k);
    const y = window.scrollY;
    if(view.name === "rx" && cur) app.innerHTML = detailHTML(cur);
    renderCtx(); window.scrollTo(0, y);
    return;
  }
  const mb = e.target.closest("[data-more]");
  if(mb){ const w = mb.previousElementSibling; if(w) w.hidden = false; mb.remove(); return; }
  const shb = e.target.closest("[data-share]");
  if(shb){ shareLink(shb.dataset.share); return; }
  const bk = e.target.closest(".back");
  if(bk){
    const top = vstack[vstack.length - 1];
    if(top && top.h){ try{ history.back(); return; }catch(err){} }
    goBack(); return;
  }
  const st = e.target.closest("[data-set]");
  if(st){
    const i = st.dataset.set.indexOf(":"), k = st.dataset.set.slice(0, i), v = st.dataset.set.slice(i + 1);
    AY[k] = v; saveAy(); applyAy();
    document.querySelectorAll("[data-set]").forEach(b => { const j = b.dataset.set.indexOf(":"); if(b.dataset.set.slice(0, j) === k) b.setAttribute("aria-pressed", String(b.dataset.set.slice(j + 1) === v)); });
    return;
  }
  if(e.target.closest("[data-reset]")){
    AY = Object.assign({}, AY_DEF); saveAy(); applyAy();
    if(view.name === "settings") app.innerHTML = settingsHTML();
    toast("Ayarlar sıfırlandı"); return;
  }
  const nav = e.target.closest("[data-go]");
  if(nav){ go(nav.dataset.go); return; }
  if(e.target.closest("#catBtn")){ toggleCat(); return; }
  const g = e.target.closest("[data-cat]");
  if(g){ cat = g.dataset.cat; renderResults(); toggleCat(false); return; }
  if(!e.target.closest(".catsel")) toggleCat(false);
});
window.addEventListener("popstate", () => { if(vstack.length) goBack(); });
window.addEventListener("hashchange", openFromHash);
document.addEventListener("keydown", e => { if(e.key === "Escape") toggleCat(false); });
document.addEventListener("input", e => {
  if(e.target.dataset && e.target.dataset.note){ saveNote(e.target.dataset.note, e.target.value); return; }
  if(e.target.id === "q"){ query = e.target.value; renderResults(); }
});

route();
openFromHash();
updateDate();
document.addEventListener("visibilitychange", () => { if(!document.hidden) updateDate(); });
const _dt = setInterval(updateDate, 60000); if(_dt && _dt.unref) _dt.unref();
try{ $("#splashLogo").src = LOGO; }catch(e){}

/* ---------- Çevrimdışı kullanım (service worker) ---------- */
if("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
