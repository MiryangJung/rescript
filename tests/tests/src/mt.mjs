// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Path from "path";
import * as Assert from "assert";
import * as Process from "process";
import * as Belt_List from "rescript/lib/es6/Belt_List.js";
import * as Js_promise from "rescript/lib/es6/Js_promise.js";

function assert_fail(msg) {
  Assert.fail(undefined, undefined, msg, "");
}

function is_mocha() {
  let match = Belt_List.fromArray(Process.argv);
  if (match === 0) {
    return false;
  }
  let match$1 = match.tl;
  if (match$1 === 0) {
    return false;
  }
  let exec = Path.basename(match$1.hd);
  if (exec === "mocha") {
    return true;
  } else {
    return exec === "_mocha";
  }
}

let from_suites = (function from_suites(name, suites) {
  var match = Belt_List.fromArray(Process.argv);
  if (match && is_mocha(undefined)) {
    describe(name, (function () {
            return Belt_List.forEach(suites, (function (param) {
                          var partial_arg = param[1];
                          it(param[0], (function () {
                                  return partial_arg(undefined);
                                }));
                        }));
          }));
    return ;
  }
  
});

function close_enough(thresholdOpt, a, b) {
  let threshold = thresholdOpt !== undefined ? thresholdOpt : 0.0000001;
  return Math.abs(a - b) < threshold;
}

function handleCode(spec) {
  switch (spec.TAG) {
    case "Eq" :
      Assert.deepEqual(spec._0, spec._1);
      return;
    case "Neq" :
      Assert.notDeepEqual(spec._0, spec._1);
      return;
    case "StrictEq" :
      Assert.strictEqual(spec._0, spec._1);
      return;
    case "StrictNeq" :
      Assert.notStrictEqual(spec._0, spec._1);
      return;
    case "Ok" :
      Assert.ok(spec._0);
      return;
    case "Approx" :
      let b = spec._1;
      let a = spec._0;
      if (!close_enough(undefined, a, b)) {
        Assert.deepEqual(a, b);
        return;
      } else {
        return;
      }
    case "ApproxThreshold" :
      let b$1 = spec._2;
      let a$1 = spec._1;
      if (!close_enough(spec._0, a$1, b$1)) {
        Assert.deepEqual(a$1, b$1);
        return;
      } else {
        return;
      }
    case "ThrowAny" :
      Assert.throws(spec._0);
      return;
    case "Fail" :
      return assert_fail("failed");
    case "FailWith" :
      return assert_fail(spec._0);
  }
}

let from_pair_suites = (function from_pair_suites(name, suites) {
  var match = Belt_List.fromArray(Process.argv);
  if (match) {
    if (is_mocha(undefined)) {
      describe(name, (function () {
              return Belt_List.forEach(suites, (function (param) {
                            var code = param[1];
                            it(param[0], (function () {
                                    return handleCode(code(undefined));
                                  }));
                          }));
            }));
      return ;
    } else {
      console.log([
            name,
            "testing"
          ]);
      return Belt_List.forEach(suites, (function (param) {
                    var name = param[0];
                    var fn = param[1](undefined);
                    switch (fn.TAG) {
                      case "Eq" :
                          console.log([
                                name,
                                fn._0,
                                "eq?",
                                fn._1
                              ]);
                          return ;
                      case "Neq" :
                          console.log([
                                name,
                                fn._0,
                                "neq?",
                                fn._1
                              ]);
                          return ;
                      case "StrictEq" :
                          console.log([
                                name,
                                fn._0,
                                "strict_eq?",
                                fn._1
                              ]);
                          return ;
                      case "StrictNeq" :
                          console.log([
                                name,
                                fn._0,
                                "strict_neq?",
                                fn._1
                              ]);
                          return ;
                      case "Ok" :
                          console.log([
                                name,
                                fn._0,
                                "ok?"
                              ]);
                          return ;
                      case "Approx" :
                          console.log([
                                name,
                                fn._0,
                                "~",
                                fn._1
                              ]);
                          return ;
                      case "ApproxThreshold" :
                          console.log([
                                name,
                                fn._1,
                                "~",
                                fn._2,
                                " (",
                                fn._0,
                                ")"
                              ]);
                          return ;
                      case "ThrowAny" :
                          return ;
                      case "Fail" :
                          console.log("failed");
                          return ;
                      case "FailWith" :
                          console.log("failed: " + fn._0);
                          return ;
                      
                    }
                  }));
    }
  }
  
});

let val_unit = Promise.resolve();

let from_promise_suites = (function from_promise_suites(name, suites) {
  var match = Belt_List.fromArray(Process.argv);
  if (match) {
    if (is_mocha(undefined)) {
      describe(name, (function () {
              return Belt_List.forEach(suites, (function (param) {
                            var code = param[1];
                            it(param[0], (function () {
                                    var arg1 = function (x) {
                                      handleCode(x);
                                      return val_unit;
                                    };
                                    return code.then(arg1);
                                  }));
                          }));
            }));
    } else {
      console.log("promise suites");
    }
    return ;
  }
  
});

function old_from_promise_suites_donotuse(name, suites) {
  let match = Belt_List.fromArray(Process.argv);
  if (match !== 0) {
    if (is_mocha()) {
      describe(name, () => Belt_List.forEach(suites, param => {
        let code = param[1];
        it(param[0], () => Js_promise.then_(x => {
          handleCode(x);
          return val_unit;
        }, code));
      }));
    } else {
      console.log("promise suites");
    }
    return;
  }
  
}

function eq_suites(test_id, suites, loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + test_id.contents.toString()),
      param => ({
        TAG: "Eq",
        _0: x,
        _1: y
      })
    ],
    tl: suites.contents
  };
}

function bool_suites(test_id, suites, loc, x) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + test_id.contents.toString()),
      param => ({
        TAG: "Ok",
        _0: x
      })
    ],
    tl: suites.contents
  };
}

function throw_suites(test_id, suites, loc, x) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + test_id.contents.toString()),
      param => ({
        TAG: "ThrowAny",
        _0: x
      })
    ],
    tl: suites.contents
  };
}

export {
  from_suites,
  from_pair_suites,
  from_promise_suites,
  old_from_promise_suites_donotuse,
  eq_suites,
  bool_suites,
  throw_suites,
}
/* val_unit Not a pure module */
