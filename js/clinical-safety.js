/* DiagnoRx clinical flag / interaction engine.
 * Engineering-only risk prompts; NOT exhaustive and NOT medical verification.
 * Pure functions are reusable in Node regression tests.
 */
(function (root) {
  "use strict";
  const RX_WARNING = "lact";
  const NSAID = /^(?:İbuprofen|Naproksen|Diklofenak|Deksketoprofen|Flurbiprofen|Ketoprofen)(?:\s|$)/;
  const QUINOLONE = /^(?:Siprofloksasin|Levofloksasin)(?:\s|$)/;
  const STEROID = /^Metilprednizolon(?:\s|$)/;
  const TOPICAL = /\b(?:jel|krem|losyon|sprey|damla|merhem)\b/i;
  function unique(values) { return [...new Set(values)]; }

  function classifyFlags(drug, selected) {
    const flags = new Set(selected || []);
    const excluded = unique((drug.x || []).filter(k => flags.has(k)));
    const cautions = (drug.w || []).filter(k => flags.has(k));
    // Historic 'preg' meant pregnancy OR breastfeeding. Never infer a definite
    // breastfeeding contraindication from it; retain a conservative review cue.
    if (flags.has("lact") && ((drug.x || []).includes("preg") ||
         (drug.w || []).includes("preg"))) cautions.push(RX_WARNING);
    return { excluded, cautions: unique(cautions) };
  }

  function systemicNSAID(name) { return NSAID.test(name) && !TOPICAL.test(name); }
  function interactionWarnings(medicines) {
    const result = [];
    const meds = (medicines || []).filter(m => m && typeof m.n === "string");
    for (let i = 0; i < meds.length; i++) for (let j = i + 1; j < meds.length; j++) {
      const a = meds[i].n, b = meds[j].n;
      if (systemicNSAID(a) && systemicNSAID(b))
        result.push(a + " + " + b + ": İki sistemik NSAİİ birlikte kullanılırsa GİS ve renal risk artabilir.");
      if ((QUINOLONE.test(a) && STEROID.test(b)) || (QUINOLONE.test(b) && STEROID.test(a)))
        result.push(a + " + " + b + ": Florokinolon ve sistemik steroid birlikte kullanılırsa tendon hasarı riski artabilir.");
    }
    return unique(result);
  }
  const api = Object.freeze({ classifyFlags, interactionWarnings });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.DXSafety = api;
})(typeof window !== "undefined" ? window : globalThis);
