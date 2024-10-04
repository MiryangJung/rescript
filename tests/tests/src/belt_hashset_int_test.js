// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

let Mocha = require("mocha");
let Belt_Array = require("rescript/lib/js/belt_Array.js");
let Test_utils = require("./test_utils.js");
let Belt_SetInt = require("rescript/lib/js/belt_SetInt.js");
let Array_data_util = require("./array_data_util.js");
let Belt_HashSetInt = require("rescript/lib/js/belt_HashSetInt.js");
let Belt_SortArrayInt = require("rescript/lib/js/belt_SortArrayInt.js");

function add(x, y) {
  return x + y | 0;
}

function sum2(h) {
  let v = {
    contents: 0
  };
  Belt_HashSetInt.forEach(h, x => {
    v.contents = v.contents + x | 0;
  });
  return v.contents;
}

Mocha.describe("Belt_hashset_int_test", () => {
  Mocha.test("fromArray", () => {
    let u = Belt_Array.concat(Array_data_util.randomRange(30, 100), Array_data_util.randomRange(40, 120));
    let v = Belt_HashSetInt.fromArray(u);
    Test_utils.eq("File \"belt_hashset_int_test.res\", line 22, characters 7-14", Belt_HashSetInt.size(v), 91);
    let xs = Belt_SetInt.toArray(Belt_SetInt.fromArray(Belt_HashSetInt.toArray(v)));
    Test_utils.eq("File \"belt_hashset_int_test.res\", line 24, characters 7-14", xs, Array_data_util.range(30, 120));
    Test_utils.eq("File \"belt_hashset_int_test.res\", line 26, characters 7-14", Belt_HashSetInt.reduce(v, 0, add), 6825);
    Test_utils.eq("File \"belt_hashset_int_test.res\", line 27, characters 7-14", sum2(v), 6825);
  });
  Mocha.test("mergeMany", () => {
    let u = Belt_Array.concat(Array_data_util.randomRange(0, 100000), Array_data_util.randomRange(0, 100));
    let v = Belt_HashSetInt.make(40);
    Belt_HashSetInt.mergeMany(v, u);
    Test_utils.eq("File \"belt_hashset_int_test.res\", line 34, characters 7-14", Belt_HashSetInt.size(v), 100001);
    for (let i = 0; i <= 1000; ++i) {
      Belt_HashSetInt.remove(v, i);
    }
    Test_utils.eq("File \"belt_hashset_int_test.res\", line 38, characters 7-14", Belt_HashSetInt.size(v), 99000);
    for (let i$1 = 0; i$1 <= 2000; ++i$1) {
      Belt_HashSetInt.remove(v, i$1);
    }
    Test_utils.eq("File \"belt_hashset_int_test.res\", line 42, characters 7-14", Belt_HashSetInt.size(v), 98000);
  });
  Mocha.test("stableSortInPlace", () => {
    let u0 = Belt_HashSetInt.fromArray(Array_data_util.randomRange(0, 100000));
    let u1 = Belt_HashSetInt.copy(u0);
    Test_utils.eq("File \"belt_hashset_int_test.res\", line 48, characters 7-14", Belt_HashSetInt.toArray(u0), Belt_HashSetInt.toArray(u1));
    for (let i = 0; i <= 2000; ++i) {
      Belt_HashSetInt.remove(u1, i);
    }
    for (let i$1 = 0; i$1 <= 1000; ++i$1) {
      Belt_HashSetInt.remove(u0, i$1);
    }
    let v0 = Belt_Array.concat(Array_data_util.range(0, 1000), Belt_HashSetInt.toArray(u0));
    let v1 = Belt_Array.concat(Array_data_util.range(0, 2000), Belt_HashSetInt.toArray(u1));
    Belt_SortArrayInt.stableSortInPlace(v0);
    Belt_SortArrayInt.stableSortInPlace(v1);
    Test_utils.eq("File \"belt_hashset_int_test.res\", line 59, characters 7-14", v0, v1);
  });
  Mocha.test("getBucketHistogram", () => {
    let h = Belt_HashSetInt.fromArray(Array_data_util.randomRange(0, 1000000));
    let histo = Belt_HashSetInt.getBucketHistogram(h);
    Test_utils.ok("File \"belt_hashset_int_test.res\", line 65, characters 7-14", histo.length <= 10);
  });
});

let N;

let S;

let I;

let A;

let SI;

exports.N = N;
exports.S = S;
exports.I = I;
exports.A = A;
exports.SI = SI;
exports.add = add;
exports.sum2 = sum2;
/*  Not a pure module */
