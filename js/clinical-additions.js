/* Future diagnoses; baseline clinical-data.js stays unchanged.
 * CI requires source-linked reviews before a new diagnosis is merged.
 */
(function(root){
"use strict";
// New RX entries use {id,kat,ad,icd,uygun,sevk,oneri,kaynak,ilac}.
// Example is documentation only, NOT an active diagnosis.
const RX=[];
const api=Object.freeze({RX});
if(typeof module!=="undefined"&&module.exports)module.exports=api;
root.DXAdditions=api;
})(typeof window!=="undefined"?window:globalThis);
