/* Namespaced user-note deletion; no medical records or app settings removed. */
(function(root){
"use strict";
function clearSavedNotes(storage){
  const keys=[];
  for(let i=0;i<storage.length;i++){
    const key=storage.key(i);
    if(key && (key.startsWith("not:rx:") || key.startsWith("not:kr:"))) keys.push(key);
  }
  for(const key of keys) storage.removeItem(key);
  return keys.length;
}
const api=Object.freeze({clearSavedNotes});
if(typeof module !== "undefined" && module.exports) module.exports=api;
root.DXNotes=api;
})(typeof window !== "undefined" ? window : globalThis);
