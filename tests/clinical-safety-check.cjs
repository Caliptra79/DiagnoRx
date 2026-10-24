"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const Safety=require("../js/clinical-safety.js");
const sample={n:"Doksisiklin 100 mg kapsül",x:["preg"],w:["renal"]};
function check(flags){return Safety.classifyFlags(sample,new Set(flags));}
assert.deepEqual(check([]),{excluded:[],cautions:[]},"No selected flags");
assert.deepEqual(check(["preg"]),{excluded:["preg"],cautions:[]},"Pregnancy follows legacy restriction");
assert.deepEqual(check(["lact"]),{excluded:[],cautions:["lact"]},
  "Legacy pregnancy flag must NOT automatically contraindicate lactation");
assert.deepEqual(check(["lact","preg","renal"]),
  {excluded:["preg"],cautions:["renal","lact"]},"Keep distinct flags when both selected");
const extra={n:"Drug",x:["renal"],w:["lact"]};
assert.deepEqual(Safety.classifyFlags(extra,["lact"]),{excluded:[],cautions:["lact"]});
assert.deepEqual(Safety.classifyFlags(extra,["renal"]),{excluded:["renal"],cautions:[]});
const interact=(...names)=>Safety.interactionWarnings(names.map(n=>({n})));
assert.equal(interact("İbuprofen 400 mg tablet","Naproksen 500 mg tablet").length,1);
assert.equal(interact("İbuprofen 400 mg tablet","İbuprofen 400 mg tablet").length,1,
  "Duplicate NSAID entry should be flagged");
assert.equal(interact("Diklofenak %1 jel","İbuprofen 400 mg tablet").length,0,
  "Do not treat topical product as another systemic NSAID");
assert.equal(interact("Levofloksasin 750 mg tablet","Metilprednizolon 16 mg tablet").length,1);
assert.equal(interact("Siprofloksasin 500 mg tablet","Metilprednizolon 16 mg tablet").length,1);
assert.equal(interact("Levofloksasin 750 mg tablet","Parasetamol 500 mg tablet").length,0);
assert.equal(interact().length,0);
const html=fs.readFileSync("index.html","utf8");
const sw=fs.readFileSync("sw.js","utf8");
assert(html.includes('<script src="./js/clinical-safety.js"></script>'),"Clinical safety script exists");
assert(html.indexOf('<script src="./js/clinical-safety.js"></script>') < html.indexOf('<script>'),"Safety loads before main app");
assert(html.includes('<script src="./js/note-storage.js"></script>'),"Privacy helper loads before main app");
assert.match(html,/Birlikte kullanılırsa olası ilaç etkileşimleri/);
assert.match(html,/Hasta adı, kimlik veya diğer kişisel sağlık bilgilerini yazmayın/);
assert.match(sw,/\.\/js\/clinical-safety\.js/,"Offline shell must cache clinical module");
console.log("PASS: separate patient contexts, non-exhaustive interaction rules and offline module");
