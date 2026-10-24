"use strict";
const assert=require("node:assert/strict");
const {clearSavedNotes}=require("../js/note-storage.js");
function mock(entries){
  const data=new Map(entries);
  return {data,get length(){return data.size},key(i){return [...data.keys()][i]??null},
  removeItem(k){data.delete(k)}};
}
const s=mock([["not:rx:usye","note 1"],["dx-ayar","theme"],["not:kr:ht","note 2"],
["not:other:key","unrelated"],["palet","mint"],["not:rx:another","note 3"]]);
assert.equal(clearSavedNotes(s),3,"Delete only prescription/chronic-care notes");
assert.deepEqual([...s.data.keys()],["dx-ayar","not:other:key","palet"],"Preserve all other local data");
assert.equal(clearSavedNotes(s),0,"Second delete should be a no-op");
const html=require("node:fs").readFileSync("index.html","utf8");
assert(html.includes('data-clear-notes'),"Settings must expose note clearing");
assert(html.includes('window.confirm('),"Notes deletion requires explicit user confirmation");
console.log("PASS: opt-in deletion clears only DiagnoRx note namespace");
