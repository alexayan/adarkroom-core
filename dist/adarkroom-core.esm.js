import { createSlice, combineReducers, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import _ from 'lodash';
import logger from 'redux-logger';
import Polyglot from 'node-polyglot';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

function translate(text) {
  return text;
}

var _Perks;
var StoreCategory;

(function (StoreCategory) {
  StoreCategory["wood"] = "wood";
  StoreCategory["fur"] = "fur";
  StoreCategory["meat"] = "meat";
  StoreCategory["iron"] = "iron";
  StoreCategory["coal"] = "coal";
  StoreCategory["sulphur"] = "sulphur";
  StoreCategory["steel"] = "steel";
  StoreCategory["cured_meat"] = "cured_meat";
  StoreCategory["scales"] = "scales";
  StoreCategory["teeth"] = "teeth";
  StoreCategory["leather"] = "leather";
  StoreCategory["bait"] = "bait";
  StoreCategory["torch"] = "torch";
  StoreCategory["cloth"] = "cloth";
  StoreCategory["bone_spear"] = "bone_spear";
  StoreCategory["iron_sword"] = "iron_sword";
  StoreCategory["steel_sword"] = "steel_sword";
  StoreCategory["bayonet"] = "bayonet";
  StoreCategory["rifle"] = "rifle";
  StoreCategory["laser_rifle"] = "laser_rifle";
  StoreCategory["bullets"] = "bullets";
  StoreCategory["energy_cell"] = "energy_cell";
  StoreCategory["grenade"] = "grenade";
  StoreCategory["bolas"] = "bolas";
  StoreCategory["medicine"] = "medicine";
  StoreCategory["compass"] = "compass";
  StoreCategory["charm"] = "charm";
  StoreCategory["alien_alloy"] = "alien_alloy";
  StoreCategory["waterskin"] = "waterskin";
  StoreCategory["cask"] = "cask";
  StoreCategory["water_tank"] = "water_tank";
  StoreCategory["rucksack"] = "rucksack";
  StoreCategory["wagon"] = "wagon";
  StoreCategory["convoy"] = "convoy";
  StoreCategory["l_armou"] = "l_armou";
  StoreCategory["i_armour"] = "i_armour";
  StoreCategory["s_armour"] = "s_armour";
  StoreCategory["trap"] = "trap";
  StoreCategory["cart"] = "cart";
  StoreCategory["hut"] = "hut";
  StoreCategory["lodge"] = "lodge";
  StoreCategory["trading_post"] = "trading_post";
  StoreCategory["tannery"] = "tannery";
  StoreCategory["smokehouse"] = "smokehouse";
  StoreCategory["workshop"] = "workshop";
  StoreCategory["steelworks"] = "steelworks";
  StoreCategory["armoury"] = "armoury";
})(StoreCategory || (StoreCategory = {}));

var GameSpace;

(function (GameSpace) {
  GameSpace["Room"] = "Room";
  GameSpace["Path"] = "Path";
  GameSpace["Outside"] = "Outside";
  GameSpace["World"] = "World";
  GameSpace["Ship"] = "Ship";
  GameSpace["Space"] = "Space";
})(GameSpace || (GameSpace = {}));

var PerkCategory;

(function (PerkCategory) {
  PerkCategory["boxer"] = "boxer";
  PerkCategory["martial_artist"] = "martial_artist";
  PerkCategory["unarmed_master"] = "unarmed_master";
  PerkCategory["barbarian"] = "barbarian";
  PerkCategory["slow_metabolism"] = "slow_metabolism";
  PerkCategory["desert_rat"] = "desert_rat";
  PerkCategory["evasive"] = "evasive";
  PerkCategory["precise"] = "precise";
  PerkCategory["scout"] = "scout";
  PerkCategory["stealthy"] = "stealthy";
  PerkCategory["gastronome"] = "gastronome";
})(PerkCategory || (PerkCategory = {}));

var Perks = (_Perks = {}, _Perks[PerkCategory.boxer] = {
  name: /*#__PURE__*/translate('boxer'),
  desc: /*#__PURE__*/translate('punches do more damage'),
  notify: /*#__PURE__*/translate('learned to throw punches with purpose')
}, _Perks[PerkCategory.martial_artist] = {
  name: /*#__PURE__*/translate('martial artist'),
  desc: /*#__PURE__*/translate('punches do even more damage.'),
  notify: /*#__PURE__*/translate('learned to fight quite effectively without weapons')
}, _Perks[PerkCategory.unarmed_master] = {
  /// TRANSLATORS : master of unarmed combat
  name: /*#__PURE__*/translate('unarmed master'),
  desc: /*#__PURE__*/translate('punch twice as fast, and with even more force'),
  notify: /*#__PURE__*/translate('learned to strike faster without weapons')
}, _Perks[PerkCategory.barbarian] = {
  name: /*#__PURE__*/translate('barbarian'),
  desc: /*#__PURE__*/translate('melee weapons deal more damage'),
  notify: /*#__PURE__*/translate('learned to swing weapons with force')
}, _Perks[PerkCategory.slow_metabolism] = {
  name: /*#__PURE__*/translate('slow metabolism'),
  desc: /*#__PURE__*/translate('go twice as far without eating'),
  notify: /*#__PURE__*/translate('learned how to ignore the hunger')
}, _Perks[PerkCategory.desert_rat] = {
  name: /*#__PURE__*/translate('desert rat'),
  desc: /*#__PURE__*/translate('go twice as far without drinking'),
  notify: /*#__PURE__*/translate('learned to love the dry air')
}, _Perks[PerkCategory.evasive] = {
  name: /*#__PURE__*/translate('evasive'),
  desc: /*#__PURE__*/translate('dodge attacks more effectively'),
  notify: /*#__PURE__*/translate("learned to be where they're not")
}, _Perks[PerkCategory.precise] = {
  name: /*#__PURE__*/translate('precise'),
  desc: /*#__PURE__*/translate('land blows more often'),
  notify: /*#__PURE__*/translate('learned to predict their movement')
}, _Perks[PerkCategory.scout] = {
  name: /*#__PURE__*/translate('scout'),
  desc: /*#__PURE__*/translate('see farther'),
  notify: /*#__PURE__*/translate('learned to look ahead')
}, _Perks[PerkCategory.stealthy] = {
  name: /*#__PURE__*/translate('stealthy'),
  desc: /*#__PURE__*/translate('better avoid conflict in the wild'),
  notify: /*#__PURE__*/translate('learned how not to be seen')
}, _Perks[PerkCategory.gastronome] = {
  name: /*#__PURE__*/translate('gastronome'),
  desc: /*#__PURE__*/translate('restore more health when eating'),
  notify: /*#__PURE__*/translate('learned to make the most of food')
}, _Perks);
var Building;

(function (Building) {
  Building["trap"] = "trap";
  Building["cart"] = "cart";
  Building["hut"] = "hut";
  Building["lodge"] = "lodge";
  Building["trading_post"] = "trading_post";
  Building["tannery"] = "tannery";
  Building["smokehouse"] = "smokehouse";
  Building["workshop"] = "workshop";
  Building["steelworks"] = "steelworks";
  Building["armoury"] = "armoury";
  Building["sulphur_mine"] = "sulphur_mine";
  Building["iron_mine"] = "iron_mine";
  Building["coal_mine"] = "coal_mine";
})(Building || (Building = {}));

var Craftable;

(function (Craftable) {
  Craftable["trap"] = "trap";
  Craftable["cart"] = "cart";
  Craftable["hut"] = "hut";
  Craftable["lodge"] = "lodge";
  Craftable["trading_post"] = "trading_post";
  Craftable["tannery"] = "tannery";
  Craftable["smokehouse"] = "smokehouse";
  Craftable["workshop"] = "workshop";
  Craftable["steelworks"] = "steelworks";
  Craftable["armoury"] = "armoury";
  Craftable["torch"] = "torch";
  Craftable["waterskin"] = "waterskin";
  Craftable["cask"] = "cask";
  Craftable["water_tank"] = "water_tank";
  Craftable["bone_spear"] = "bone_spear";
  Craftable["rucksack"] = "rucksack";
  Craftable["wagon"] = "wagon";
  Craftable["convoy"] = "convoy";
  Craftable["l_armou"] = "l_armou";
  Craftable["i_armour"] = "i_armour";
  Craftable["s_armour"] = "s_armour";
  Craftable["iron_sword"] = "iron_sword";
  Craftable["steel_sword"] = "steel_sword";
  Craftable["rifle"] = "rifle";
})(Craftable || (Craftable = {}));

var NonCraftable;

(function (NonCraftable) {
  NonCraftable["medicine"] = "medicine";
  NonCraftable["charm"] = "charm";
  NonCraftable["bayonet"] = "bayonet";
  NonCraftable["bolas"] = "bolas";
  NonCraftable["grenade"] = "grenade";
  NonCraftable["bullets"] = "bullets";
  NonCraftable["cured_meat"] = "cured_meat";
  NonCraftable["laser_rifle"] = "laser_rifle";
  NonCraftable["energy_cell"] = "energy_cell";
})(NonCraftable || (NonCraftable = {}));

var WorkerType;

(function (WorkerType) {
  WorkerType["sulphur_miner"] = "sulphur_miner";
  WorkerType["hunter"] = "hunter";
  WorkerType["trapper"] = "trapper";
  WorkerType["charcutier"] = "charcutier";
  WorkerType["iron_miner"] = "iron_miner";
  WorkerType["coal_miner"] = "coal_miner";
  WorkerType["armourer"] = "armourer";
  WorkerType["tanner"] = "tanner";
  WorkerType["steelworker"] = "steelworker";
})(WorkerType || (WorkerType = {}));

var incomes = {
  gatherer: {
    name: /*#__PURE__*/translate('gatherer'),
    delay: 10,
    stores: {
      wood: 1
    }
  },
  hunter: {
    name: /*#__PURE__*/translate('hunter'),
    delay: 10,
    stores: {
      fur: 0.5,
      meat: 0.5
    }
  },
  trapper: {
    name: /*#__PURE__*/translate('trapper'),
    delay: 10,
    stores: {
      meat: -1,
      bait: 1
    }
  },
  tanner: {
    name: /*#__PURE__*/translate('tanner'),
    delay: 10,
    stores: {
      fur: -5,
      leather: 1
    }
  },
  charcutier: {
    name: /*#__PURE__*/translate('charcutier'),
    delay: 10,
    stores: {
      meat: -5,
      wood: -5,
      cured_meat: 1
    }
  },
  iron_miner: {
    name: /*#__PURE__*/translate('iron miner'),
    delay: 10,
    stores: {
      cured_meat: -1,
      iron: 1
    }
  },
  coal_miner: {
    name: /*#__PURE__*/translate('coal miner'),
    delay: 10,
    stores: {
      cured_meat: -1,
      coal: 1
    }
  },
  sulphur_miner: {
    name: /*#__PURE__*/translate('sulphur miner'),
    delay: 10,
    stores: {
      cured_meat: -1,
      sulphur: 1
    }
  },
  steelworker: {
    name: /*#__PURE__*/translate('steelworker'),
    delay: 10,
    stores: {
      iron: -1,
      coal: -1,
      steel: 1
    }
  },
  armourer: {
    name: /*#__PURE__*/translate('armourer'),
    delay: 10,
    stores: {
      steel: -1,
      sulphur: -1,
      bullets: 1
    }
  }
};

var slice = /*#__PURE__*/createSlice({
  name: 'marketing',
  initialState: {
    penrose: false
  },
  reducers: {
    changePenrose: function changePenrose(state, action) {
      state.penrose = action.payload;
    }
  }
});
var actions = slice.actions;
var marketing = slice.reducer;

var configSlice = /*#__PURE__*/createSlice({
  name: 'config',
  initialState: {
    hyperMode: false,
    soundOn: false
  },
  reducers: {
    changeHyperMode: function changeHyperMode(state, action) {
      state.hyperMode = action.payload;
    },
    changeSound: function changeSound(state, action) {
      state.soundOn = action.payload;
    }
  }
});
var actions$1 = configSlice.actions;
var config = configSlice.reducer;

var locationSlice = /*#__PURE__*/createSlice({
  name: 'location',
  initialState: {
    Outside: false,
    Room: false,
    Ship: false,
    World: false,
    Path: false
  },
  reducers: {
    enableOutside: function enableOutside(state) {
      state.Outside = true;
    },
    enableRoom: function enableRoom(state) {
      state.Room = true;
    },
    enableSpaceShip: function enableSpaceShip(state) {
      state.Ship = true;
    },
    enableWorld: function enableWorld(state) {
      state.World = true;
    },
    enablePath: function enablePath(state) {
      state.Path = true;
    }
  }
});
var actions$2 = locationSlice.actions;
var location = locationSlice.reducer;

var features = /*#__PURE__*/combineReducers({
  location: location
});
var actions$3 = {
  location: actions$2
};

var _TILE_PROBS, _LANDMARKS, _stores, _stores2, _stores3, _stores4, _stores5, _stores6, _stores7, _stores8, _stores9, _stores10;
var MEDS_HEAL = 20;
var MEAT_HEAL = 8;
var items = {
  trap: {
    name: /*#__PURE__*/translate('trap'),
    type: 'building',
    craft: {
      maximum: 10,
      availableMsg: /*#__PURE__*/translate('builder says she can make traps to catch any creatures might still be alive out there'),
      buildMsg: /*#__PURE__*/translate('more traps to catch more creatures'),
      maxMsg: /*#__PURE__*/translate("more traps won't help now"),
      type: 'building',
      cost: function cost(state) {
        var n = state.game.buildings.trap || 0;
        return {
          wood: 10 + n * 10
        };
      }
    }
  },
  cart: {
    name: /*#__PURE__*/translate('cart'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: /*#__PURE__*/translate('builder says she can make a cart for carrying wood'),
      buildMsg: /*#__PURE__*/translate('the rickety cart will carry more wood from the forest'),
      type: 'building',
      cost: function cost() {
        return {
          wood: 30
        };
      }
    }
  },
  hut: {
    name: /*#__PURE__*/translate('hut'),
    type: 'building',
    craft: {
      maximum: 20,
      availableMsg: /*#__PURE__*/translate("builder says there are more wanderers. says they'll work, too."),
      buildMsg: /*#__PURE__*/translate('builder puts up a hut, out in the forest. says word will get around.'),
      maxMsg: /*#__PURE__*/translate('no more room for huts.'),
      type: 'building',
      cost: function cost(state) {
        var n = state.game.buildings.hut || 0;
        return {
          wood: 100 + n * 50
        };
      }
    }
  },
  lodge: {
    name: /*#__PURE__*/translate('lodge'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: /*#__PURE__*/translate('villagers could help hunt, given the means'),
      buildMsg: /*#__PURE__*/translate('the hunting lodge stands in the forest, a ways out of town'),
      type: 'building',
      cost: function cost() {
        return {
          wood: 200,
          fur: 10,
          meat: 5
        };
      }
    }
  },
  trading_post: {
    name: /*#__PURE__*/translate('trading post'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: /*#__PURE__*/translate('a trading post would make commerce easier'),
      buildMsg: /*#__PURE__*/translate('now the nomads have a place to set up shop, they might stick around a while'),
      type: 'building',
      cost: function cost() {
        return {
          wood: 400,
          fur: 100
        };
      }
    }
  },
  tannery: {
    name: /*#__PURE__*/translate('tannery'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: /*#__PURE__*/translate('builder says leather could be useful. says the villagers could make it.'),
      buildMsg: /*#__PURE__*/translate('tannery goes up quick, on the edge of the village'),
      type: 'building',
      cost: function cost() {
        return {
          wood: 500,
          fur: 50
        };
      }
    }
  },
  smokehouse: {
    name: /*#__PURE__*/translate('smokehouse'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: /*#__PURE__*/translate("should cure the meat, or it'll spoil. builder says she can fix something up."),
      buildMsg: /*#__PURE__*/translate('builder finishes the smokehouse. she looks hungry.'),
      type: 'building',
      cost: function cost() {
        return {
          wood: 600,
          meat: 50
        };
      }
    }
  },
  workshop: {
    name: /*#__PURE__*/translate('workshop'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: /*#__PURE__*/translate('builder says she could make finer things, if she had the tools'),
      buildMsg: /*#__PURE__*/translate("workshop's finally ready. builder's excited to get to it"),
      type: 'building',
      cost: function cost() {
        return {
          wood: 800,
          leather: 100,
          scales: 10
        };
      }
    }
  },
  steelworks: {
    name: /*#__PURE__*/translate('steelworks'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: /*#__PURE__*/translate('builder says the villagers could make steel, given the tools'),
      buildMsg: /*#__PURE__*/translate('a haze falls over the village as the steelworks fires up'),
      type: 'building',
      cost: function cost() {
        return {
          wood: 1500,
          iron: 100,
          coal: 100
        };
      }
    }
  },
  armoury: {
    name: /*#__PURE__*/translate('armoury'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: /*#__PURE__*/translate("builder says it'd be useful to have a steady source of bullets"),
      buildMsg: /*#__PURE__*/translate("armoury's done, welcoming back the weapons of the past."),
      type: 'building',
      cost: function cost() {
        return {
          wood: 3000,
          steel: 100,
          sulphur: 50
        };
      }
    }
  },
  torch: {
    name: /*#__PURE__*/translate('torch'),
    type: 'tool',
    craft: {
      type: 'tool',
      buildMsg: /*#__PURE__*/translate('a torch to keep the dark away'),
      cost: function cost() {
        return {
          wood: 1,
          cloth: 1
        };
      }
    }
  },
  waterskin: {
    name: /*#__PURE__*/translate('waterskin'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: /*#__PURE__*/translate("this waterskin'll hold a bit of water, at least"),
      cost: function cost() {
        return {
          leather: 50
        };
      }
    }
  },
  cask: {
    name: /*#__PURE__*/translate('cask'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: /*#__PURE__*/translate('the cask holds enough water for longer expeditions'),
      cost: function cost() {
        return {
          leather: 100,
          iron: 20
        };
      }
    }
  },
  water_tank: {
    name: /*#__PURE__*/translate('water tank'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: /*#__PURE__*/translate('never go thirsty again'),
      cost: function cost() {
        return {
          iron: 100,
          steel: 50
        };
      }
    }
  },
  bone_spear: {
    name: /*#__PURE__*/translate('bone spear'),
    type: 'weapon',
    craft: {
      type: 'weapon',
      buildMsg: /*#__PURE__*/translate("this spear's not elegant, but it's pretty good at stabbing"),
      cost: function cost() {
        return {
          wood: 100,
          teeth: 5
        };
      }
    },
    weapon: {
      verb: /*#__PURE__*/translate('stab'),
      type: 'melee',
      damage: 2,
      cooldown: 2
    }
  },
  rucksack: {
    name: /*#__PURE__*/translate('rucksack'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: /*#__PURE__*/translate('carrying more means longer expeditions to the wilds'),
      cost: function cost() {
        return {
          leather: 200
        };
      }
    }
  },
  wagon: {
    name: /*#__PURE__*/translate('wagon'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: /*#__PURE__*/translate('the wagon can carry a lot of supplies'),
      cost: function cost() {
        return {
          wood: 500,
          iron: 100
        };
      }
    }
  },
  convoy: {
    name: /*#__PURE__*/translate('convoy'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: /*#__PURE__*/translate('the convoy can haul mostly everything'),
      cost: function cost() {
        return {
          wood: 1000,
          iron: 200,
          steel: 100
        };
      }
    }
  },
  l_armour: {
    name: /*#__PURE__*/translate('l armour'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: /*#__PURE__*/translate("leather's not strong. better than rags, though."),
      cost: function cost() {
        return {
          leather: 200,
          scales: 20
        };
      }
    }
  },
  i_armour: {
    name: /*#__PURE__*/translate('i armour'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: /*#__PURE__*/translate("iron's stronger than leather"),
      cost: function cost() {
        return {
          leather: 200,
          iron: 100
        };
      }
    }
  },
  s_armour: {
    name: /*#__PURE__*/translate('s armour'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: /*#__PURE__*/translate("steel's stronger than iron"),
      cost: function cost() {
        return {
          leather: 200,
          steel: 100
        };
      }
    }
  },
  iron_sword: {
    name: /*#__PURE__*/translate('iron sword'),
    type: 'weapon',
    craft: {
      type: 'weapon',
      buildMsg: /*#__PURE__*/translate('sword is sharp. good protection out in the wilds.'),
      cost: function cost() {
        return {
          wood: 200,
          leather: 50,
          iron: 20
        };
      }
    },
    weapon: {
      verb: /*#__PURE__*/translate('swing'),
      type: 'melee',
      damage: 4,
      cooldown: 2
    }
  },
  steel_sword: {
    name: /*#__PURE__*/translate('steel sword'),
    type: 'weapon',
    craft: {
      type: 'weapon',
      buildMsg: /*#__PURE__*/translate('the steel is strong, and the blade true.'),
      cost: function cost() {
        return {
          wood: 500,
          leather: 100,
          steel: 20
        };
      }
    },
    weapon: {
      verb: /*#__PURE__*/translate('slash'),
      type: 'melee',
      damage: 6,
      cooldown: 2
    }
  },
  rifle: {
    name: /*#__PURE__*/translate('rifle'),
    type: 'weapon',
    craft: {
      type: 'weapon',
      buildMsg: /*#__PURE__*/translate('black powder and bullets, like the old days.'),
      cost: function cost() {
        return {
          wood: 200,
          steel: 50,
          sulphur: 50
        };
      }
    },
    weapon: {
      verb: /*#__PURE__*/translate('shoot'),
      type: 'ranged',
      damage: 5,
      cooldown: 1,
      cost: {
        bullets: 1
      }
    }
  },
  cured_meat: {
    name: /*#__PURE__*/translate('cured meat'),
    type: 'tool',
    desc: /*#__PURE__*/translate('restores') + ' ' + MEAT_HEAL + ' ' + /*#__PURE__*/translate('hp')
  },
  bullets: {
    name: /*#__PURE__*/translate('bullets'),
    type: 'tool',
    desc: /*#__PURE__*/translate('use with rifle'),
    trade: {
      type: 'good',
      cost: function cost() {
        return {
          scales: 10
        };
      }
    }
  },
  grenade: {
    name: /*#__PURE__*/translate('grenade'),
    type: 'weapon',
    weapon: {
      verb: /*#__PURE__*/translate('lob'),
      type: 'ranged',
      damage: 15,
      cooldown: 5,
      cost: {
        grenade: 1
      }
    },
    trade: {
      type: 'weapon',
      cost: function cost() {
        return {
          scales: 100,
          teeth: 50
        };
      }
    }
  },
  bolas: {
    name: /*#__PURE__*/translate('bolas'),
    type: 'weapon',
    weapon: {
      verb: /*#__PURE__*/translate('tangle'),
      type: 'ranged',
      damage: 'stun',
      cooldown: 15,
      cost: {
        bolas: 1
      }
    },
    trade: {
      type: 'weapon',
      cost: function cost() {
        return {
          teeth: 10
        };
      }
    }
  },
  laser_rifle: {
    name: /*#__PURE__*/translate('laser rifle'),
    type: 'weapon',
    weapon: {
      verb: /*#__PURE__*/translate('blast'),
      type: 'ranged',
      damage: 8,
      cooldown: 1,
      cost: {
        energy_cell: 1
      }
    }
  },
  energy_cell: {
    name: /*#__PURE__*/translate('energy cell'),
    type: 'tool',
    desc: /*#__PURE__*/translate('emits a soft red glow'),
    trade: {
      type: 'good',
      cost: function cost() {
        return {
          scales: 10,
          teeth: 10
        };
      }
    }
  },
  bayonet: {
    name: /*#__PURE__*/translate('bayonet'),
    type: 'weapon',
    weapon: {
      verb: /*#__PURE__*/translate('thrust'),
      type: 'melee',
      damage: 8,
      cooldown: 2
    },
    trade: {
      type: 'weapon',
      cost: function cost() {
        return {
          scales: 500,
          teeth: 250
        };
      }
    }
  },
  charm: {
    name: /*#__PURE__*/translate('charm'),
    type: 'tool'
  },
  medicine: {
    name: /*#__PURE__*/translate('medicine'),
    type: 'tool',
    desc: /*#__PURE__*/translate('restores') + ' ' + MEDS_HEAL + ' ' + /*#__PURE__*/translate('hp'),
    trade: {
      type: 'good',
      cost: function cost() {
        return {
          scales: 50,
          teeth: 30
        };
      }
    }
  },
  wood: {
    name: /*#__PURE__*/translate('wood'),
    type: 'resouce'
  },
  fur: {
    name: /*#__PURE__*/translate('fur'),
    type: 'resouce'
  },
  meat: {
    name: /*#__PURE__*/translate('meat'),
    type: 'resouce'
  },
  iron: {
    name: /*#__PURE__*/translate('iron'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function cost() {
        return {
          fur: 150,
          scales: 50
        };
      }
    }
  },
  coal: {
    name: /*#__PURE__*/translate('coal'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function cost() {
        return {
          fur: 200,
          teeth: 50
        };
      }
    }
  },
  sulphur: {
    name: /*#__PURE__*/translate('sulphur'),
    type: 'resouce'
  },
  steel: {
    name: /*#__PURE__*/translate('steel'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function cost() {
        return {
          fur: 300,
          scales: 50,
          teeth: 50
        };
      }
    }
  },
  scales: {
    name: /*#__PURE__*/translate('scales'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function cost() {
        return {
          fur: 150
        };
      }
    }
  },
  teeth: {
    name: /*#__PURE__*/translate('teeth'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function cost() {
        return {
          fur: 300
        };
      }
    }
  },
  leather: {
    name: /*#__PURE__*/translate('leather'),
    type: 'resouce'
  },
  bait: {
    name: /*#__PURE__*/translate('bait'),
    type: 'resouce'
  },
  cloth: {
    name: /*#__PURE__*/translate('cloth'),
    type: 'resouce'
  },
  alien_alloy: {
    name: /*#__PURE__*/translate('alien alloy'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function cost() {
        return {
          fur: 1500,
          scales: 750,
          teeth: 300
        };
      }
    }
  },
  compass: {
    name: /*#__PURE__*/translate('compass'),
    type: 'prop',
    trade: {
      type: 'special',
      maximum: 1,
      cost: function cost() {
        return {
          fur: 400,
          scales: 20,
          teeth: 10
        };
      }
    }
  },
  fists: {
    name: /*#__PURE__*/translate('fists'),
    type: 'weapon',
    weapon: {
      verb: /*#__PURE__*/translate('punch'),
      type: 'unarmed',
      damage: 1,
      cooldown: 2
    }
  }
};
var CraftableCategory;

(function (CraftableCategory) {
  CraftableCategory["trap"] = "trap";
  CraftableCategory["cart"] = "cart";
  CraftableCategory["hut"] = "hut";
  CraftableCategory["lodge"] = "lodge";
  CraftableCategory["trading_post"] = "trading_post";
  CraftableCategory["tannery"] = "tannery";
  CraftableCategory["smokehouse"] = "smokehouse";
  CraftableCategory["workshop"] = "workshop";
  CraftableCategory["steelworks"] = "steelworks";
  CraftableCategory["armoury"] = "armoury";
  CraftableCategory["torch"] = "torch";
  CraftableCategory["waterskin"] = "waterskin";
  CraftableCategory["cask"] = "cask";
  CraftableCategory["water_tank"] = "water_tank";
  CraftableCategory["bone_spear"] = "bone_spear";
  CraftableCategory["rucksack"] = "rucksack";
  CraftableCategory["wagon"] = "wagon";
  CraftableCategory["convoy"] = "convoy";
  CraftableCategory["l_armour"] = "l_armour";
  CraftableCategory["i_armour"] = "i_armour";
  CraftableCategory["s_armour"] = "s_armour";
  CraftableCategory["iron_sword"] = "iron_sword";
  CraftableCategory["steel_sword"] = "steel_sword";
  CraftableCategory["rifle"] = "rifle";
})(CraftableCategory || (CraftableCategory = {}));

var TradeCategory;

(function (TradeCategory) {
  TradeCategory["scales"] = "scales";
  TradeCategory["teeth"] = "teeth";
  TradeCategory["iron"] = "iron";
  TradeCategory["coal"] = "coal";
  TradeCategory["steel"] = "steel";
  TradeCategory["medicine"] = "medicine";
  TradeCategory["bullets"] = "bullets";
  TradeCategory["energy_cell"] = "energy_cell";
  TradeCategory["bolas"] = "bolas";
  TradeCategory["grenade"] = "grenade";
  TradeCategory["bayonet"] = "bayonet";
  TradeCategory["alien_alloy"] = "alien_alloy";
  TradeCategory["compass"] = "compass";
})(TradeCategory || (TradeCategory = {}));

var NonCraftableCategory;

(function (NonCraftableCategory) {
  NonCraftableCategory["cured_meat"] = "cured_meat";
  NonCraftableCategory["bullets"] = "bullets";
  NonCraftableCategory["grenade"] = "grenade";
  NonCraftableCategory["bolas"] = "bolas";
  NonCraftableCategory["laser_rifle"] = "laser_rifle";
  NonCraftableCategory["energy_cell"] = "energy_cell";
  NonCraftableCategory["bayonet"] = "bayonet";
  NonCraftableCategory["charm"] = "charm";
  NonCraftableCategory["medicine"] = "medicine";
})(NonCraftableCategory || (NonCraftableCategory = {}));

var WeaponCategory;

(function (WeaponCategory) {
  WeaponCategory["fists"] = "fists";
  WeaponCategory["bone_spear"] = "bone_spear";
  WeaponCategory["iron_sword"] = "iron_sword";
  WeaponCategory["steel_sword"] = "steel_sword";
  WeaponCategory["bayonet"] = "bayonet";
  WeaponCategory["rifle"] = "rifle";
  WeaponCategory["laser_rifle"] = "laser_rifle";
  WeaponCategory["grenade"] = "grenade";
  WeaponCategory["bolas"] = "bolas";
})(WeaponCategory || (WeaponCategory = {}));

var Outfits = /*#__PURE__*/Object.keys(_extends({}, NonCraftableCategory, CraftableCategory)).filter(function (key) {
  var item = items[key];
  return item.type === 'tool' || item.type === 'weapon';
});
var World_RADIUS = 30;
var WorldTile = {
  VILLAGE: 'A',
  IRON_MINE: 'I',
  COAL_MINE: 'C',
  SULPHUR_MINE: 'S',
  FOREST: ';',
  FIELD: ',',
  BARRENS: '.',
  ROAD: '#',
  HOUSE: 'H',
  CAVE: 'V',
  TOWN: 'O',
  CITY: 'Y',
  OUTPOST: 'P',
  SHIP: 'W',
  BOREHOLE: 'B',
  BATTLEFIELD: 'F',
  SWAMP: 'M',
  CACHE: 'U'
};
var config$1 = {
  items: items,
  Engine: {
    VERSION: 1.3,
    MAX_STORE: 99999999999999,
    SAVE_DISPLAY: 30 * 1000
  },
  World: {
    name: 'World',
    RADIUS: World_RADIUS,
    VILLAGE_POS: [30, 30],
    TILE: WorldTile,
    TILE_PROBS: (_TILE_PROBS = {}, _TILE_PROBS[WorldTile.FOREST] = 0.15, _TILE_PROBS[WorldTile.FIELD] = 0.35, _TILE_PROBS[WorldTile.BARRENS] = 0.5, _TILE_PROBS),
    LANDMARKS: (_LANDMARKS = {}, _LANDMARKS[WorldTile.OUTPOST] = {
      num: 0,
      minRadius: 0,
      maxRadius: 0,
      scene: 'outpost',
      label: /*#__PURE__*/translate('An&nbsp;Outpost')
    }, _LANDMARKS[WorldTile.IRON_MINE] = {
      num: 1,
      minRadius: 5,
      maxRadius: 5,
      scene: 'ironmine',
      label: /*#__PURE__*/translate('Iron&nbsp;Mine')
    }, _LANDMARKS[WorldTile.COAL_MINE] = {
      num: 1,
      minRadius: 10,
      maxRadius: 10,
      scene: 'coalmine',
      label: /*#__PURE__*/translate('Coal&nbsp;Mine')
    }, _LANDMARKS[WorldTile.SULPHUR_MINE] = {
      num: 1,
      minRadius: 20,
      maxRadius: 20,
      scene: 'sulphurmine',
      label: /*#__PURE__*/translate('Sulphur&nbsp;Mine')
    }, _LANDMARKS[WorldTile.HOUSE] = {
      num: 10,
      minRadius: 0,
      maxRadius: World_RADIUS * 1.5,
      scene: 'house',
      label: /*#__PURE__*/translate('An&nbsp;Old&nbsp;House')
    }, _LANDMARKS[WorldTile.CAVE] = {
      num: 5,
      minRadius: 3,
      maxRadius: 10,
      scene: 'cave',
      label: /*#__PURE__*/translate('A&nbsp;Damp&nbsp;Cave')
    }, _LANDMARKS[WorldTile.TOWN] = {
      num: 10,
      minRadius: 10,
      maxRadius: 20,
      scene: 'town',
      label: /*#__PURE__*/translate('An&nbsp;Abandoned&nbsp;Town')
    }, _LANDMARKS[WorldTile.CITY] = {
      num: 20,
      minRadius: 20,
      maxRadius: World_RADIUS * 1.5,
      scene: 'city',
      label: /*#__PURE__*/translate('A&nbsp;Ruined&nbsp;City')
    }, _LANDMARKS[WorldTile.SHIP] = {
      num: 1,
      minRadius: 28,
      maxRadius: 28,
      scene: 'ship',
      label: /*#__PURE__*/translate('A&nbsp;Crashed&nbsp;Starship')
    }, _LANDMARKS[WorldTile.BOREHOLE] = {
      num: 10,
      minRadius: 15,
      maxRadius: World_RADIUS * 1.5,
      scene: 'borehole',
      label: /*#__PURE__*/translate('A&nbsp;Borehole')
    }, _LANDMARKS[WorldTile.BATTLEFIELD] = {
      num: 5,
      minRadius: 18,
      maxRadius: World_RADIUS * 1.5,
      scene: 'battlefield',
      label: /*#__PURE__*/translate('A&nbsp;Battlefield')
    }, _LANDMARKS[WorldTile.SWAMP] = {
      num: 1,
      minRadius: 15,
      maxRadius: World_RADIUS * 1.5,
      scene: 'swamp',
      label: /*#__PURE__*/translate('A&nbsp;Murky&nbsp;Swamp')
    }, _LANDMARKS),
    STICKINESS: 0.5,
    LIGHT_RADIUS: 2,
    BASE_WATER: 10,
    MOVES_PER_FOOD: 2,
    MOVES_PER_WATER: 1,
    DEATH_COOLDOWN: 120,
    FIGHT_CHANCE: 0.2,
    BASE_HEALTH: 10,
    BASE_HIT_CHANCE: 0.8,
    MEAT_HEAL: MEAT_HEAL,
    MEDS_HEAL: MEDS_HEAL,
    FIGHT_DELAY: 3,
    NORTH: [0, -1],
    SOUTH: [0, 1],
    WEST: [-1, 0],
    EAST: [1, 0]
  },
  Room: {
    name: "Room",
    FIRE_COOL_DELAY: 5 * 60 * 1000,
    ROOM_WARM_DELAY: 30 * 1000,
    BUILDER_STATE_DELAY: 0.5 * 60 * 1000,
    STOKE_COOLDOWN: 10,
    NEED_WOOD_DELAY: 15 * 1000,
    MiscItems: ['laser_rifle'],
    FireStatus: {
      Dead: {
        status: 'Dead',
        value: 0,
        text: /*#__PURE__*/translate('dead')
      },
      Smoldering: {
        status: 'Smoldering',
        value: 1,
        text: /*#__PURE__*/translate('smoldering')
      },
      Flickering: {
        status: 'Flickering',
        value: 2,
        text: /*#__PURE__*/translate('flickering')
      },
      Burning: {
        status: 'Burning',
        value: 3,
        text: /*#__PURE__*/translate('burning')
      },
      Roaring: {
        status: 'Roaring',
        value: 4,
        text: /*#__PURE__*/translate('roaring')
      }
    },
    TemperatureStatus: {
      Freezing: {
        value: 0,
        text: /*#__PURE__*/translate('freezing')
      },
      Cold: {
        value: 1,
        text: /*#__PURE__*/translate('cold')
      },
      Mild: {
        value: 2,
        text: /*#__PURE__*/translate('mild')
      },
      Warm: {
        value: 3,
        text: /*#__PURE__*/translate('warm')
      },
      Hot: {
        value: 4,
        text: /*#__PURE__*/translate('hot')
      }
    }
  },
  Event: {
    EVENT_TIME_RANGE: [3, 6],
    PANEL_FADE: 200,
    FIGHT_SPEED: 100,
    EAT_COOLDOWN: 5,
    MEDS_COOLDOWN: 7,
    LEAVE_COOLDOWN: 1,
    STUN_DURATION: 4000
  },
  Outside: {
    name: /*#__PURE__*/translate('Outside'),
    STORES_OFFSET: 0,
    GATHER_DELAY: 60,
    TRAPS_DELAY: 90,
    POP_DELAY: [0.5, 3],
    HUT_ROOM: 4,
    INCOME: {
      gatherer: {
        name: /*#__PURE__*/translate('gatherer'),
        delay: 10,
        stores: (_stores = {}, _stores[StoreCategory.wood] = 1, _stores)
      },
      hunter: {
        name: /*#__PURE__*/translate('hunter'),
        delay: 10,
        stores: (_stores2 = {}, _stores2[StoreCategory.fur] = 0.5, _stores2[StoreCategory.meat] = 0.5, _stores2)
      },
      trapper: {
        name: /*#__PURE__*/translate('trapper'),
        delay: 10,
        stores: (_stores3 = {}, _stores3[StoreCategory.meat] = -1, _stores3[StoreCategory.bait] = 1, _stores3)
      },
      tanner: {
        name: /*#__PURE__*/translate('tanner'),
        delay: 10,
        stores: (_stores4 = {}, _stores4[StoreCategory.fur] = -5, _stores4[StoreCategory.leather] = 1, _stores4)
      },
      charcutier: {
        name: /*#__PURE__*/translate('charcutier'),
        delay: 10,
        stores: (_stores5 = {}, _stores5[StoreCategory.meat] = -5, _stores5[StoreCategory.wood] = -5, _stores5[StoreCategory.cured_meat] = 1, _stores5)
      },
      iron_miner: {
        name: /*#__PURE__*/translate('iron miner'),
        delay: 10,
        stores: (_stores6 = {}, _stores6[StoreCategory.cured_meat] = -1, _stores6[StoreCategory.iron] = 1, _stores6)
      },
      coal_miner: {
        name: /*#__PURE__*/translate('coal miner'),
        delay: 10,
        stores: (_stores7 = {}, _stores7[StoreCategory.cured_meat] = -1, _stores7[StoreCategory.coal] = 1, _stores7)
      },
      sulphur_miner: {
        name: /*#__PURE__*/translate('sulphur miner'),
        delay: 10,
        stores: (_stores8 = {}, _stores8[StoreCategory.cured_meat] = -1, _stores8[StoreCategory.sulphur] = 1, _stores8)
      },
      steelworker: {
        name: /*#__PURE__*/translate('steelworker'),
        delay: 10,
        stores: (_stores9 = {}, _stores9[StoreCategory.iron] = -1, _stores9[StoreCategory.coal] = -1, _stores9[StoreCategory.steel] = 1, _stores9)
      },
      armourer: {
        name: /*#__PURE__*/translate('armourer'),
        delay: 10,
        stores: (_stores10 = {}, _stores10[StoreCategory.steel] = -1, _stores10[StoreCategory.sulphur] = -1, _stores10[StoreCategory.bullets] = 1, _stores10)
      }
    },
    TrapDrops: [{
      rollUnder: 0.5,
      name: 'fur',
      message: /*#__PURE__*/translate('scraps of fur')
    }, {
      rollUnder: 0.75,
      name: 'meat',
      message: /*#__PURE__*/translate('bits of meat')
    }, {
      rollUnder: 0.85,
      name: 'scales',
      message: /*#__PURE__*/translate('strange scales')
    }, {
      rollUnder: 0.93,
      name: 'teeth',
      message: /*#__PURE__*/translate('scattered teeth')
    }, {
      rollUnder: 0.995,
      name: 'cloth',
      message: /*#__PURE__*/translate('tattered cloth')
    }, {
      rollUnder: 1.0,
      name: 'charm',
      message: /*#__PURE__*/translate('a crudely made charm')
    }]
  },
  Path: {
    DEFAULT_BAG_SPACE: 10,
    STORES_OFFSET: 0,
    // Everything not in this list weighs 1
    Weight: {
      bone_spear: 2,
      iron_sword: 3,
      steel_sword: 5,
      rifle: 5,
      bullets: 0.1,
      energy_cell: 0.2,
      laser_rifle: 5,
      bolas: 0.5
    },
    name: /*#__PURE__*/translate('A Dusty Path'),
    Outfit: Outfits
  },
  Ship: {
    LIFTOFF_COOLDOWN: 120,
    ALLOY_PER_HULL: 1,
    ALLOY_PER_THRUSTER: 1,
    BASE_HULL: 0,
    BASE_THRUSTERS: 1,
    name: /*#__PURE__*/translate('Ship')
  },
  Space: {
    SHIP_SPEED: 3,
    BASE_ASTEROID_DELAY: 500,
    BASE_ASTEROID_SPEED: 1500,
    FTB_SPEED: 60000,
    STAR_WIDTH: 3000,
    STAR_HEIGHT: 3000,
    NUM_STARS: 200,
    STAR_SPEED: 60000,
    FRAME_DELAY: 100
  },
  Prestige: {
    storesMap: [{
      store: StoreCategory.wood,
      type: 'g'
    }, {
      store: StoreCategory.fur,
      type: 'g'
    }, {
      store: StoreCategory.meat,
      type: 'g'
    }, {
      store: StoreCategory.iron,
      type: 'g'
    }, {
      store: StoreCategory.coal,
      type: 'g'
    }, {
      store: StoreCategory.sulphur,
      type: 'g'
    }, {
      store: StoreCategory.steel,
      type: 'g'
    }, {
      store: StoreCategory.cured_meat,
      type: 'g'
    }, {
      store: StoreCategory.scales,
      type: 'g'
    }, {
      store: StoreCategory.teeth,
      type: 'g'
    }, {
      store: StoreCategory.leather,
      type: 'g'
    }, {
      store: StoreCategory.bait,
      type: 'g'
    }, {
      store: StoreCategory.torch,
      type: 'g'
    }, {
      store: StoreCategory.cloth,
      type: 'g'
    }, {
      store: StoreCategory.bone_spear,
      type: 'w'
    }, {
      store: StoreCategory.iron_sword,
      type: 'w'
    }, {
      store: StoreCategory.steel_sword,
      type: 'w'
    }, {
      store: StoreCategory.bayonet,
      type: 'w'
    }, {
      store: StoreCategory.rifle,
      type: 'w'
    }, {
      store: StoreCategory.laser_rifle,
      type: 'w'
    }, {
      store: StoreCategory.bullets,
      type: 'a'
    }, {
      store: StoreCategory.energy_cell,
      type: 'a'
    }, {
      store: StoreCategory.grenade,
      type: 'a'
    }, {
      store: StoreCategory.bolas,
      type: 'a'
    }]
  }
};

function getDefaultValue(v) {
  var defaultValue = 0;

  if (typeof v === 'boolean') {
    defaultValue = false;
  } else if (typeof v === 'string') {
    defaultValue = '';
  } else if (v === null) {
    defaultValue = null;
  }

  return defaultValue;
}

function _clean(obj, prop) {
  if (!prop) {
    return Object.keys(obj).forEach(function (key) {
      _clean(obj, key);
    });
  }

  var value = _.get(obj, prop);

  if (_.isObject(value)) {
    if (_.isEmpty(value)) {
      delete obj[prop];
    }

    for (var i in value) {
      _clean(value[i], i);
    }
  }
}

var numberValueModify = {
  clean: function clean(state, action) {
    _clean(state, action.payload);
  },
  removeM: function removeM(state, action) {
    action.payload.forEach(function (key) {
      _.unset(state, key);
    });
  },
  set: function set(_, action) {
    var defaultValue = getDefaultValue(action.payload);
    return action.payload || defaultValue;
  },
  setM: function setM(state, action) {
    for (var key in action.payload) {
      if (typeof action.payload[key] === 'undefined') {
        _.set(state, key, undefined);
      } else {
        var defaultValue = getDefaultValue(action.payload[key]);

        _.set(state, key, action.payload[key] || defaultValue);
      }
    }
  },
  addM: function addM(state, action) {
    for (var key in action.payload) {
      _.set(state, key, Math.min(Math.max(_.get(state, key, 0) + (action.payload[key] || 0), 0), config$1.Engine.MAX_STORE));
    }
  }
};

function getInitialState() {
  var rtn = Object.values(StoreCategory).reduce(function (p, c) {
    p[c] = undefined;
    return p;
  }, {});
  return rtn;
}
var storesSlice = /*#__PURE__*/createSlice({
  name: 'stores',
  initialState: /*#__PURE__*/getInitialState(),
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$4 = storesSlice.actions;
var stores = storesSlice.reducer;

var slice$1 = /*#__PURE__*/createSlice({
  name: 'fire',
  initialState: {
    status: config$1.Room.FireStatus.Dead
  },
  reducers: {
    changeFire: function changeFire(state, action) {
      state.status = action.payload;
    }
  }
});
var actions$5 = /*#__PURE__*/_extends({}, slice$1.actions);
var fire = slice$1.reducer;

var slice$2 = /*#__PURE__*/createSlice({
  name: 'builder',
  initialState: {
    level: -1
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$6 = slice$2.actions;
var builder = slice$2.reducer;

var slice$3 = /*#__PURE__*/createSlice({
  name: 'temperature',
  initialState: {
    status: config$1.Room.TemperatureStatus.Freezing
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify, {
    change: function change(state, action) {
      state.status = action.payload;
    }
  })
});
var actions$7 = slice$3.actions;
var temperature = slice$3.reducer;

var slice$4 = /*#__PURE__*/createSlice({
  name: 'thieves',
  initialState: 0,
  reducers: /*#__PURE__*/_extends({}, numberValueModify, {
    change: function change(_, action) {
      return action.payload;
    }
  })
});
var actions$8 = slice$4.actions;
var thieves = slice$4.reducer;

var slice$5 = /*#__PURE__*/createSlice({
  name: 'stolen',
  initialState: /*#__PURE__*/getInitialState(),
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$9 = slice$5.actions;
var stolen = slice$5.reducer;

var slice$6 = /*#__PURE__*/createSlice({
  name: 'stores',
  initialState: {},
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$a = slice$6.actions;
var buildings = slice$6.reducer;

var slice$7 = /*#__PURE__*/createSlice({
  name: 'population',
  initialState: {
    value: 0
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$b = slice$7.actions;
var population = slice$7.reducer;

var slice$8 = /*#__PURE__*/createSlice({
  name: 'workers',
  initialState: {},
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$c = slice$8.actions;
var workers = slice$8.reducer;

var slice$9 = /*#__PURE__*/createSlice({
  name: 'city',
  initialState: {
    cleared: false
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$d = slice$9.actions;
var city = slice$9.reducer;

var slice$a = /*#__PURE__*/createSlice({
  name: 'world',
  initialState: {
    seenAll: false,
    mask: [],
    map: [],
    enableShip: false,
    ship: [0, 0],
    dir: '',
    sulphurmine: false,
    ironmine: false,
    coalmine: false,
    water: 0,
    danger: false,
    foodMove: 0,
    waterMove: 0,
    starvation: false,
    thirst: false,
    usedOutposts: {},
    curPos: /*#__PURE__*/_.cloneDeep(config$1.World.VILLAGE_POS),
    health: 0,
    dead: false,
    fightMove: 0,
    outfit: {},
    stunned: 0
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify, {
    seeAll: function seeAll(state, action) {
      state.seenAll = action.payload;
    },
    visit: function visit(state, action) {
      var _action$payload = action.payload,
          x = _action$payload.x,
          y = _action$payload.y;
      state.map[x][y] = state.map[x][y].replace('!') + '!';
    },
    useOutpost: function useOutpost(state) {
      state.usedOutposts[state.curPos[0] + ',' + state.curPos[1]] = true;
    },
    setMap: function setMap(state, action) {
      var _action$payload2 = action.payload,
          pos = _action$payload2.pos,
          value = _action$payload2.value;
      state.map[pos[0]][pos[1]] = value;
    }
  })
});
var actions$e = /*#__PURE__*/_extends({}, slice$a.actions);
var world = slice$a.reducer;

var slice$b = /*#__PURE__*/createSlice({
  name: 'space_ship',
  initialState: {
    hull: 0,
    thrusters: 1,
    seenShip: false,
    seenWarning: false
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$f = slice$b.actions;
var spaceShip = slice$b.reducer;

var slice$c = /*#__PURE__*/createSlice({
  name: 'outside',
  initialState: {
    seenForest: false
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$g = slice$c.actions;
var outside = slice$c.reducer;

var game = /*#__PURE__*/combineReducers({
  fire: fire,
  builder: builder,
  temperature: temperature,
  thieves: thieves,
  stolen: stolen,
  buildings: buildings,
  population: population,
  workers: workers,
  city: city,
  world: world,
  spaceShip: spaceShip,
  outside: outside
});
var actions$h = {
  fire: actions$5,
  builder: actions$6,
  temperature: actions$7,
  thieves: actions$8,
  stolen: actions$9,
  buildings: actions$a,
  population: actions$b,
  workers: actions$c,
  city: actions$d,
  world: actions$e,
  spaceShip: actions$f,
  outside: actions$g
};

var notify = /*#__PURE__*/createAsyncThunk('notifications/notify', /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(data, _ref) {
    var getState, appState, _data$message, text, module;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getState = _ref.getState;
            appState = getState();
            _data$message = data.message, text = _data$message.text, module = _data$message.module;

            if (text.slice(-1) != '.') {
              text += '.';
            }

            if (!(module && appState.engine.activeSpace != module)) {
              _context.next = 9;
              break;
            }

            if (data.noQueue) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", data.message);

          case 7:
            _context.next = 10;
            break;

          case 9:
            return _context.abrupt("return", _extends({}, data.message, {
              _module: data.message.module,
              module: 'global'
            }));

          case 10:
            return _context.abrupt("return", null);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());
var storesSlice$1 = /*#__PURE__*/createSlice({
  name: 'notifications',
  initialState: {
    notifyQueue: {
      global: []
    }
  },
  reducers: {
    spaceNotify: function spaceNotify(state, action) {
      var queue = state.notifyQueue[action.payload] || [];
      state.notifyQueue[action.payload] = [];
      queue.forEach(function (message) {
        message._module = message.module;
        message.module = 'global';
      });
      state.notifyQueue['global'] = [].concat(state.notifyQueue['global'], queue);
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(notify.fulfilled, function (state, action) {
      var message = action.payload;

      if (message) {
        var module = message.module || 'global';

        if (!state.notifyQueue[module]) {
          state.notifyQueue[module] = [];
        }

        state.notifyQueue[module].push(message);
      }
    });
  }
});
var actions$i = /*#__PURE__*/_extends({}, storesSlice$1.actions, {
  notify: notify
});
var notifications = storesSlice$1.reducer;

var changeSpace = /*#__PURE__*/createAsyncThunk('engine/changeSapce', /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(space, _ref) {
    var getState, dispatch, appState, prevSpace;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getState = _ref.getState, dispatch = _ref.dispatch;
            appState = getState();
            prevSpace = appState.engine.activeSpace;

            if (prevSpace !== space) {
              dispatch(actions$i.spaceNotify(space));
            }

            return _context.abrupt("return", space);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());
var configSlice$1 = /*#__PURE__*/createSlice({
  name: 'engine',
  initialState: {
    activeSubSpace: ''
  },
  reducers: {
    changeSubSpace: function changeSubSpace(state, action) {
      state.activeSubSpace = action.payload;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(changeSpace.fulfilled, function (state, action) {
      state.activeSpace = action.payload;
    });
  }
});
var actions$j = /*#__PURE__*/_extends({}, configSlice$1.actions, {
  changeSpace: changeSpace
});
var engine = configSlice$1.reducer;

var slice$d = /*#__PURE__*/createSlice({
  name: 'income',
  initialState: {},
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$k = slice$d.actions;
var income = slice$d.reducer;

function getInitialState$1() {
  return Object.keys(Perks).reduce(function (accumulator, current) {
    accumulator[current] = false;
    return accumulator;
  }, {});
}
var addPerk = /*#__PURE__*/createAsyncThunk('character/perks/add', /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(category, _ref) {
    var dispatch, perk;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch = _ref.dispatch;
            perk = Perks[category];
            dispatch(actions$i.notify({
              message: {
                text: perk.notify
              }
            }));
            return _context.abrupt("return", category);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());
var slice$e = /*#__PURE__*/createSlice({
  name: 'perks',
  initialState: /*#__PURE__*/getInitialState$1(),
  reducers: {},
  extraReducers: function extraReducers(builder) {
    builder.addCase(addPerk.fulfilled, function (state, action) {
      state[action.payload] = true;
    });
  }
});
var actions$l = /*#__PURE__*/_extends({}, slice$e.actions, {
  addPerk: addPerk
});
var perks = slice$e.reducer;

var slice$f = /*#__PURE__*/createSlice({
  name: 'statistics',
  initialState: {
    punches: 0,
    starved: 0,
    dehydrated: 0,
    cityCleared: false
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$m = /*#__PURE__*/_extends({}, slice$f.actions);
var statistics = slice$f.reducer;

var character = /*#__PURE__*/combineReducers({
  perks: perks,
  statistics: statistics
});
var actions$n = {
  perks: actions$l,
  statistics: actions$m
};

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

var storesSlice$2 = /*#__PURE__*/createSlice({
  name: 'events',
  initialState: {
    eventStack: [],
    activeScene: '',
    delay: {},
    loot: {},
    enemys: [],
    won: false,
    fightEvents: []
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify, {
    end: function end(state, _) {
      state.eventStack.shift();
      state.activeScene = '';
      state.enemys = [];
      state.won = false;
      state.fightEvents = [];
    },
    cleanEnemys: function cleanEnemys(state) {
      state.enemys = [];
      state.won = false;
      state.fightEvents = [];
    },
    logFight: function logFight(state, action) {
      if (!state.fightEvents) {
        state.fightEvents = [];
      }

      state.fightEvents.push(_extends({}, action.payload, {
        id: uuidv4()
      }));
    },
    push: function push(state, action) {
      state.eventStack.unshift(action.payload);
    },
    setSceneEnemy: function setSceneEnemy(state, action) {
      var scene = action.payload;
      state.enemys = [{
        chara: scene.chara,
        health: scene.health,
        maxHealth: scene.health,
        stunned: 0
      }];
      state.fightEvents = [];
      state.won = false;
    },
    winFight: function winFight(state) {
      state.won = true;
    }
  })
});
var actions$o = /*#__PURE__*/_extends({}, storesSlice$2.actions);
var events = storesSlice$2.reducer;

var storesSlice$3 = /*#__PURE__*/createSlice({
  name: 'previous',
  initialState: {
    stores: [],
    score: 0
  },
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$p = /*#__PURE__*/_extends({}, storesSlice$3.actions);
var previous = storesSlice$3.reducer;

var slice$g = /*#__PURE__*/createSlice({
  name: 'room',
  initialState: {
    changed: true,
    crafts: {},
    buys: {}
  },
  reducers: {
    setChanged: function setChanged(state, action) {
      state.changed = action.payload;
    },
    addCraft: function addCraft(state, action) {
      var name = action.payload.name;
      state.crafts[name] = true;
    },
    addBuy: function addBuy(state, action) {
      var name = action.payload.name;
      state.buys[name] = true;
    }
  }
});
var actions$q = slice$g.actions;
var room = slice$g.reducer;

var slice$h = /*#__PURE__*/createSlice({
  name: 'outfit',
  initialState: {},
  reducers: /*#__PURE__*/_extends({}, numberValueModify, {
    empty: function empty() {
      return {};
    }
  })
});
var actions$r = slice$h.actions;
var outfit = slice$h.reducer;

var path = /*#__PURE__*/combineReducers({
  outfit: outfit
});
var actions$s = {
  outfit: actions$r
};

var slice$i = /*#__PURE__*/createSlice({
  name: 'delay',
  initialState: {},
  reducers: /*#__PURE__*/_extends({}, numberValueModify)
});
var actions$t = /*#__PURE__*/_extends({}, slice$i.actions);
var delay = slice$i.reducer;

var record = /*#__PURE__*/createAsyncThunk('operation/record', /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(opt, _ref) {
    var extra, now, cooldown;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            extra = _ref.extra;
            now = Date.now();
            cooldown = opt.cooldown ? opt.cooldown(extra.engine, opt) : 0;
            return _context.abrupt("return", {
              lastExecTime: now,
              id: opt.id,
              cooldown: cooldown,
              cooldownAt: now + cooldown * 1000
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());
var slice$j = /*#__PURE__*/createSlice({
  name: 'operation',
  initialState: {},
  reducers: {
    clearCooldown: function clearCooldown(state, action) {
      var id = action.payload;
      var history = state[id];

      if (history) {
        state[id].cooldownAt = 0;
      }
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(record.fulfilled, function (state, action) {
      var history = action.payload;
      state[history.id] = history;
    });
  }
});
var actions$u = /*#__PURE__*/_extends({}, slice$j.actions, {
  record: record
});
var operation = slice$j.reducer;

var reducer = /*#__PURE__*/combineReducers({
  room: room,
  marketing: marketing,
  config: config,
  features: features,
  stores: stores,
  game: game,
  engine: engine,
  income: income,
  character: character,
  events: events,
  notifications: notifications,
  previous: previous,
  path: path,
  delay: delay,
  operation: operation
});
var actions$v = {
  config: actions$1,
  stores: actions$4,
  game: actions$h,
  engine: actions$j,
  income: actions$k,
  character: actions$n,
  marketing: actions,
  events: actions$o,
  notifications: actions$i,
  previous: actions$p,
  features: actions$3,
  room: actions$q,
  path: actions$s,
  delay: actions$t,
  operation: actions$u
};

var moddles = [];

if (process.env.NODE_ENV === 'development') {
  moddles.push(logger);
}

function createState(engine, state) {
  var store = configureStore({
    reducer: reducer,
    preloadedState: state,
    middleware: function middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: {
            engine: engine
          }
        }
      }).concat(moddles);
    }
  });
  return store;
}

var enable = false;
function config$2(options) {
  enable = options.enable || false;
}
function log() {
  var _console;

  if (!enable) {
    return;
  }

  (_console = console).log.apply(_console, arguments);
}

var events$1 = [{
  title: /*#__PURE__*/translate('The Thief'),
  isAvailable: function isAvailable(state) {
    return (state.engine.activeSpace === GameSpace.Room || state.engine.activeSpace === GameSpace.Outside) && state.game.thieves === 1;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('the villagers haul a filthy man out of the store room.'), /*#__PURE__*/translate('say his folk have been skimming the supplies.'), /*#__PURE__*/translate('say he should be strung up as an example.')],
      notification: /*#__PURE__*/translate('a thief is caught'),
      blink: true,
      buttons: {
        kill: {
          text: /*#__PURE__*/translate('hang him'),
          nextScene: {
            1: 'hang'
          }
        },
        spare: {
          text: /*#__PURE__*/translate('spare him'),
          nextScene: {
            1: 'spare'
          }
        }
      }
    },
    hang: {
      text: [/*#__PURE__*/translate('the villagers hang the thief high in front of the store room.'), /*#__PURE__*/translate('the point is made. in the next few days, the missing supplies are returned.')],
      onLoad: function onLoad(engine) {
        var _engine$store, _engine$store2, _engine$store3, _engine$store4;

        (_engine$store = engine.store) == null ? void 0 : _engine$store.dispatch(engine.actions.game.thieves.set(2));
        (_engine$store2 = engine.store) == null ? void 0 : _engine$store2.dispatch(engine.actions.income.setM({
          thieves: 0
        }));
        (_engine$store3 = engine.store) == null ? void 0 : _engine$store3.dispatch(engine.actions.stores.addM((_engine$store4 = engine.store) == null ? void 0 : _engine$store4.getState().game.stolen));
      },
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('leave'),
          nextScene: 'end'
        }
      }
    },
    spare: {
      text: [/*#__PURE__*/translate("the man says he's grateful. says he won't come around any more."), /*#__PURE__*/translate('shares what he knows about sneaking before he goes.')],
      onLoad: function onLoad(engine) {
        var _engine$store5, _engine$store6, _engine$store7;

        (_engine$store5 = engine.store) == null ? void 0 : _engine$store5.dispatch(engine.actions.game.thieves.set(2));
        (_engine$store6 = engine.store) == null ? void 0 : _engine$store6.dispatch(engine.actions.income.setM({
          thieves: 0
        }));
        (_engine$store7 = engine.store) == null ? void 0 : _engine$store7.dispatch(engine.actions.character.perks.addPerk(PerkCategory.stealthy));
      },
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('leave'),
          nextScene: 'end'
        }
      }
    }
  }
}];

var events$2 = [{
  /* The Nomad  --  Merchant */
  title: /*#__PURE__*/translate('The Nomad'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && !!state.stores.fur;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('a nomad shuffles into view, laden with makeshift bags bound with rough twine.'), /*#__PURE__*/translate("won't say from where he came, but it's clear that he's not staying.")],
      notification: /*#__PURE__*/translate('a nomad arrives, looking to trade'),
      blink: true,
      buttons: {
        buyScales: {
          text: /*#__PURE__*/translate('buy scales'),
          cost: {
            fur: 100
          },
          reward: {
            scales: 1
          }
        },
        buyTeeth: {
          text: /*#__PURE__*/translate('buy teeth'),
          cost: {
            fur: 200
          },
          reward: {
            teeth: 1
          }
        },
        buyBait: {
          text: /*#__PURE__*/translate('buy bait'),
          cost: {
            fur: 5
          },
          reward: {
            bait: 1
          },
          notification: /*#__PURE__*/translate('traps are more effective with bait.')
        },
        buyCompass: {
          available: function available(state) {
            return !!state.stores.compass;
          },
          text: /*#__PURE__*/translate('buy compass'),
          cost: {
            fur: 300,
            scales: 15,
            teeth: 5
          },
          reward: {
            compass: 1
          },
          notification: /*#__PURE__*/translate('the old compass is dented and dusty, but it looks to work.')
        },
        goodbye: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  /* Noises Outside  --  gain wood/fur */
  title: /*#__PURE__*/translate('Noises'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && !!state.stores.wood;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('through the walls, shuffling noises can be heard.'), /*#__PURE__*/translate("can't tell what they're up to.")],
      notification: /*#__PURE__*/translate('strange noises can be heard through the walls'),
      blink: true,
      buttons: {
        investigate: {
          text: /*#__PURE__*/translate('investigate'),
          nextScene: {
            0.3: 'stuff',
            1: 'nothing'
          }
        },
        ignore: {
          text: /*#__PURE__*/translate('ignore them'),
          nextScene: 'end'
        }
      }
    },
    nothing: {
      text: [/*#__PURE__*/translate('vague shapes move, just out of sight.'), /*#__PURE__*/translate('the sounds stop.')],
      buttons: {
        backinside: {
          text: /*#__PURE__*/translate('go back inside'),
          nextScene: 'end'
        }
      }
    },
    stuff: {
      reward: {
        wood: 100,
        fur: 10
      },
      text: [/*#__PURE__*/translate('a bundle of sticks lies just beyond the threshold, wrapped in coarse furs.'), /*#__PURE__*/translate('the night is silent.')],
      buttons: {
        backinside: {
          text: /*#__PURE__*/translate('go back inside'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  /* Noises Inside  --  trade wood for better good */
  title: /*#__PURE__*/translate('Noises'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && !!state.stores.wood;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('scratching noises can be heard from the store room.'), /*#__PURE__*/translate("something's in there.")],
      notification: /*#__PURE__*/translate("something's in the store room"),
      blink: true,
      buttons: {
        investigate: {
          text: /*#__PURE__*/translate('investigate'),
          nextScene: {
            0.5: 'scales',
            0.8: 'teeth',
            1: 'cloth'
          }
        },
        ignore: {
          text: /*#__PURE__*/translate('ignore them'),
          nextScene: 'end'
        }
      }
    },
    scales: {
      text: [/*#__PURE__*/translate('some wood is missing.'), /*#__PURE__*/translate('the ground is littered with small scales')],
      onLoad: function onLoad(engine) {
        var _engine$store, _engine$store2;

        var state = (_engine$store = engine.store) == null ? void 0 : _engine$store.getState();
        var numWood = (state == null ? void 0 : state.stores.wood) || 0;
        numWood = Math.floor(numWood * 0.1);
        if (numWood === 0) numWood = 1;
        var numScales = Math.floor(numWood / 5);
        if (numScales === 0) numScales = 1;
        (_engine$store2 = engine.store) == null ? void 0 : _engine$store2.dispatch(engine.actions.stores.addM({
          wood: -numWood,
          scales: numScales
        }));
      },
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('leave'),
          nextScene: 'end'
        }
      }
    },
    teeth: {
      text: [/*#__PURE__*/translate('some wood is missing.'), /*#__PURE__*/translate('the ground is littered with small teeth')],
      onLoad: function onLoad(engine) {
        var _engine$store3, _engine$store4;

        var state = (_engine$store3 = engine.store) == null ? void 0 : _engine$store3.getState();
        var numWood = (state == null ? void 0 : state.stores.wood) || 0;
        numWood = Math.floor(numWood * 0.1);
        if (numWood === 0) numWood = 1;
        var numTeeth = Math.floor(numWood / 5);
        if (numTeeth === 0) numTeeth = 1;
        (_engine$store4 = engine.store) == null ? void 0 : _engine$store4.dispatch(engine.actions.stores.addM({
          wood: -numWood,
          teeth: numTeeth
        }));
      },
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('leave'),
          nextScene: 'end'
        }
      }
    },
    cloth: {
      text: [/*#__PURE__*/translate('some wood is missing.'), /*#__PURE__*/translate('the ground is littered with scraps of cloth')],
      onLoad: function onLoad(engine) {
        var _engine$store5, _engine$store6;

        var state = (_engine$store5 = engine.store) == null ? void 0 : _engine$store5.getState();
        var numWood = (state == null ? void 0 : state.stores.wood) || 0;
        numWood = Math.floor(numWood * 0.1);
        if (numWood === 0) numWood = 1;
        var numCloth = Math.floor(numWood / 5);
        if (numCloth === 0) numCloth = 1;
        (_engine$store6 = engine.store) == null ? void 0 : _engine$store6.dispatch(engine.actions.stores.addM({
          wood: -numWood,
          cloth: numCloth
        }));
      },
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('leave'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  /* The Beggar  --  trade fur for better good */
  title: /*#__PURE__*/translate('The Beggar'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && !!state.stores.fur;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('a beggar arrives.'), /*#__PURE__*/translate('asks for any spare furs to keep him warm at night.')],
      notification: /*#__PURE__*/translate('a beggar arrives'),
      blink: true,
      buttons: {
        '50furs': {
          text: /*#__PURE__*/translate('give 50'),
          cost: {
            fur: 50
          },
          nextScene: {
            0.5: 'scales',
            0.8: 'teeth',
            1: 'cloth'
          }
        },
        '100furs': {
          text: /*#__PURE__*/translate('give 100'),
          cost: {
            fur: 100
          },
          nextScene: {
            0.5: 'teeth',
            0.8: 'scales',
            1: 'cloth'
          }
        },
        deny: {
          text: /*#__PURE__*/translate('turn him away'),
          nextScene: 'end'
        }
      }
    },
    scales: {
      reward: {
        scales: 20
      },
      text: [/*#__PURE__*/translate('the beggar expresses his thanks.'), /*#__PURE__*/translate('leaves a pile of small scales behind.')],
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    },
    teeth: {
      reward: {
        teeth: 20
      },
      text: [/*#__PURE__*/translate('the beggar expresses his thanks.'), /*#__PURE__*/translate('leaves a pile of small teeth behind.')],
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    },
    cloth: {
      reward: {
        cloth: 20
      },
      text: [/*#__PURE__*/translate('the beggar expresses his thanks.'), /*#__PURE__*/translate('leaves some scraps of cloth behind.')],
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  /* The Shady Builder */
  title: /*#__PURE__*/translate('The Shady Builder'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && state.game.buildings.hut >= 5 && state.game.buildings.hut < 20;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('a shady builder passes through'), /*#__PURE__*/translate('says he can build you a hut for less wood')],
      notification: /*#__PURE__*/translate('a shady builder passes through'),
      buttons: {
        build: {
          text: /*#__PURE__*/translate('300 wood'),
          cost: {
            wood: 300
          },
          nextScene: {
            0.6: 'steal',
            1: 'build'
          }
        },
        deny: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    },
    steal: {
      text: [/*#__PURE__*/translate('the shady builder has made off with your wood')],
      notification: /*#__PURE__*/translate('the shady builder has made off with your wood'),
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          nextScene: 'end'
        }
      }
    },
    build: {
      text: [/*#__PURE__*/translate('the shady builder builds a hut')],
      notification: /*#__PURE__*/translate('the shady builder builds a hut'),
      onLoad: function onLoad(engine) {
        var _engine$store7;

        var state = (_engine$store7 = engine.store) == null ? void 0 : _engine$store7.getState();
        var n = state.game.buildings.hut;

        if (n < 20) {
          var _engine$store8;

          (_engine$store8 = engine.store) == null ? void 0 : _engine$store8.dispatch(engine.actions.game.buildings.setM({
            hut: n + 1
          }));
        }
      },
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  /* Mysterious Wanderer  --  wood gambling */
  title: /*#__PURE__*/translate('The Mysterious Wanderer'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && !!state.stores.wood;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate("a wanderer arrives with an empty cart. says if he leaves with wood, he'll be back with more."), /*#__PURE__*/translate("builder's not sure he's to be trusted.")],
      notification: /*#__PURE__*/translate('a mysterious wanderer arrives'),
      blink: true,
      buttons: {
        wood100: {
          text: /*#__PURE__*/translate('give 100'),
          cost: {
            wood: 100
          },
          nextScene: {
            1: 'wood100'
          }
        },
        wood500: {
          text: /*#__PURE__*/translate('give 500'),
          cost: {
            wood: 500
          },
          nextScene: {
            1: 'wood500'
          }
        },
        deny: {
          text: /*#__PURE__*/translate('turn him away'),
          nextScene: 'end'
        }
      }
    },
    wood100: {
      text: [/*#__PURE__*/translate('the wanderer leaves, cart loaded with wood')],
      action: function action(inputDelay, engine) {
        engine.events.saveDelay(function (engine) {
          var _engine$store9;

          (_engine$store9 = engine.store) == null ? void 0 : _engine$store9.dispatch(engine.actions.stores.addM({
            wood: 300
          }));
          engine.notify(translate('the mysterious wanderer returns, cart piled high with wood.'), GameSpace.Room);
        }, GameSpace.Room + "[4].scenes.wood100.action", inputDelay);
      },
      onLoad: function onLoad(engine) {
        if (Math.random() < 0.5) {
          this.action(60, engine);
        }
      },
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    },
    wood500: {
      text: [/*#__PURE__*/translate('the wanderer leaves, cart loaded with wood')],
      action: function action(inputDelay, engine) {
        engine.events.saveDelay(function (engine) {
          var _engine$store10;

          (_engine$store10 = engine.store) == null ? void 0 : _engine$store10.dispatch(engine.actions.stores.addM({
            wood: 1500
          }));
          engine.notify(translate('the mysterious wanderer returns, cart piled high with wood.'), GameSpace.Room);
        }, GameSpace.Room + "[4].scenes.wood500.action", inputDelay);
      },
      onLoad: function onLoad(engine) {
        if (Math.random() < 0.3) {
          this.action(60, engine);
        }
      },
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  /* Mysterious Wanderer  --  fur gambling */
  title: /*#__PURE__*/translate('The Mysterious Wanderer'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && !!state.stores.fur;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate("a wanderer arrives with an empty cart. says if she leaves with furs, she'll be back with more."), /*#__PURE__*/translate("builder's not sure she's to be trusted.")],
      notification: /*#__PURE__*/translate('a mysterious wanderer arrives'),
      blink: true,
      buttons: {
        fur100: {
          text: /*#__PURE__*/translate('give 100'),
          cost: {
            fur: 100
          },
          nextScene: {
            1: 'fur100'
          }
        },
        fur500: {
          text: /*#__PURE__*/translate('give 500'),
          cost: {
            fur: 500
          },
          nextScene: {
            1: 'fur500'
          }
        },
        deny: {
          text: /*#__PURE__*/translate('turn her away'),
          nextScene: 'end'
        }
      }
    },
    fur100: {
      text: [/*#__PURE__*/translate('the wanderer leaves, cart loaded with furs')],
      action: function action(inputDelay, engine) {
        engine.events.saveDelay(function (engine) {
          var _engine$store11;

          (_engine$store11 = engine.store) == null ? void 0 : _engine$store11.dispatch(engine.actions.stores.addM({
            fur: 300
          }));
          engine.notify(translate('the mysterious wanderer returns, cart piled high with furs.'), GameSpace.Room);
        }, GameSpace.Room + "[5].scenes.fur100.action", inputDelay);
      },
      onLoad: function onLoad(engine) {
        if (Math.random() < 0.5) {
          this.action(60, engine);
        }
      },
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    },
    fur500: {
      text: [/*#__PURE__*/translate('the wanderer leaves, cart loaded with furs')],
      action: function action(inputDelay, engine) {
        engine.events.saveDelay(function (engine) {
          var _engine$store12;

          (_engine$store12 = engine.store) == null ? void 0 : _engine$store12.dispatch(engine.actions.stores.addM({
            fur: 1500
          }));
          engine.notify(translate('the mysterious wanderer returns, cart piled high with furs.'), GameSpace.Room);
        }, GameSpace.Room + "[5].scenes.fur500.action", inputDelay);
      },
      onLoad: function onLoad(engine) {
        if (Math.random() < 0.3) {
          this.action(60, engine);
        }
      },
      buttons: {
        leave: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  /* The Scout  --  Map Merchant */
  title: /*#__PURE__*/translate('The Scout'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && state.features.location.World;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate("the scout says she's been all over."), /*#__PURE__*/translate('willing to talk about it, for a price.')],
      notification: /*#__PURE__*/translate('a scout stops for the night'),
      blink: true,
      buttons: {
        buyMap: {
          text: /*#__PURE__*/translate('buy map'),
          cost: {
            fur: 200,
            scales: 10
          },
          available: function available(state) {
            return !state.game.world.seenAll;
          },
          notification: /*#__PURE__*/translate('the map uncovers a bit of the world'),
          onChoose: function onChoose(engine) {
            engine.spaces[GameSpace.World].applyMap();
          }
        },
        learn: {
          text: /*#__PURE__*/translate('learn scouting'),
          cost: {
            fur: 1000,
            scales: 50,
            teeth: 20
          },
          available: function available(state) {
            return !state.character.perks.scout;
          },
          onChoose: function onChoose(engine) {
            var _engine$store13;

            (_engine$store13 = engine.store) == null ? void 0 : _engine$store13.dispatch(engine.actions.character.perks.addPerk(PerkCategory.scout));
          }
        },
        leave: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  /* The Wandering Master */
  title: /*#__PURE__*/translate('The Master'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && state.features.location.World;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('an old wanderer arrives.'), /*#__PURE__*/translate('he smiles warmly and asks for lodgings for the night.')],
      notification: /*#__PURE__*/translate('an old wanderer arrives'),
      blink: true,
      buttons: {
        agree: {
          text: /*#__PURE__*/translate('agree'),
          cost: {
            cured_meat: 100,
            fur: 100,
            torch: 1
          },
          nextScene: {
            1: 'agree'
          }
        },
        deny: {
          text: /*#__PURE__*/translate('turn him away'),
          nextScene: 'end'
        }
      }
    },
    agree: {
      text: [/*#__PURE__*/translate('in exchange, the wanderer offers his wisdom.')],
      buttons: {
        evasion: {
          text: /*#__PURE__*/translate('evasion'),
          available: function available(state) {
            return !state.character.perks.evasive;
          },
          onChoose: function onChoose(engine) {
            var _engine$store14;

            (_engine$store14 = engine.store) == null ? void 0 : _engine$store14.dispatch(engine.actions.character.perks.addPerk(PerkCategory.evasive));
          },
          nextScene: 'end'
        },
        precision: {
          text: /*#__PURE__*/translate('precision'),
          available: function available(state) {
            return !state.character.perks.precise;
          },
          onChoose: function onChoose(engine) {
            var _engine$store15;

            (_engine$store15 = engine.store) == null ? void 0 : _engine$store15.dispatch(engine.actions.character.perks.addPerk(PerkCategory.precise));
          },
          nextScene: 'end'
        },
        force: {
          text: /*#__PURE__*/translate('force'),
          available: function available(state) {
            return !state.character.perks.barbarian;
          },
          onChoose: function onChoose(engine) {
            var _engine$store16;

            (_engine$store16 = engine.store) == null ? void 0 : _engine$store16.dispatch(engine.actions.character.perks.addPerk(PerkCategory.barbarian));
          },
          nextScene: 'end'
        },
        nothing: {
          text: /*#__PURE__*/translate('nothing'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  /* The Sick Man */
  title: /*#__PURE__*/translate('The Sick Man'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Room && !!state.stores.medicine;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('a man hobbles up, coughing.'), /*#__PURE__*/translate('he begs for medicine.')],
      notification: /*#__PURE__*/translate('a sick man hobbles up'),
      blink: true,
      buttons: {
        help: {
          text: /*#__PURE__*/translate('give 1 medicine'),
          cost: {
            medicine: 1
          },
          notification: /*#__PURE__*/translate('the man swallows the medicine eagerly'),
          nextScene: {
            0.1: 'alloy',
            0.3: 'cells',
            0.5: 'scales',
            1.0: 'nothing'
          }
        },
        ignore: {
          text: /*#__PURE__*/translate('tell him to leave'),
          nextScene: 'end'
        }
      }
    },
    alloy: {
      text: [/*#__PURE__*/translate('the man is thankful.'), /*#__PURE__*/translate('he leaves a reward.'), /*#__PURE__*/translate('some weird metal he picked up on his travels.')],
      onLoad: function onLoad(engine) {
        var _engine$store17, _engine$actions$store;

        (_engine$store17 = engine.store) == null ? void 0 : _engine$store17.dispatch(engine.actions.stores.addM((_engine$actions$store = {}, _engine$actions$store[StoreCategory.alien_alloy] = 1, _engine$actions$store)));
      },
      buttons: {
        bye: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    },
    cells: {
      text: [/*#__PURE__*/translate('the man is thankful.'), /*#__PURE__*/translate('he leaves a reward.'), /*#__PURE__*/translate('some weird glowing boxes he picked up on his travels.')],
      onLoad: function onLoad(engine) {
        var _engine$store18, _engine$actions$store2;

        (_engine$store18 = engine.store) == null ? void 0 : _engine$store18.dispatch(engine.actions.stores.addM((_engine$actions$store2 = {}, _engine$actions$store2[StoreCategory.energy_cell] = 3, _engine$actions$store2)));
      },
      buttons: {
        bye: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    },
    scales: {
      text: [/*#__PURE__*/translate('the man is thankful.'), /*#__PURE__*/translate('he leaves a reward.'), /*#__PURE__*/translate('all he has are some scales.')],
      onLoad: function onLoad(engine) {
        var _engine$store19, _engine$actions$store3;

        (_engine$store19 = engine.store) == null ? void 0 : _engine$store19.dispatch(engine.actions.stores.addM((_engine$actions$store3 = {}, _engine$actions$store3[StoreCategory.scales] = 5, _engine$actions$store3)));
      },
      buttons: {
        bye: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    },
    nothing: {
      text: [/*#__PURE__*/translate('the man expresses his thanks and hobbles off.')],
      buttons: {
        bye: {
          text: /*#__PURE__*/translate('say goodbye'),
          nextScene: 'end'
        }
      }
    }
  }
}];

var _reward;
var events$3 = [{
  title: /*#__PURE__*/translate('A Ruined Trap'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace === GameSpace.Outside && state.game.buildings.trap > 0;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('some of the traps have been torn apart.'), /*#__PURE__*/translate('large prints lead away, into the forest.')],
      onLoad: function onLoad(engine) {
        var _engine$store, _engine$store2;

        var state = (_engine$store = engine.store) == null ? void 0 : _engine$store.getState();
        var numWrecked = Math.floor(Math.random() * state.game.buildings.trap) + 1;
        (_engine$store2 = engine.store) == null ? void 0 : _engine$store2.dispatch(engine.actions.game.buildings.addM({
          trap: -numWrecked
        }));
      },
      notification: /*#__PURE__*/translate('some traps have been destroyed'),
      blink: true,
      buttons: {
        track: {
          text: /*#__PURE__*/translate('track them'),
          nextScene: {
            0.5: 'nothing',
            1: 'catch'
          }
        },
        ignore: {
          text: /*#__PURE__*/translate('ignore them'),
          nextScene: 'end'
        }
      }
    },
    nothing: {
      text: [/*#__PURE__*/translate('the tracks disappear after just a few minutes.'), /*#__PURE__*/translate('the forest is silent.')],
      notification: /*#__PURE__*/translate('nothing was found'),
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          nextScene: 'end'
        }
      }
    },
    "catch": {
      text: [/*#__PURE__*/translate('not far from the village lies a large beast, its fur matted with blood.'), /*#__PURE__*/translate('it puts up little resistance before the knife.')],
      notification: /*#__PURE__*/translate("there was a beast. it's dead now"),
      reward: {
        fur: 100,
        meat: 100,
        teeth: 10
      },
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  title: /*#__PURE__*/translate('Fire'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace == GameSpace.Outside && state.game.buildings.hut > 0 && state.game.population.value > 50;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('a fire rampages through one of the huts, destroying it.'), /*#__PURE__*/translate('all residents in the hut perished in the fire.')],
      notification: /*#__PURE__*/translate('a fire has started'),
      blink: true,
      onLoad: function onLoad(engine) {
        engine.spaces.Outside.destroyHuts(1);
      },
      buttons: {
        mourn: {
          text: /*#__PURE__*/translate('mourn'),
          notification: /*#__PURE__*/translate('some villagers have died'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  title: /*#__PURE__*/translate('Sickness'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace == GameSpace.Outside && state.game.population.value > 10 && state.game.population.value < 50 && !!state.stores.medicine;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('a sickness is spreading through the village.'), /*#__PURE__*/translate('medicine is needed immediately.')],
      notification: /*#__PURE__*/translate('some villagers are ill'),
      blink: true,
      buttons: {
        heal: {
          text: /*#__PURE__*/translate('1 medicine'),
          cost: {
            medicine: 1
          },
          nextScene: {
            1: 'healed'
          }
        },
        ignore: {
          text: /*#__PURE__*/translate('ignore it'),
          nextScene: {
            1: 'death'
          }
        }
      }
    },
    healed: {
      text: [/*#__PURE__*/translate('the sickness is cured in time.')],
      notification: /*#__PURE__*/translate('sufferers are healed'),
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          nextScene: 'end'
        }
      }
    },
    death: {
      text: [/*#__PURE__*/translate('the sickness spreads through the village.'), /*#__PURE__*/translate('the days are spent with burials.'), /*#__PURE__*/translate('the nights are rent with screams.')],
      notification: /*#__PURE__*/translate('sufferers are left to die'),
      onLoad: function onLoad(engine) {
        var _engine$store3;

        var state = (_engine$store3 = engine.store) == null ? void 0 : _engine$store3.getState();
        var numKilled = Math.floor(Math.random() * Math.floor(state.game.population.value / 2)) + 1;
        engine.spaces.Outside.killVillagers(numKilled);
      },
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  title: /*#__PURE__*/translate('Plague'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace == GameSpace.Outside && state.game.population.value > 50 && !!state.stores.medicine;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('a terrible plague is fast spreading through the village.'), /*#__PURE__*/translate('medicine is needed immediately.')],
      notification: /*#__PURE__*/translate('a plague afflicts the village'),
      blink: true,
      buttons: {
        buyMedicine: {
          text: /*#__PURE__*/translate('buy medicine'),
          cost: {
            scales: 70,
            teeth: 50
          },
          reward: {
            medicine: 1
          }
        },
        heal: {
          text: /*#__PURE__*/translate('5 medicine'),
          cost: {
            medicine: 5
          },
          nextScene: {
            1: 'healed'
          }
        },
        ignore: {
          text: /*#__PURE__*/translate('do nothing'),
          nextScene: {
            1: 'death'
          }
        }
      }
    },
    healed: {
      text: [/*#__PURE__*/translate('the plague is kept from spreading.'), /*#__PURE__*/translate('only a few die.'), /*#__PURE__*/translate('the rest bury them.')],
      notification: /*#__PURE__*/translate('epidemic is eradicated eventually'),
      onLoad: function onLoad(engine) {
        var numKilled = Math.floor(Math.random() * 5) + 2;
        engine.spaces.Outside.killVillagers(numKilled);
      },
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          nextScene: 'end'
        }
      }
    },
    death: {
      text: [/*#__PURE__*/translate('the plague rips through the village.'), /*#__PURE__*/translate('the nights are rent with screams.'), /*#__PURE__*/translate('the only hope is a quick death.')],
      notification: /*#__PURE__*/translate('population is almost exterminated'),
      onLoad: function onLoad(engine) {
        var numKilled = Math.floor(Math.random() * 80) + 10;
        engine.spaces.Outside.killVillagers(numKilled);
      },
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  title: /*#__PURE__*/translate('A Beast Attack'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace == GameSpace.Outside && state.game.population.value > 0;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('a pack of snarling beasts pours out of the trees.'), /*#__PURE__*/translate('the fight is short and bloody, but the beasts are repelled.'), /*#__PURE__*/translate('the villagers retreat to mourn the dead.')],
      notification: /*#__PURE__*/translate('wild beasts attack the villagers'),
      onLoad: function onLoad(engine) {
        var numKilled = Math.floor(Math.random() * 10) + 1;
        engine.spaces.Outside.killVillagers(numKilled);
      },
      reward: {
        fur: 100,
        meat: 100,
        teeth: 10
      },
      blink: true,
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          notification: /*#__PURE__*/translate('predators become prey. price is unfair'),
          nextScene: 'end'
        }
      }
    }
  }
}, {
  title: /*#__PURE__*/translate('A Military Raid'),
  isAvailable: function isAvailable(state) {
    return state.engine.activeSpace == GameSpace.Outside && state.game.population.value > 0 && state.game.city.cleared;
  },
  scenes: {
    start: {
      text: [/*#__PURE__*/translate('a gunshot rings through the trees.'), /*#__PURE__*/translate('well armed men charge out of the forest, firing into the crowd.'), /*#__PURE__*/translate('after a skirmish they are driven away, but not without losses.')],
      notification: /*#__PURE__*/translate('troops storm the village'),
      onLoad: function onLoad(engine) {
        var numKilled = Math.floor(Math.random() * 40) + 1;
        engine.spaces.Outside.killVillagers(numKilled);
      },
      reward: (_reward = {}, _reward[StoreCategory.bullets] = 10, _reward[StoreCategory.cured_meat] = 50, _reward),
      blink: true,
      buttons: {
        end: {
          text: /*#__PURE__*/translate('go home'),
          notification: /*#__PURE__*/translate('warfare is bloodthirsty'),
          nextScene: 'end'
        }
      }
    }
  }
}];

var events$4 = [// {
  //   title: translate('Penrose'),
  //   isAvailable: state => {
  //     return !state.marketing.penrose;
  //   },
  //   scenes: {
  //     start: {
  //       text: [
  //         translate(
  //           'a strange thrumming, pounding and crashing. visions of people and places, of a huge machine and twisting curves.'
  //         ),
  //         translate('inviting. it would be so easy to give in, completely.'),
  //       ],
  //       notification: translate('a strange thrumming, pounding and crashing. and then gone.'),
  //       blink: true,
  //       buttons: {
  //         'give in': {
  //           text: translate('give in'),
  //           onClick: engine => {
  //             engine.store?.dispatch(
  //               engine.actions.marketing.changePenrose(true)
  //             );
  //           },
  //           nextScene: 'end',
  //         },
  //         ignore: {
  //           text: translate('ignore it'),
  //           nextScene: 'end',
  //         },
  //       },
  //     },
  //   },
  // },
];

var events$5 = {
  outpost: {
    /* Friendly Outpost */
    title: /*#__PURE__*/translate('An Outpost'),
    id: 'outpost',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('a safe place in the wilds.')],
        notification: /*#__PURE__*/translate('a safe place in the wilds.'),
        loot: {
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        onLoad: function onLoad(engine) {
          engine.spaces.World.useOutpost();
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      }
    }
  },
  swamp: {
    /* Swamp */
    title: /*#__PURE__*/translate('A Murky Swamp'),
    id: 'swamp',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('rotting reeds rise out of the swampy earth.'), /*#__PURE__*/translate('a lone frog sits in the muck, silently.')],
        notification: /*#__PURE__*/translate('a swamp festers in the stagnant air.'),
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('enter'),
            nextScene: {
              1: 'cabin'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      cabin: {
        text: [/*#__PURE__*/translate('deep in the swamp is a moss-covered cabin.'), /*#__PURE__*/translate('an old wanderer sits inside, in a seeming trance.')],
        buttons: {
          talk: {
            cost: {
              charm: 1
            },
            text: /*#__PURE__*/translate('talk'),
            nextScene: {
              1: 'talk'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      talk: {
        text: [/*#__PURE__*/translate('the wanderer takes the charm and nods slowly.'), /*#__PURE__*/translate('he speaks of once leading the great fleets to fresh worlds.'), /*#__PURE__*/translate('unfathomable destruction to fuel wanderer hungers.'), /*#__PURE__*/translate('his time here, now, is his penance.')],
        onLoad: function onLoad(engine) {
          var state = engine.store.getState();
          engine.dispatch(engine.actions.character.perks.addPerk(PerkCategory.gastronome));
          engine.spaces.World.markVisited(state == null ? void 0 : state.game.world.curPos[0], state == null ? void 0 : state.game.world.curPos[1]);
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },
  cave: {
    /* Cave */
    title: /*#__PURE__*/translate('A Damp Cave'),
    id: 'cave',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('the mouth of the cave is wide and dark.'), /*#__PURE__*/translate("can't see what's inside.")],
        notification: /*#__PURE__*/translate('the earth here is split, as if bearing an ancient wound'),
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('go inside'),
            cost: {
              torch: 1
            },
            nextScene: {
              0.3: 'a1',
              0.6: 'a2',
              1: 'a3'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      a1: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 1,
        hit: 0.8,
        attackDelay: 1,
        health: 5,
        notification: /*#__PURE__*/translate('a startled beast defends its home'),
        loot: {
          fur: {
            min: 1,
            max: 10,
            chance: 1
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'b1',
              1: 'b2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      a2: {
        text: [/*#__PURE__*/translate('the cave narrows a few feet in.'), /*#__PURE__*/translate('the walls are moist and moss-covered')],
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('squeeze'),
            nextScene: {
              0.5: 'b2',
              1: 'b3'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            nextScene: 'end'
          }
        }
      },
      a3: {
        text: [/*#__PURE__*/translate('the remains of an old camp sits just inside the cave.'), /*#__PURE__*/translate('bedrolls, torn and blackened, lay beneath a thin layer of dust.')],
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1
          },
          torch: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          leather: {
            min: 1,
            max: 5,
            chance: 0.3
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'b3',
              1: 'b4'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b1: {
        text: [/*#__PURE__*/translate('the body of a wanderer lies in a small cavern.'), /*#__PURE__*/translate("rot's been to work on it, and some of the pieces are missing."),
        /*#__PURE__*/
        /// TRANSLATORS : 'it' is a rotting wanderer's body
        translate("can't tell what left it here.")],
        loot: {
          iron_sword: {
            min: 1,
            max: 1,
            chance: 1
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          torch: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'c1'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b2: {
        text: [/*#__PURE__*/translate('the torch sputters and dies in the damp air'), /*#__PURE__*/translate('the darkness is absolute')],
        notification: /*#__PURE__*/translate('the torch goes out'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cost: {
              torch: 1
            },
            nextScene: {
              1: 'c1'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            nextScene: 'end'
          }
        }
      },
      b3: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 1,
        hit: 0.8,
        attackDelay: 1,
        health: 5,
        notification: /*#__PURE__*/translate('a startled beast defends its home'),
        loot: {
          fur: {
            min: 1,
            max: 3,
            chance: 1
          },
          teeth: {
            min: 1,
            max: 2,
            chance: 0.8
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'c2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b4: {
        combat: true,
        enemy: 'cave lizard',
        chara: 'R',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 6,
        notification: /*#__PURE__*/translate('a cave lizard attacks'),
        loot: {
          scales: {
            min: 1,
            max: 3,
            chance: 1
          },
          teeth: {
            min: 1,
            max: 2,
            chance: 0.8
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'c2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c1: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        notification: /*#__PURE__*/translate('a large beast charges out of the dark'),
        loot: {
          fur: {
            min: 1,
            max: 3,
            chance: 1
          },
          teeth: {
            min: 1,
            max: 3,
            chance: 1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end1',
              1: 'end2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c2: {
        combat: true,
        enemy: 'lizard',
        chara: 'T',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        notification: /*#__PURE__*/translate('a giant lizard shambles forward'),
        loot: {
          scales: {
            min: 1,
            max: 3,
            chance: 1
          },
          teeth: {
            min: 1,
            max: 3,
            chance: 1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.7: 'end2',
              1: 'end3'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end1: {
        text: [/*#__PURE__*/translate('the nest of a large animal lies at the back of the cave.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          meat: {
            min: 5,
            max: 10,
            chance: 1
          },
          fur: {
            min: 5,
            max: 10,
            chance: 1
          },
          scales: {
            min: 5,
            max: 10,
            chance: 1
          },
          teeth: {
            min: 5,
            max: 10,
            chance: 1
          },
          cloth: {
            min: 5,
            max: 10,
            chance: 0.5
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end2: {
        text: [/*#__PURE__*/translate('a small supply cache is hidden at the back of the cave.')],
        loot: {
          cloth: {
            min: 5,
            max: 10,
            chance: 1
          },
          leather: {
            min: 5,
            max: 10,
            chance: 1
          },
          iron: {
            min: 5,
            max: 10,
            chance: 1
          },
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1
          },
          steel: {
            min: 5,
            max: 10,
            chance: 0.5
          },
          bolas: {
            min: 1,
            max: 3,
            chance: 0.3
          },
          medicine: {
            min: 1,
            max: 4,
            chance: 0.15
          }
        },
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end3: {
        text: [/*#__PURE__*/translate('an old case is wedged behind a rock, covered in a thick layer of dust.')],
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 1
          },
          bolas: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.3
          }
        },
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave cave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      }
    }
  },
  town: {
    /* Town */
    title: /*#__PURE__*/translate('A Deserted Town'),
    id: 'town',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('a small suburb lays ahead, empty houses scorched and peeling.'), /*#__PURE__*/translate("broken streetlights stand, rusting. light hasn't graced this place in a long time.")],
        notification: /*#__PURE__*/translate('the town lies abandoned, its citizens long dead'),
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('explore'),
            nextScene: {
              0.3: 'a1',
              0.7: 'a3',
              1: 'a2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      a1: {
        text: [/*#__PURE__*/translate("where the windows of the schoolhouse aren't shattered, they're blackened with soot."), /*#__PURE__*/translate('the double doors creak endlessly in the wind.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('enter'),
            nextScene: {
              0.5: 'b1',
              1: 'b2'
            },
            cost: {
              torch: 1
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            nextScene: 'end'
          }
        }
      },
      a2: {
        combat: true,
        enemy: 'thug',
        chara: 'E',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          cloth: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          leather: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        notification: /*#__PURE__*/translate('ambushed on the street.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'b3',
              1: 'b4'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      a3: {
        text: [/*#__PURE__*/translate('a squat building up ahead.'), /*#__PURE__*/translate('a green cross barely visible behind grimy windows.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('enter'),
            nextScene: {
              0.5: 'b5',
              1: 'end5'
            },
            cost: {
              torch: 1
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            nextScene: 'end'
          }
        }
      },
      b1: {
        text: [/*#__PURE__*/translate('a small cache of supplies is tucked inside a rusting locker.')],
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1
          },
          torch: {
            min: 1,
            max: 3,
            chance: 0.8
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.3
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.05
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'c1',
              1: 'c2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b2: {
        combat: true,
        enemy: 'scavenger',
        chara: 'E',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          cloth: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          leather: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        notification: /*#__PURE__*/translate('a scavenger waits just inside the door.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'c2',
              1: 'c3'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b3: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 3,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          teeth: {
            min: 1,
            max: 5,
            chance: 1
          },
          fur: {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        notification: /*#__PURE__*/translate('a beast stands alone in an overgrown park.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'c4',
              1: 'c5'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b4: {
        text: [/*#__PURE__*/translate('an overturned caravan is spread across the pockmarked street.'), /*#__PURE__*/translate("it's been picked over by scavengers, but there's still some things worth taking.")],
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          torch: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.3
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'c5',
              1: 'c6'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b5: {
        combat: true,
        enemy: 'madman',
        chara: 'E',
        damage: 6,
        hit: 0.3,
        attackDelay: 1,
        health: 10,
        loot: {
          cloth: {
            min: 2,
            max: 4,
            chance: 0.3
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.9
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.4
          }
        },
        notification: /*#__PURE__*/translate('a madman attacks, screeching.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.3: 'end5',
              1: 'end6'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c1: {
        combat: true,
        enemy: 'thug',
        chara: 'E',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          cloth: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          leather: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        notification: /*#__PURE__*/translate('a thug moves out of the shadows.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'd1'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c2: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 3,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          teeth: {
            min: 1,
            max: 5,
            chance: 1
          },
          fur: {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        notification: /*#__PURE__*/translate('a beast charges out of a ransacked classroom.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'd1'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c3: {
        text: [/*#__PURE__*/translate('through the large gymnasium doors, footsteps can be heard.'), /*#__PURE__*/translate('the torchlight casts a flickering glow down the hallway.'), /*#__PURE__*/translate('the footsteps stop.')],
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('enter'),
            nextScene: {
              1: 'd1'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            nextScene: 'end'
          }
        }
      },
      c4: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 4,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          teeth: {
            min: 1,
            max: 5,
            chance: 1
          },
          fur: {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        notification: /*#__PURE__*/translate('another beast, draw by the noise, leaps out of a copse of trees.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'd2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c5: {
        text: [/*#__PURE__*/translate("something's causing a commotion a ways down the road."), /*#__PURE__*/translate('a fight, maybe.')],
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              1: 'd2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            nextScene: 'end'
          }
        }
      },
      c6: {
        text: [/*#__PURE__*/translate('a small basket of food is hidden under a park bench, with a note attached.'), /*#__PURE__*/translate("can't read the words.")],
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'd2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d1: {
        combat: true,
        enemy: 'scavenger',
        chara: 'E',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1
          },
          leather: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.5
          }
        },
        notification: /*#__PURE__*/translate('a panicked scavenger bursts through the door, screaming.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end1',
              1: 'end2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d2: {
        combat: true,
        enemy: 'vigilante',
        chara: 'D',
        damage: 6,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1
          },
          leather: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.5
          }
        },
        notification: /*#__PURE__*/translate("a man stands over a dead wanderer. notices he's not alone."),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end3',
              1: 'end4'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end1: {
        text: [/*#__PURE__*/translate('scavenger had a small camp in the school.'), /*#__PURE__*/translate('collected scraps spread across the floor like they fell from heaven.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 1
          },
          steel: {
            min: 5,
            max: 10,
            chance: 1
          },
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1
          },
          bolas: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.3
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end2: {
        text: [/*#__PURE__*/translate("scavenger'd been looking for supplies in here, it seems."), /*#__PURE__*/translate("a shame to let what he'd found go to waste.")],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          coal: {
            min: 5,
            max: 10,
            chance: 1
          },
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1
          },
          leather: {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end3: {
        text: [/*#__PURE__*/translate("beneath the wanderer's rags, clutched in one of its many hands, a glint of steel."), /*#__PURE__*/translate('worth killing for, it seems.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 1
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end4: {
        text: [/*#__PURE__*/translate('eye for an eye seems fair.'), /*#__PURE__*/translate('always worked before, at least.'), /*#__PURE__*/translate('picking the bones finds some useful trinkets.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1
          },
          iron: {
            min: 5,
            max: 10,
            chance: 1
          },
          torch: {
            min: 1,
            max: 5,
            chance: 1
          },
          bolas: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end5: {
        text: [/*#__PURE__*/translate('some medicine abandoned in the drawers.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          medicine: {
            min: 2,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end6: {
        text: [/*#__PURE__*/translate('the clinic has been ransacked.'), /*#__PURE__*/translate('only dust and stains remain.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave town'),
            nextScene: 'end'
          }
        }
      }
    }
  },
  city: {
    /* City */
    title: /*#__PURE__*/translate('A Ruined City'),
    id: 'city',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('a battered highway sign stands guard at the entrance to this once-great city.'), /*#__PURE__*/translate("the towers that haven't crumbled jut from the landscape like the ribcage of some ancient beast."), /*#__PURE__*/translate('might be things worth having still inside.')],
        notification: /*#__PURE__*/translate('the towers of a decaying city dominate the skyline'),
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('explore'),
            nextScene: {
              0.2: 'a1',
              0.5: 'a2',
              0.8: 'a3',
              1: 'a4'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      a1: {
        text: [/*#__PURE__*/translate('the streets are empty.'), /*#__PURE__*/translate('the air is filled with dust, driven relentlessly by the hard winds.')],
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              0.5: 'b1',
              1: 'b2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      a2: {
        text: [/*#__PURE__*/translate('orange traffic cones are set across the street, faded and cracked.'), /*#__PURE__*/translate('lights flash through the alleys between buildings.')],
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              0.5: 'b3',
              1: 'b4'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      a3: {
        text: [/*#__PURE__*/translate('a large shanty town sprawls across the streets.'), /*#__PURE__*/translate('faces, darkened by soot and blood, stare out from crooked huts.')],
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              0.5: 'b5',
              1: 'b6'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      a4: {
        text: [/*#__PURE__*/translate('the shell of an abandoned hospital looms ahead.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('enter'),
            cost: {
              torch: 1
            },
            nextScene: {
              0.5: 'b7',
              1: 'b8'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      b1: {
        text: [/*#__PURE__*/translate('the old tower seems mostly intact.'), /*#__PURE__*/translate('the shell of a burned out car blocks the entrance.'), /*#__PURE__*/translate('most of the windows at ground level are busted anyway.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('enter'),
            nextScene: {
              0.5: 'c1',
              1: 'c2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      b2: {
        combat: true,
        notification: /*#__PURE__*/translate('a huge lizard scrambles up out of the darkness of an old metro station.'),
        enemy: 'lizard',
        chara: 'R',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          scales: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          teeth: {
            min: 5,
            max: 10,
            chance: 0.5
          },
          meat: {
            min: 5,
            max: 10,
            chance: 0.8
          }
        },
        buttons: {
          descend: {
            text: /*#__PURE__*/translate('descend'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'c2',
              1: 'c3'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b3: {
        notification: /*#__PURE__*/translate('the shot echoes in the empty street.'),
        combat: true,
        enemy: 'sniper',
        chara: 'D',
        damage: 15,
        hit: 0.8,
        attackDelay: 4,
        health: 30,
        ranged: true,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          rifle: {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'c4',
              1: 'c5'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b4: {
        notification: /*#__PURE__*/translate('the soldier steps out from between the buildings, rifle raised.'),
        combat: true,
        enemy: 'soldier',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          rifle: {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'c5',
              1: 'c6'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b5: {
        notification: /*#__PURE__*/translate('a frail man stands defiantly, blocking the path.'),
        combat: true,
        enemy: 'frail man',
        chara: 'E',
        damage: 1,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          leather: {
            min: 1,
            max: 1,
            chance: 0.2
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.05
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'c7',
              1: 'c8'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      b6: {
        text: [/*#__PURE__*/translate('nothing but downcast eyes.'), /*#__PURE__*/translate('the people here were broken a long time ago.')],
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              0.5: 'c8',
              1: 'c9'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      b7: {
        text: [/*#__PURE__*/translate('empty corridors.'), /*#__PURE__*/translate('the place has been swept clean by scavengers.')],
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              0.3: 'c12',
              0.7: 'c10',
              1: 'c11'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      b8: {
        notification: /*#__PURE__*/translate('an old man bursts through a door, wielding a scalpel.'),
        combat: true,
        enemy: 'old man',
        chara: 'E',
        damage: 3,
        hit: 0.5,
        attackDelay: 2,
        health: 10,
        loot: {
          cured_meat: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.5
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.3: 'c13',
              0.7: 'c11',
              1: 'end15'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c1: {
        notification: /*#__PURE__*/translate('a thug is waiting on the other side of the wall.'),
        combat: true,
        enemy: 'thug',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.5
          },
          cured_meat: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'd1',
              1: 'd2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c2: {
        notification: /*#__PURE__*/translate('a snarling beast jumps out from behind a car.'),
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 2,
        hit: 0.8,
        attackDelay: 1,
        health: 30,
        loot: {
          meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          fur: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'd2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c3: {
        text: [/*#__PURE__*/translate('street above the subway platform is blown away.'), /*#__PURE__*/translate('lets some light down into the dusty haze.'), /*#__PURE__*/translate('a sound comes from the tunnel, just ahead.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('investigate'),
            cost: {
              torch: 1
            },
            nextScene: {
              0.5: 'd2',
              1: 'd3'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      c4: {
        text: [/*#__PURE__*/translate('looks like a camp of sorts up ahead.'),
        /*#__PURE__*/
        /// TRANSLATORS : chainlink is a type of metal fence.
        translate('rusted chainlink is pulled across an alleyway.'), /*#__PURE__*/translate('fires burn in the courtyard beyond.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              0.5: 'd4',
              1: 'd5'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      c5: {
        text: [/*#__PURE__*/translate('more voices can be heard ahead.'), /*#__PURE__*/translate('they must be here for a reason.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              1: 'd5'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      c6: {
        text: [/*#__PURE__*/translate('the sound of gunfire carries on the wind.'), /*#__PURE__*/translate('the street ahead glows with firelight.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              0.5: 'd5',
              1: 'd6'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      c7: {
        text: [
        /*#__PURE__*/
        /// TRANSLATORS : squatters occupy abandoned dwellings they don't own.
        translate('more squatters are crowding around now.'), /*#__PURE__*/translate('someone throws a stone.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              0.5: 'd7',
              1: 'd8'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      c8: {
        text: [/*#__PURE__*/translate('an improvised shop is set up on the sidewalk.'), /*#__PURE__*/translate('the owner stands by, stoic.')],
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.8
          },
          rifle: {
            min: 1,
            max: 1,
            chance: 0.5
          },
          bullets: {
            min: 1,
            max: 8,
            chance: 0.25
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.01
          },
          medicine: {
            min: 1,
            max: 4,
            chance: 0.5
          }
        },
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'd8'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c9: {
        text: [/*#__PURE__*/translate('strips of meat hang drying by the side of the street.'), /*#__PURE__*/translate('the people back away, avoiding eye contact.')],
        loot: {
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'd8',
              1: 'd9'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c10: {
        text: [/*#__PURE__*/translate('someone has locked and barricaded the door to this operating theatre.')],
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('continue'),
            nextScene: {
              0.2: 'end12',
              0.6: 'd10',
              1: 'd11'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            nextScene: 'end'
          }
        }
      },
      c11: {
        notification: /*#__PURE__*/translate('a tribe of elderly squatters is camped out in this ward.'),
        combat: true,
        enemy: 'squatters',
        plural: true,
        chara: 'EEE',
        damage: 2,
        hit: 0.7,
        attackDelay: 0.5,
        health: 40,
        loot: {
          cured_meat: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          cloth: {
            min: 3,
            max: 8,
            chance: 0.8
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.3
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'end10'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c12: {
        notification: /*#__PURE__*/translate('a pack of lizards rounds the corner.'),
        combat: true,
        enemy: 'lizards',
        plural: true,
        chara: 'RRR',
        damage: 4,
        hit: 0.7,
        attackDelay: 0.7,
        health: 30,
        loot: {
          meat: {
            min: 3,
            max: 8,
            chance: 1
          },
          teeth: {
            min: 2,
            max: 4,
            chance: 1
          },
          scales: {
            min: 3,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'end10'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      c13: {
        text: [/*#__PURE__*/translate('strips of meat are hung up to dry in this ward.')],
        loot: {
          cured_meat: {
            min: 3,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end10',
              1: 'end11'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d1: {
        notification: /*#__PURE__*/translate('a large bird nests at the top of the stairs.'),
        combat: true,
        enemy: 'bird',
        chara: 'R',
        damage: 5,
        hit: 0.7,
        attackDelay: 1,
        health: 45,
        loot: {
          meat: {
            min: 5,
            max: 10,
            chance: 0.8
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end1',
              1: 'end2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d2: {
        text: [/*#__PURE__*/translate('the debris is denser here.'), /*#__PURE__*/translate('maybe some useful stuff in the rubble.')],
        loot: {
          bullets: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          steel: {
            min: 1,
            max: 10,
            chance: 0.8
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.01
          },
          cloth: {
            min: 1,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'end2'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d3: {
        notification: /*#__PURE__*/translate('a swarm of rats rushes up the tunnel.'),
        combat: true,
        enemy: 'rats',
        plural: true,
        chara: 'RRR',
        damage: 1,
        hit: 0.8,
        attackDelay: 0.25,
        health: 60,
        loot: {
          fur: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          teeth: {
            min: 5,
            max: 10,
            chance: 0.5
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end2',
              1: 'end3'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d4: {
        notification: /*#__PURE__*/translate('a large man attacks, waving a bayonet.'),
        combat: true,
        enemy: 'veteran',
        chara: 'D',
        damage: 6,
        hit: 0.8,
        attackDelay: 2,
        health: 45,
        loot: {
          bayonet: {
            min: 1,
            max: 1,
            chance: 0.5
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end4',
              1: 'end5'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d5: {
        notification: /*#__PURE__*/translate('a second soldier opens fire.'),
        combat: true,
        enemy: 'soldier',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          rifle: {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'end5'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d6: {
        notification: /*#__PURE__*/translate('a masked soldier rounds the corner, gun drawn'),
        combat: true,
        enemy: 'commando',
        chara: 'D',
        ranged: true,
        damage: 3,
        hit: 0.9,
        attackDelay: 2,
        health: 55,
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 0.5
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end5',
              1: 'end6'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d7: {
        notification: /*#__PURE__*/translate('the crowd surges forward.'),
        combat: true,
        enemy: 'squatters',
        plural: true,
        chara: 'EEE',
        damage: 2,
        hit: 0.7,
        attackDelay: 0.5,
        health: 40,
        loot: {
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end7',
              1: 'end8'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d8: {
        notification: /*#__PURE__*/translate('a youth lashes out with a tree branch.'),
        combat: true,
        enemy: 'youth',
        chara: 'E',
        damage: 2,
        hit: 0.7,
        attackDelay: 1,
        health: 45,
        loot: {
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'end8'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d9: {
        notification: /*#__PURE__*/translate('a squatter stands firmly in the doorway of a small hut.'),
        combat: true,
        enemy: 'squatter',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              0.5: 'end8',
              1: 'end9'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      d10: {
        notification: /*#__PURE__*/translate('behind the door, a deformed figure awakes and attacks.'),
        combat: true,
        enemy: 'deformed',
        chara: 'T',
        damage: 8,
        hit: 0.6,
        attackDelay: 2,
        health: 40,
        loot: {
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          teeth: {
            min: 2,
            max: 2,
            chance: 1
          },
          steel: {
            min: 1,
            max: 3,
            chance: 0.6
          },
          scales: {
            min: 2,
            max: 3,
            chance: 0.1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'end14'
            }
          }
        }
      },
      d11: {
        notification: /*#__PURE__*/translate('as soon as the door is open a little bit, hundreds of tentacles erupt.'),
        combat: true,
        enemy: 'tentacles',
        plural: true,
        chara: 'TTT',
        damage: 2,
        hit: 0.6,
        attackDelay: 0.5,
        health: 60,
        loot: {
          meat: {
            min: 10,
            max: 20,
            chance: 1
          }
        },
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'end13'
            }
          }
        }
      },
      end1: {
        text: [/*#__PURE__*/translate('bird must have liked shiney things.'), /*#__PURE__*/translate('some good stuff woven into its nest.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          bullets: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          bolas: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.5
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end2: {
        text: [/*#__PURE__*/translate('not much here.'), /*#__PURE__*/translate('scavengers must have gotten to this place already.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          torch: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end3: {
        text: [
        /*#__PURE__*/
        /// TRANSLATORS : a platform in the subway
        translate('the tunnel opens up at another platform.'), /*#__PURE__*/translate('the walls are scorched from an old battle.'), /*#__PURE__*/translate('bodies and supplies from both sides litter the ground.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 0.8
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          laser_rifle: {
            min: 1,
            max: 1,
            chance: 0.3
          },
          energy_cell: {
            min: 1,
            max: 5,
            chance: 0.3
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.3
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end4: {
        text: [/*#__PURE__*/translate('the small military outpost is well supplied.'), /*#__PURE__*/translate('arms and munitions, relics from the war, are neatly arranged on the store-room floor.'), /*#__PURE__*/translate('just as deadly now as they were then.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 1
          },
          bullets: {
            min: 1,
            max: 10,
            chance: 1
          },
          grenade: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end5: {
        text: [/*#__PURE__*/translate('searching the bodies yields a few supplies.'), /*#__PURE__*/translate('more soldiers will be on their way.'), /*#__PURE__*/translate('time to move on.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 1
          },
          bullets: {
            min: 1,
            max: 10,
            chance: 1
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          medicine: {
            min: 1,
            max: 4,
            chance: 0.1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end6: {
        text: [/*#__PURE__*/translate('the small settlement has clearly been burning a while.'), /*#__PURE__*/translate('the bodies of the wanderers that lived here are still visible in the flames.'), /*#__PURE__*/translate('still time to rescue a few supplies.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          laser_rifle: {
            min: 1,
            max: 1,
            chance: 0.5
          },
          energy_cell: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          cured_meat: {
            min: 1,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end7: {
        text: [/*#__PURE__*/translate('the remaining settlers flee from the violence, their belongings forgotten.'), /*#__PURE__*/translate("there's not much, but some useful things can still be found.")],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.8
          },
          energy_cell: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          cured_meat: {
            min: 1,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end8: {
        text: [/*#__PURE__*/translate('the young settler was carrying a canvas sack.'), /*#__PURE__*/translate('it contains travelling gear, and a few trinkets.'), /*#__PURE__*/translate("there's nothing else here.")],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.8
          },
          bolas: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          cured_meat: {
            min: 1,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end9: {
        text: [/*#__PURE__*/translate('inside the hut, a child cries.'), /*#__PURE__*/translate('a few belongings rest against the walls.'), /*#__PURE__*/translate("there's nothing else here.")],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 0.8
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          bolas: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end10: {
        text: [/*#__PURE__*/translate('the stench of rot and death fills the operating theatres.'), /*#__PURE__*/translate('a few items are scattered on the ground.'), /*#__PURE__*/translate('there is nothing else here.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          energy_cell: {
            min: 1,
            max: 1,
            chance: 0.3
          },
          medicine: {
            min: 1,
            max: 5,
            chance: 0.3
          },
          teeth: {
            min: 3,
            max: 8,
            chance: 1
          },
          scales: {
            min: 4,
            max: 7,
            chance: 0.9
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end11: {
        text: [/*#__PURE__*/translate('a pristine medicine cabinet at the end of a hallway.'), /*#__PURE__*/translate('the rest of the hospital is empty.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          energy_cell: {
            min: 1,
            max: 1,
            chance: 0.2
          },
          medicine: {
            min: 3,
            max: 10,
            chance: 1
          },
          teeth: {
            min: 1,
            max: 2,
            chance: 0.2
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end12: {
        text: [/*#__PURE__*/translate('someone had been stockpiling loot here.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          energy_cell: {
            min: 1,
            max: 3,
            chance: 0.2
          },
          medicine: {
            min: 3,
            max: 10,
            chance: 0.5
          },
          bullets: {
            min: 2,
            max: 8,
            chance: 1
          },
          torch: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          grenade: {
            min: 1,
            max: 1,
            chance: 0.5
          },
          alien_alloy: {
            min: 1,
            max: 2,
            chance: 0.8
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end13: {
        text: [/*#__PURE__*/translate('the tentacular horror is defeated.'), /*#__PURE__*/translate('inside, the remains of its victims are everywhere.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          steel_sword: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          rifle: {
            min: 1,
            max: 2,
            chance: 0.3
          },
          teeth: {
            min: 2,
            max: 8,
            chance: 1
          },
          cloth: {
            min: 3,
            max: 6,
            chance: 0.5
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end14: {
        text: [
        /*#__PURE__*/
        /// TRANSLATORS : warped means extremely disfigured.
        translate('the warped man lies dead.'), /*#__PURE__*/translate('the operating theatre has a lot of curious equipment.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          energy_cell: {
            min: 2,
            max: 5,
            chance: 0.8
          },
          medicine: {
            min: 3,
            max: 12,
            chance: 1
          },
          cloth: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          steel: {
            min: 2,
            max: 3,
            chance: 0.3
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.3
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      end15: {
        text: [/*#__PURE__*/translate('the old man had a small cache of interesting items.')],
        onLoad: function onLoad(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(engine.actions.game.city.setM({
            cleared: true
          }));
        },
        loot: {
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.8
          },
          medicine: {
            min: 1,
            max: 4,
            chance: 1
          },
          cured_meat: {
            min: 3,
            max: 7,
            chance: 1
          },
          bolas: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          fur: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave city'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      }
    }
  },
  house: {
    /* Abandoned House */
    title: /*#__PURE__*/translate('An Old House'),
    id: 'house',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('an old house remains here, once white siding yellowed and peeling.'), /*#__PURE__*/translate('the door hangs open.')],
        notification: /*#__PURE__*/translate('the remains of an old house stand as a monument to simpler times'),
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('go inside'),
            nextScene: {
              0.25: 'medicine',
              0.5: 'supplies',
              1: 'occupied'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      supplies: {
        text: [/*#__PURE__*/translate('the house is abandoned, but not yet picked over.'), /*#__PURE__*/translate('still a few drops of water in the old well.')],
        onLoad: function onLoad(engine) {
          var state = engine.getState();
          var curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
          engine.spaces.World.setWater(engine.spaces.World.getMaxWater());
          engine.notify(translate('water replenished'));
        },
        loot: {
          cured_meat: {
            min: 1,
            max: 10,
            chance: 0.8
          },
          leather: {
            min: 1,
            max: 10,
            chance: 0.2
          },
          cloth: {
            min: 1,
            max: 10,
            chance: 0.5
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      medicine: {
        text: [/*#__PURE__*/translate('the house has been ransacked.'), /*#__PURE__*/translate('but there is a cache of medicine under the floorboards.')],
        onLoad: function onLoad(engine) {
          var state = engine.getState();
          var curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
        },
        loot: {
          medicine: {
            min: 2,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      occupied: {
        combat: true,
        enemy: 'squatter',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        notification: /*#__PURE__*/translate('a man charges down the hall, a rusty blade in his hand'),
        onLoad: function onLoad(engine) {
          var state = engine.getState();
          var curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
        },
        loot: {
          cured_meat: {
            min: 1,
            max: 10,
            chance: 0.8
          },
          leather: {
            min: 1,
            max: 10,
            chance: 0.2
          },
          cloth: {
            min: 1,
            max: 10,
            chance: 0.5
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      }
    }
  },
  battlefield: {
    /* Discovering an old battlefield */
    title: /*#__PURE__*/translate('A Forgotten Battlefield'),
    id: 'battlefield',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('a battle was fought here, long ago.'), /*#__PURE__*/translate('battered technology from both sides lays dormant on the blasted landscape.')],
        onLoad: function onLoad(engine) {
          var state = engine.getState();
          var curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
        },
        loot: {
          rifle: {
            min: 1,
            max: 3,
            chance: 0.5
          },
          bullets: {
            min: 5,
            max: 20,
            chance: 0.8
          },
          laser_rifle: {
            min: 1,
            max: 3,
            chance: 0.3
          },
          energy_cell: {
            min: 5,
            max: 10,
            chance: 0.5
          },
          grenade: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.3
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },
  borehole: {
    /* Admiring a huge borehole */
    title: /*#__PURE__*/translate('A Huge Borehole'),
    id: 'borehole',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('a huge hole is cut deep into the earth, evidence of the past harvest.'), /*#__PURE__*/translate('they took what they came for, and left.'), /*#__PURE__*/translate('castoff from the mammoth drills can still be found by the edges of the precipice.')],
        onLoad: function onLoad(engine) {
          var state = engine.getState();
          var curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
        },
        loot: {
          alien_alloy: {
            min: 1,
            max: 3,
            chance: 1
          }
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      }
    }
  },
  ship: {
    /* Finding a way off this rock */
    title: /*#__PURE__*/translate('A Crashed Ship'),
    id: 'ship',
    scenes: {
      start: {
        onLoad: /*#__PURE__*/function () {
          var _onLoad = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(engine) {
            var state, curPos;
            return runtime_1.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    state = engine.getState();
                    curPos = state.game.world.curPos;
                    _context.next = 4;
                    return engine.spaces.World.markVisited(curPos[0], curPos[1]);

                  case 4:
                    _context.next = 6;
                    return engine.spaces.World.drawRoad();

                  case 6:
                    _context.next = 8;
                    return engine.dispatch(engine.actions.features.location.enableSpaceShip());

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onLoad(_x) {
            return _onLoad.apply(this, arguments);
          }

          return onLoad;
        }(),
        text: [/*#__PURE__*/translate('the familiar curves of a wanderer vessel rise up out of the dust and ash. '), /*#__PURE__*/translate("lucky that the natives can't work the mechanisms."), /*#__PURE__*/translate('with a little effort, it might fly again.')],
        buttons: {
          leavel: {
            text: /*#__PURE__*/translate('salvage'),
            nextScene: 'end'
          }
        }
      }
    }
  },
  sulphurmine: {
    /* Clearing the Sulphur Mine */
    title: /*#__PURE__*/translate('The Sulphur Mine'),
    id: 'sulphurmine',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate("the military is already set up at the mine's entrance."), /*#__PURE__*/translate('soldiers patrol the perimeter, rifles slung over their shoulders.')],
        notification: /*#__PURE__*/translate('a military perimeter is set up around the mine.'),
        buttons: {
          attack: {
            text: /*#__PURE__*/translate('attack'),
            nextScene: {
              1: 'a1'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      a1: {
        combat: true,
        enemy: 'soldier',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          rifle: {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        notification: /*#__PURE__*/translate('a soldier, alerted, opens fire.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'a2'
            }
          },
          run: {
            text: /*#__PURE__*/translate('run'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      a2: {
        combat: true,
        enemy: 'soldier',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.5
          },
          rifle: {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        notification: /*#__PURE__*/translate('a second soldier joins the fight.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'a3'
            }
          },
          run: {
            text: /*#__PURE__*/translate('run'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      a3: {
        combat: true,
        enemy: 'veteran',
        chara: 'D',
        damage: 10,
        hit: 0.8,
        attackDelay: 2,
        health: 65,
        loot: {
          bayonet: {
            min: 1,
            max: 1,
            chance: 0.5
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        notification: /*#__PURE__*/translate('a grizzled soldier attacks, waving a bayonet.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'cleared'
            }
          }
        }
      },
      cleared: {
        text: [/*#__PURE__*/translate('the military presence has been cleared.'), /*#__PURE__*/translate('the mine is now safe for workers.')],
        notification: /*#__PURE__*/translate('the sulphur mine is clear of dangers'),
        onLoad: /*#__PURE__*/function () {
          var _onLoad2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(engine) {
            var state, curPos;
            return runtime_1.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    state = engine.getState();
                    curPos = state.game.world.curPos;
                    _context2.next = 4;
                    return engine.spaces.World.drawRoad();

                  case 4:
                    _context2.next = 6;
                    return engine.dispatch(engine.actions.game.world.setM({
                      sulphurmine: true
                    }));

                  case 6:
                    _context2.next = 8;
                    return engine.spaces.World.markVisited(curPos[0], curPos[1]);

                  case 8:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function onLoad(_x2) {
            return _onLoad2.apply(this, arguments);
          }

          return onLoad;
        }(),
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },
  coalmine: {
    /* Clearing the Coal Mine */
    title: /*#__PURE__*/translate('The Coal Mine'),
    id: 'coalmine',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('camp fires burn by the entrance to the mine.'), /*#__PURE__*/translate('men mill about, weapons at the ready.')],
        notification: /*#__PURE__*/translate('this old mine is not abandoned'),
        buttons: {
          attack: {
            text: /*#__PURE__*/translate('attack'),
            nextScene: {
              1: 'a1'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      a1: {
        combat: true,
        enemy: 'man',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        notification: /*#__PURE__*/translate('a man joins the fight'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'a2'
            }
          },
          run: {
            text: /*#__PURE__*/translate('run'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      a2: {
        combat: true,
        enemy: 'man',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        notification: /*#__PURE__*/translate('a man joins the fight'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'a3'
            }
          },
          run: {
            text: /*#__PURE__*/translate('run'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      a3: {
        combat: true,
        enemy: 'chief',
        chara: 'D',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1
          },
          cloth: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          iron: {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        notification: /*#__PURE__*/translate('only the chief remains.'),
        buttons: {
          "continue": {
            text: /*#__PURE__*/translate('continue'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'cleared'
            }
          }
        }
      },
      cleared: {
        text: [/*#__PURE__*/translate('the camp is still, save for the crackling of the fires.'), /*#__PURE__*/translate('the mine is now safe for workers.')],
        notification: /*#__PURE__*/translate('the coal mine is clear of dangers'),
        onLoad: /*#__PURE__*/function () {
          var _onLoad3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(engine) {
            var state, curPos;
            return runtime_1.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    state = engine.getState();
                    curPos = state.game.world.curPos;
                    _context3.next = 4;
                    return engine.spaces.World.drawRoad();

                  case 4:
                    _context3.next = 6;
                    return engine.dispatch(engine.actions.game.world.setM({
                      coalmine: true
                    }));

                  case 6:
                    _context3.next = 8;
                    return engine.spaces.World.markVisited(curPos[0], curPos[1]);

                  case 8:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function onLoad(_x3) {
            return _onLoad3.apply(this, arguments);
          }

          return onLoad;
        }(),
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },
  ironmine: {
    /* Clearing the Iron Mine */
    title: /*#__PURE__*/translate('The Iron Mine'),
    id: 'ironmine',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('an old iron mine sits here, tools abandoned and left to rust.'), /*#__PURE__*/translate('bleached bones are strewn about the entrance. many, deeply scored with jagged grooves.'), /*#__PURE__*/translate('feral howls echo out of the darkness.')],
        notification: /*#__PURE__*/translate('the path leads to an abandoned mine'),
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('go inside'),
            nextScene: {
              1: 'enter'
            },
            cost: {
              torch: 1
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      enter: {
        combat: true,
        enemy: 'beastly matriarch',
        chara: 'T',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          teeth: {
            min: 5,
            max: 10,
            chance: 1
          },
          scales: {
            min: 5,
            max: 10,
            chance: 0.8
          },
          cloth: {
            min: 5,
            max: 10,
            chance: 0.5
          }
        },
        notification: /*#__PURE__*/translate('a large creature lunges, muscles rippling in the torchlight'),
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            cooldown: config$1.Event.LEAVE_COOLDOWN,
            nextScene: {
              1: 'cleared'
            }
          }
        }
      },
      cleared: {
        text: [/*#__PURE__*/translate('the beast is dead.'), /*#__PURE__*/translate('the mine is now safe for workers.')],
        notification: /*#__PURE__*/translate('the iron mine is clear of dangers'),
        onLoad: /*#__PURE__*/function () {
          var _onLoad4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(engine) {
            var state, curPos;
            return runtime_1.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    state = engine.getState();
                    curPos = state.game.world.curPos;
                    _context4.next = 4;
                    return engine.spaces.World.drawRoad();

                  case 4:
                    _context4.next = 6;
                    return engine.dispatch(engine.actions.game.world.setM({
                      ironmine: true
                    }));

                  case 6:
                    _context4.next = 8;
                    return engine.spaces.World.markVisited(curPos[0], curPos[1]);

                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          function onLoad(_x4) {
            return _onLoad4.apply(this, arguments);
          }

          return onLoad;
        }(),
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },
  cache: {
    /* Cache - contains some of supplies from previous game */
    title: /*#__PURE__*/translate('A Destroyed Village'),
    id: 'cache',
    scenes: {
      start: {
        text: [/*#__PURE__*/translate('a destroyed village lies in the dust.'), /*#__PURE__*/translate('charred bodies litter the ground.')],
        /// TRANSLATORS : tang = strong metallic smell, wanderer afterburner = ship's engines
        notification: /*#__PURE__*/translate('the metallic tang of wanderer afterburner hangs in the air.'),
        buttons: {
          enter: {
            text: /*#__PURE__*/translate('enter'),
            nextScene: {
              1: 'underground'
            }
          },
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      },
      underground: {
        text: [/*#__PURE__*/translate('a shack stands at the center of the village.'), /*#__PURE__*/translate('there are still supplies inside.')],
        buttons: {
          take: {
            text: /*#__PURE__*/translate('take'),
            nextScene: {
              1: 'exit'
            }
          }
        }
      },
      exit: {
        text: [/*#__PURE__*/translate('all the work of a previous generation is here.'), /*#__PURE__*/translate('ripe for the picking.')],
        onLoad: function onLoad(engine) {
          var state = engine.getState();
          var curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
          engine.prestige.collectStores();
        },
        buttons: {
          leave: {
            text: /*#__PURE__*/translate('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  }
};

var events$6 = [{
  title: /*#__PURE__*/translate('A Snarling Beast'),
  isAvailable: function isAvailable(_, engine) {
    return engine.spaces.World.getDistance() <= 10 && engine.spaces.World.getTerrain() === config$1.World.TILE.FOREST;
  },
  scenes: {
    start: {
      combat: true,
      enemy: 'snarling beast',
      enemyName: /*#__PURE__*/translate('snarling beast'),
      deathMessage: /*#__PURE__*/translate('the snarling beast is dead'),
      chara: 'R',
      damage: 1,
      hit: 0.8,
      attackDelay: 1,
      health: 5,
      loot: {
        fur: {
          min: 1,
          max: 3,
          chance: 1
        },
        meat: {
          min: 1,
          max: 3,
          chance: 1
        },
        teeth: {
          min: 1,
          max: 3,
          chance: 0.8
        }
      },
      notification: /*#__PURE__*/translate('a snarling beast leaps out of the underbrush')
    }
  }
}, {
  title: /*#__PURE__*/translate('A Gaunt Man'),
  isAvailable: function isAvailable(_, engine) {
    return engine.spaces.World.getDistance() <= 10 && engine.spaces.World.getTerrain() === config$1.World.TILE.BARRENS;
  },
  scenes: {
    start: {
      combat: true,
      enemy: 'gaunt man',
      enemyName: /*#__PURE__*/translate('gaunt man'),
      deathMessage: /*#__PURE__*/translate('the gaunt man is dead'),
      chara: 'E',
      damage: 2,
      hit: 0.8,
      attackDelay: 2,
      health: 6,
      loot: {
        cloth: {
          min: 1,
          max: 3,
          chance: 0.8
        },
        teeth: {
          min: 1,
          max: 2,
          chance: 0.8
        },
        leather: {
          min: 1,
          max: 2,
          chance: 0.5
        }
      },
      notification: /*#__PURE__*/translate('a gaunt man approaches, a crazed look in his eye')
    }
  }
}, {
  title: /*#__PURE__*/translate('A Strange Bird'),
  isAvailable: function isAvailable(_, engine) {
    return engine.spaces.World.getDistance() <= 10 && engine.spaces.World.getTerrain() === config$1.World.TILE.FIELD;
  },
  scenes: {
    start: {
      combat: true,
      enemy: 'strange bird',
      enemyName: /*#__PURE__*/translate('strange bird'),
      deathMessage: /*#__PURE__*/translate('the strange bird is dead'),
      chara: 'R',
      damage: 3,
      hit: 0.8,
      attackDelay: 2,
      health: 4,
      loot: {
        scales: {
          min: 1,
          max: 3,
          chance: 0.8
        },
        teeth: {
          min: 1,
          max: 2,
          chance: 0.5
        },
        meat: {
          min: 1,
          max: 3,
          chance: 0.8
        }
      },
      notification: /*#__PURE__*/translate('a strange looking bird speeds across the plains')
    }
  }
}, {
  title: /*#__PURE__*/translate('A Shivering Man'),
  isAvailable: function isAvailable(_, engine) {
    var distance = engine.spaces.World.getDistance();
    return distance > 10 && distance <= 20 && engine.spaces.World.getTerrain() === config$1.World.TILE.BARRENS;
  },
  scenes: {
    start: {
      combat: true,
      enemy: 'shivering man',
      enemyName: /*#__PURE__*/translate('shivering man'),
      deathMessage: /*#__PURE__*/translate('the shivering man is dead'),
      chara: 'E',
      damage: 5,
      hit: 0.5,
      attackDelay: 1,
      health: 20,
      loot: {
        cloth: {
          min: 1,
          max: 1,
          chance: 0.2
        },
        teeth: {
          min: 1,
          max: 2,
          chance: 0.8
        },
        leather: {
          min: 1,
          max: 1,
          chance: 0.2
        },
        medicine: {
          min: 1,
          max: 3,
          chance: 0.7
        }
      },
      notification: /*#__PURE__*/translate('a shivering man approaches and attacks with surprising strength')
    }
  }
}, {
  title: /*#__PURE__*/translate('A Man-Eater'),
  isAvailable: function isAvailable(_, engine) {
    var distance = engine.spaces.World.getDistance();
    return distance > 10 && distance <= 20 && engine.spaces.World.getTerrain() === config$1.World.TILE.FOREST;
  },
  scenes: {
    'start': {
      combat: true,
      enemy: 'man-eater',
      enemyName: /*#__PURE__*/translate('man-eater'),
      deathMessage: /*#__PURE__*/translate('the man-eater is dead'),
      chara: 'T',
      damage: 3,
      hit: 0.8,
      attackDelay: 1,
      health: 25,
      loot: {
        'fur': {
          min: 5,
          max: 10,
          chance: 1
        },
        'meat': {
          min: 5,
          max: 10,
          chance: 1
        },
        'teeth': {
          min: 5,
          max: 10,
          chance: 0.8
        }
      },
      notification: /*#__PURE__*/translate('a large creature attacks, claws freshly bloodied')
    }
  }
}, {
  title: /*#__PURE__*/translate('A Scavenger'),
  isAvailable: function isAvailable(_, engine) {
    var distance = engine.spaces.World.getDistance();
    return distance > 10 && distance <= 20 && engine.spaces.World.getTerrain() === config$1.World.TILE.BARRENS;
  },
  scenes: {
    start: {
      combat: true,
      enemy: 'scavenger',
      enemyName: /*#__PURE__*/translate('scavenger'),
      deathMessage: /*#__PURE__*/translate('the scavenger is dead'),
      chara: 'E',
      damage: 4,
      hit: 0.8,
      attackDelay: 2,
      health: 30,
      loot: {
        cloth: {
          min: 5,
          max: 10,
          chance: 0.8
        },
        leather: {
          min: 5,
          max: 10,
          chance: 0.8
        },
        iron: {
          min: 1,
          max: 5,
          chance: 0.5
        },
        medicine: {
          min: 1,
          max: 2,
          chance: 0.1
        }
      },
      notification: /*#__PURE__*/translate('a scavenger draws close, hoping for an easy score')
    }
  }
}, {
  title: /*#__PURE__*/translate('A Huge Lizard'),
  isAvailable: function isAvailable(_, engine) {
    var distance = engine.spaces.World.getDistance();
    return distance > 10 && distance <= 20 && engine.spaces.World.getTerrain() === config$1.World.TILE.FIELD;
  },
  scenes: {
    start: {
      combat: true,
      enemy: 'lizard',
      enemyName: /*#__PURE__*/translate('lizard'),
      deathMessage: /*#__PURE__*/translate('the lizard is dead'),
      chara: 'T',
      damage: 5,
      hit: 0.8,
      attackDelay: 2,
      health: 20,
      loot: {
        scales: {
          min: 5,
          max: 10,
          chance: 0.8
        },
        teeth: {
          min: 5,
          max: 10,
          chance: 0.5
        },
        meat: {
          min: 5,
          max: 10,
          chance: 0.8
        }
      },
      notification: /*#__PURE__*/translate('the grass thrashes wildly as a huge lizard pushes through')
    }
  }
}, {
  title: /*#__PURE__*/translate('A Feral Terror'),
  isAvailable: function isAvailable(_, engine) {
    var distance = engine.spaces.World.getDistance();
    return distance > 20 && engine.spaces.World.getTerrain() === config$1.World.TILE.FOREST;
  },
  scenes: {
    start: {
      combat: true,
      enemy: 'feral terror',
      enemyName: /*#__PURE__*/translate('feral terror'),
      deathMessage: /*#__PURE__*/translate('the feral terror is dead'),
      chara: 'T',
      damage: 6,
      hit: 0.8,
      attackDelay: 1,
      health: 45,
      loot: {
        fur: {
          min: 5,
          max: 10,
          chance: 1
        },
        meat: {
          min: 5,
          max: 10,
          chance: 1
        },
        teeth: {
          min: 5,
          max: 10,
          chance: 0.8
        }
      },
      notification: /*#__PURE__*/translate('a beast, wilder than imagining, erupts out of the foliage')
    }
  }
}, {
  title: /*#__PURE__*/translate('A Soldier'),
  isAvailable: function isAvailable(_, engine) {
    var distance = engine.spaces.World.getDistance();
    return distance > 20 && engine.spaces.World.getTerrain() === config$1.World.TILE.BARRENS;
  },
  scenes: {
    start: {
      combat: true,
      enemy: 'soldier',
      enemyName: /*#__PURE__*/translate('soldier'),
      deathMessage: /*#__PURE__*/translate('the soldier is dead'),
      ranged: true,
      chara: 'D',
      damage: 8,
      hit: 0.8,
      attackDelay: 2,
      health: 50,
      loot: {
        cloth: {
          min: 5,
          max: 10,
          chance: 0.8
        },
        bullets: {
          min: 1,
          max: 5,
          chance: 0.5
        },
        rifle: {
          min: 1,
          max: 1,
          chance: 0.2
        },
        medicine: {
          min: 1,
          max: 2,
          chance: 0.1
        }
      },
      notification: /*#__PURE__*/translate('a soldier opens fire from across the desert')
    }
  }
}, {
  title: /*#__PURE__*/translate('A Sniper'),
  isAvailable: function isAvailable(_, engine) {
    var distance = engine.spaces.World.getDistance();
    return distance > 20 && engine.spaces.World.getTerrain() === config$1.World.TILE.FIELD;
  },
  scenes: {
    start: {
      combat: true,
      enemy: 'sniper',
      enemyName: /*#__PURE__*/translate('sniper'),
      deathMessage: /*#__PURE__*/translate('the sniper is dead'),
      chara: 'D',
      damage: 15,
      hit: 0.8,
      attackDelay: 4,
      health: 30,
      ranged: true,
      loot: {
        cloth: {
          min: 5,
          max: 10,
          chance: 0.8
        },
        bullets: {
          min: 1,
          max: 5,
          chance: 0.5
        },
        rifle: {
          min: 1,
          max: 1,
          chance: 0.2
        },
        medicine: {
          min: 1,
          max: 2,
          chance: 0.1
        }
      },
      notification: /*#__PURE__*/translate('a shot rings out, from somewhere in the long grass')
    }
  }
}];

var GameModule = /*#__PURE__*/function () {
  function GameModule(engine) {
    this.engine = engine;
  }

  var _proto = GameModule.prototype;

  _proto.onArrival = function onArrival() {};

  _proto.clean = function clean() {};

  return GameModule;
}();

var OperationExecutor = /*#__PURE__*/function () {
  function OperationExecutor(engine, manager) {
    this.engine = engine;
    this.manager = manager;
    this.listeners = {};
  }

  var _proto = OperationExecutor.prototype;

  _proto.clearCooldown = /*#__PURE__*/function () {
    var _clearCooldown = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(id) {
      var opt;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              opt = this.manager.findById(id);

              if (!opt) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return this.engine.dispatch(this.engine.actions.operation.clearCooldown(opt.id));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function clearCooldown(_x) {
      return _clearCooldown.apply(this, arguments);
    }

    return clearCooldown;
  }();

  _proto.cooldown = /*#__PURE__*/function () {
    var _cooldown = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(id) {
      var opt;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              opt = this.manager.findById(id);

              if (!opt) {
                _context2.next = 4;
                break;
              }

              _context2.next = 4;
              return this.engine.dispatch(this.engine.actions.operation.record(opt));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function cooldown(_x2) {
      return _cooldown.apply(this, arguments);
    }

    return cooldown;
  }();

  _proto.availableOperations = function availableOperations() {
    var _this = this;

    var rtn = [];
    var state = this.engine.getState();
    this.manager.operations.forEach(function (opt) {
      if (!opt.isAvailable || opt.isAvailable(_this.engine, opt)) {
        var item = {
          name: opt.name,
          id: opt.id
        };

        if (opt.desc) {
          item.desc = opt.desc;
        }

        if (opt.help) {
          item.help = opt.help(_this.engine, opt);
        }

        item.history = state.operation[opt.id];
        item.cooldown = opt.cooldown ? opt.cooldown(_this.engine, opt) : 0;
        item.meta = opt.meta;
        rtn.push(item);
      }
    });
    return rtn;
  };

  _proto.on = function on(operationId, callback) {
    if (!this.listeners[operationId]) {
      this.listeners[operationId] = [];
    }

    this.listeners[operationId].push(callback);
  };

  _proto.off = function off(operationId, callback) {
    if (this.listeners[operationId]) {
      var index = this.listeners[operationId].indexOf(callback);

      if (index > -1) {
        this.listeners[operationId].splice(index, 1);
      }
    }
  };

  _proto.emit = function emit(operationId, resp) {
    var listeners = this.listeners[operationId] || [];
    listeners.forEach(function (callback) {
      callback(resp);
    });
  };

  _proto.exec = /*#__PURE__*/function () {
    var _exec = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(id) {
      var opt,
          state,
          optHistory,
          _len,
          args,
          _key,
          resp,
          _args3 = arguments;

      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              opt = this.manager.findById(id);
              state = this.engine.getState();

              if (!opt) {
                _context3.next = 19;
                break;
              }

              optHistory = state.operation[id];

              if (!(optHistory && opt.cooldown)) {
                _context3.next = 7;
                break;
              }

              if (!(Date.now() <= optHistory.cooldownAt)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return");

            case 7:
              if (!(opt.isAvailable && !opt.isAvailable(this.engine, opt))) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return");

            case 9:
              _context3.next = 11;
              return this.engine.dispatch(this.engine.actions.operation.record(opt));

            case 11:
              for (_len = _args3.length, args = /*#__PURE__*/new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = _args3[_key];
              }

              log("operation " + id + " start", args);
              _context3.next = 15;
              return opt.exec.apply(opt, [this.engine, opt].concat(args));

            case 15:
              resp = _context3.sent;
              this.emit(id, resp);
              log("operation " + id + " finish", resp);
              return _context3.abrupt("return", resp);

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function exec(_x3) {
      return _exec.apply(this, arguments);
    }

    return exec;
  }();

  return OperationExecutor;
}();

var OperationManager = /*#__PURE__*/function () {
  function OperationManager() {
    this.operations = [];
  }

  var _proto2 = OperationManager.prototype;

  _proto2.findById = function findById(id) {
    return this.operations.find(function (opt) {
      return opt.id === id;
    });
  };

  _proto2.add = function add(operation) {
    var exist = this.findById(operation.id);

    if (exist) {
      return exist;
    }

    this.operations.push(operation);
    return operation;
  };

  return OperationManager;
}();

var operationManager = /*#__PURE__*/new OperationManager();

var _cost, _cost2, _cost3, _cost4;
operationManager.add({
  id: 'Combat.takeLoot',
  name: translate('take'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !_.isEmpty(state.events.loot) && state.events.won && state.engine.activeSpace === GameSpace.World;
  },
  meta: {
    space: GameSpace.World
  },
  help: function help(engine) {
    var state = engine.getState();
    var loots = [];
    Object.keys(state.events.loot).forEach(function (name) {
      if (state.events.loot[name] > 0) {
        loots.push(name);
      }
    });
    return {
      desc: "take " + loots.join(', '),
      parms: [loots]
    };
  },
  exec: function () {
    var _exec = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(engine, _, name) {
      var state, lootNumLeft, Path, lootweight, freeSpace, _engine$actions$event, _engine$actions$game$;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = engine.getState();
              lootNumLeft = state.events.loot[name];
              Path = engine.spaces.Path;

              if (!(lootNumLeft > 0)) {
                _context.next = 12;
                break;
              }

              lootweight = Path.getWeight(name);
              freeSpace = engine.spaces.World.getFreeSpace();

              if (!(lootweight <= freeSpace)) {
                _context.next = 11;
                break;
              }

              _context.next = 9;
              return engine.dispatch(engine.actions.events.addM((_engine$actions$event = {}, _engine$actions$event["loot." + name] = -1, _engine$actions$event)));

            case 9:
              _context.next = 11;
              return engine.dispatch(engine.actions.game.world.addM((_engine$actions$game$ = {}, _engine$actions$game$["outfit." + name] = 1, _engine$actions$game$)));

            case 11:
              return _context.abrupt("return", true);

            case 12:
              return _context.abrupt("return", false);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function exec(_x, _x2, _x3) {
      return _exec.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Combat.takeAllLoot',
  name: translate('take all'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !_.isEmpty(state.events.loot) && state.events.won && state.engine.activeSpace === GameSpace.World;
  },
  meta: {
    space: GameSpace.World
  },
  help: function help(engine) {
    var state = engine.getState();
    var loots = [];
    Object.keys(state.events.loot).forEach(function (name) {
      if (state.events.loot[name] > 0) {
        loots.push(name);
      }
    });
    return {
      desc: "take all " + loots.join(', '),
      parms: [loots]
    };
  },
  exec: function () {
    var _exec2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(engine, _, name) {
      var state, lootNumLeft, i, taken;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = engine.getState();
              lootNumLeft = state.events.loot[name];
              i = 0;

            case 3:
              if (!(i < lootNumLeft)) {
                _context2.next = 12;
                break;
              }

              _context2.next = 6;
              return engine.operationExecutor.exec('Combat.takeLoot', name);

            case 6:
              taken = _context2.sent;

              if (taken) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("break", 12);

            case 9:
              i++;
              _context2.next = 3;
              break;

            case 12:
              return _context2.abrupt("return", [i === lootNumLeft, i]);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function exec(_x4, _x5, _x6) {
      return _exec2.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Combat.takeEverything',
  name: translate('take everything'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !_.isEmpty(state.events.loot) && state.events.won && state.engine.activeSpace === GameSpace.World;
  },
  meta: {
    space: GameSpace.World
  },
  exec: function () {
    var _exec3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(engine) {
      var state, loots, taken, success, name, res;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = engine.getState();
              loots = state.events.loot;
              taken = {};
              success = true;
              _context3.t0 = runtime_1.keys(loots);

            case 5:
              if ((_context3.t1 = _context3.t0()).done) {
                _context3.next = 16;
                break;
              }

              name = _context3.t1.value;
              _context3.next = 9;
              return engine.operationExecutor.exec('Combat.takeAllLoot', name);

            case 9:
              res = _context3.sent;
              taken[name] = res[1];

              if (res[0]) {
                _context3.next = 14;
                break;
              }

              success = false;
              return _context3.abrupt("break", 16);

            case 14:
              _context3.next = 5;
              break;

            case 16:
              return _context3.abrupt("return", [success, taken]);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function exec(_x7) {
      return _exec3.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Combat.dropStuff',
  name: translate('drop stuff'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !_.isEmpty(state.game.world.outfit) && state.events.won && state.engine.activeSpace === GameSpace.World;
  },
  meta: {
    space: GameSpace.World
  },
  help: function help(engine) {
    var state = engine.getState();
    var loots = [];
    Object.keys(state.game.world.outfit).forEach(function (name) {
      if (state.events.loot[name] > 0) {
        loots.push(name);
      }
    });
    return {
      desc: "drop " + loots.join(', '),
      parms: [loots]
    };
  },
  exec: function () {
    var _exec4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(engine, _, name) {
      var num, state, stuffNum, dropNum, _engine$actions$event2, _engine$actions$game$2;

      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              num = 1;
              state = engine.getState();
              stuffNum = state.game.world.outfit[name];
              dropNum = Math.min(stuffNum, num);

              if (!(dropNum > 0)) {
                _context4.next = 9;
                break;
              }

              _context4.next = 7;
              return engine.dispatch(engine.actions.events.addM((_engine$actions$event2 = {}, _engine$actions$event2["loot." + name] = dropNum, _engine$actions$event2)));

            case 7:
              _context4.next = 9;
              return engine.dispatch(engine.actions.game.world.addM((_engine$actions$game$2 = {}, _engine$actions$game$2["outfit." + name] = -dropNum, _engine$actions$game$2)));

            case 9:
              return _context4.abrupt("return", dropNum);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function exec(_x8, _x9, _x10) {
      return _exec4.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Combat.eatMeatInFight',
  name: translate('eat meat'),
  cooldown: function cooldown() {
    return config$1.Event.EAT_COOLDOWN;
  },
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.events.enemys.length > 0 && !state.events.won && state.engine.activeSpace === GameSpace.World;
  },
  meta: {
    space: GameSpace.World,
    cost: (_cost = {}, _cost[StoreCategory.cured_meat] = 1, _cost)
  },
  exec: function () {
    var _exec5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(engine) {
      var res;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return engine.events.doHeal(StoreCategory.cured_meat, engine.spaces.World.meatHeal());

            case 2:
              res = _context5.sent;

              if (!res) {
                engine.operationExecutor.clearCooldown('Combat.eatMeatInFight');
              }

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function exec(_x11) {
      return _exec5.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Combat.eatMeat',
  name: translate('eat meat'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.events.won && state.engine.activeSpace === GameSpace.World;
  },
  meta: {
    space: GameSpace.World,
    cost: (_cost2 = {}, _cost2[StoreCategory.cured_meat] = 1, _cost2)
  },
  exec: function () {
    var _exec6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(engine) {
      var res;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return engine.events.doHeal(StoreCategory.cured_meat, engine.spaces.World.meatHeal());

            case 2:
              res = _context6.sent;

              if (!res) {
                engine.operationExecutor.clearCooldown('Combat.eatMeat');
              }

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function exec(_x12) {
      return _exec6.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Combat.useMedsInFight',
  name: translate('use meds'),
  cooldown: function cooldown() {
    return config$1.Event.MEDS_COOLDOWN;
  },
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.events.enemys.length > 0 && !state.events.won && state.engine.activeSpace === GameSpace.World;
  },
  meta: {
    space: GameSpace.World,
    cost: (_cost3 = {}, _cost3[StoreCategory.medicine] = 1, _cost3)
  },
  exec: function () {
    var _exec7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(engine) {
      var res;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return engine.events.doHeal(StoreCategory.medicine, engine.spaces.World.medsHeal());

            case 2:
              res = _context7.sent;

              if (!res) {
                engine.operationExecutor.clearCooldown('Combat.useMedsInFight');
              }

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function exec(_x13) {
      return _exec7.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Combat.useMeds',
  name: translate('use meds'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.events.won && state.engine.activeSpace === GameSpace.World;
  },
  meta: {
    space: GameSpace.World,
    cost: (_cost4 = {}, _cost4[StoreCategory.cured_meat] = 1, _cost4)
  },
  exec: function () {
    var _exec8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(engine) {
      var res;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return engine.events.doHeal(StoreCategory.medicine, engine.spaces.World.medsHeal());

            case 2:
              res = _context8.sent;

              if (!res) {
                engine.operationExecutor.clearCooldown('Combat.useMeds');
              }

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function exec(_x14) {
      return _exec8.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Combat.leave',
  name: translate('leave'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.events.won && state.engine.activeSpace === GameSpace.World;
  },
  meta: {
    space: GameSpace.World
  },
  exec: function () {
    var _exec9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(engine) {
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              engine.events.endEvent();

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    function exec(_x15) {
      return _exec9.apply(this, arguments);
    }

    return exec;
  }()
});
Object.keys(WeaponCategory).forEach(function (name) {
  var _item$trade;

  var item = config$1.items[name];
  operationManager.add({
    id: "Combat.useWeapon." + name,
    name: translate(name),
    cooldown: function cooldown(engine, operation) {
      var cd = operation.meta.weapon.cooldown;
      var state = engine.getState();

      if (state.character.perks.unarmed_master) {
        cd /= 2;
      }

      return cd;
    },
    isAvailable: function isAvailable(engine, operation) {
      var state = engine.getState();
      var numWeapons = 0;

      for (var k in WeaponCategory) {
        var weapon = config$1.items[k].weapon;

        if (!!state.game.world.outfit[k]) {
          if (typeof (weapon == null ? void 0 : weapon.damage) !== 'number' || weapon.damage === 0) {
            // Weapons that deal no damage don't count
            numWeapons--;
          } else if (weapon.cost) {
            for (var c in weapon.cost) {
              var num = weapon.cost[c];

              if (state.game.world.outfit[c] < num) {
                // Can't use this weapon, so don't count it
                numWeapons--;
              }
            }
          }

          numWeapons++;
        }
      }

      var name = operation.meta.name;

      if (numWeapons === 0 && name === 'fists') {
        return state.events.enemys.length > 0 && !state.events.won && state.engine.activeSpace === GameSpace.World;
      } else {
        var outfitNum = state.path.outfit[name];
        return !!outfitNum && state.events.enemys.length > 0 && !state.events.won && state.engine.activeSpace === GameSpace.World;
      }
    },
    meta: {
      space: GameSpace.World,
      cost: (_item$trade = item.trade) == null ? void 0 : _item$trade.cost,
      weapon: item.weapon,
      name: name
    },
    exec: function () {
      var _exec10 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(engine, operation) {
        var name, event, state, item, weapon, punches, outfit, k, dmg, newState;
        return runtime_1.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                name = operation.meta.name;
                event = engine.events.getActiveEvent();
                state = engine.getState();

                if (!(!event || state.game.world.stunned && state.game.world.stunned >= Date.now())) {
                  _context10.next = 6;
                  break;
                }

                engine.operationExecutor.clearCooldown("Combat.useWeapon." + name);
                return _context10.abrupt("return");

              case 6:
                item = config$1.items[name];
                weapon = item.weapon;

                if (weapon.type === 'unarmed') {
                  punches = (state.character.statistics.punches || 0) + 1;
                  engine.dispatch(engine.actions.character.statistics.setM({
                    punches: punches
                  }));

                  if (punches === 50 && !state.character.perks.boxer) {
                    engine.dispatch(engine.actions.character.perks.addPerk(PerkCategory.boxer));
                  } else if (punches === 150 && !state.character.perks.martial_artist) {
                    engine.dispatch(engine.actions.character.perks.addPerk(PerkCategory.martial_artist));
                  } else if (punches === 300 && !state.character.perks.unarmed_master) {
                    engine.dispatch(engine.actions.character.perks.addPerk(PerkCategory.unarmed_master));
                  }
                }

                if (!(weapon != null && weapon.cost)) {
                  _context10.next = 21;
                  break;
                }

                outfit = _extends({}, state.game.world.outfit);
                _context10.t0 = runtime_1.keys(weapon.cost);

              case 12:
                if ((_context10.t1 = _context10.t0()).done) {
                  _context10.next = 20;
                  break;
                }

                k = _context10.t1.value;

                if (!(outfit[k] < weapon.cost[k])) {
                  _context10.next = 17;
                  break;
                }

                engine.operationExecutor.clearCooldown("Combat.useWeapon." + name);
                return _context10.abrupt("return");

              case 17:
                outfit[k] = outfit[k] - weapon.cost[k];
                _context10.next = 12;
                break;

              case 20:
                engine.dispatch(engine.actions.game.world.setM({
                  outfit: outfit
                }));

              case 21:
                dmg = -1;

                if (Math.random() <= engine.events.getHitChance()) {
                  dmg = weapon == null ? void 0 : weapon.damage;

                  if (typeof dmg === 'number') {
                    if ((weapon == null ? void 0 : weapon.type) === 'unarmed' && state.character.perks.boxer) {
                      dmg *= 2;
                    }

                    if ((weapon == null ? void 0 : weapon.type) === 'unarmed' && state.character.perks.martial_artist) {
                      dmg *= 3;
                    }

                    if ((weapon == null ? void 0 : weapon.type) === 'unarmed' && state.character.perks.unarmed_master) {
                      dmg *= 2;
                    }

                    if ((weapon == null ? void 0 : weapon.type) === 'melee' && state.character.perks.barbarian) {
                      dmg = Math.floor(dmg * 1.5);
                    }
                  }
                }

                _context10.next = 25;
                return engine.events.damageEnemy(dmg, weapon);

              case 25:
                newState = engine.getState();

                if (newState.events.enemys[0].health <= 0 && !state.events.won) {
                  engine.events.winFight();
                }

              case 27:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function exec(_x16, _x17) {
        return _exec10.apply(this, arguments);
      }

      return exec;
    }()
  });
});

operationManager.add({
  id: 'Events.choice',
  name: translate('choice'),
  isAvailable: function isAvailable(engine) {
    var scene = engine.events.getActiveScene();
    return scene && scene.buttons;
  },
  help: function help(engine) {
    var scene = engine.events.getActiveScene();
    var choice = [];
    Object.keys((scene == null ? void 0 : scene.buttons) || {}).forEach(function (btn) {
      choice.push(btn);
    });
    return {
      desc: "choice " + choice.join(', '),
      parms: [choice]
    };
  },
  exec: function () {
    var _exec = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(engine, _, name) {
      var event, state, button, costMod, store, storeKey, num, nextScene, r, lowestMatch, i, sceneRate;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event = engine.events.getActiveEvent();

              if (event) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              state = engine.getState();
              button = event.scenes[state.events.activeScene].buttons[name];
              costMod = {};

              if (!button.cost) {
                _context.next = 25;
                break;
              }

              _context.t0 = runtime_1.keys(button.cost);

            case 8:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 18;
                break;
              }

              store = _context.t1.value;
              storeKey = store;
              num = state.engine.activeSpace === GameSpace.World ? state.path.outfit[storeKey] || 0 : state.stores[storeKey] || 0;

              if (!(num < (button.cost[storeKey] || 0))) {
                _context.next = 15;
                break;
              }

              engine.notify("not enough " + storeKey);
              return _context.abrupt("return", false);

            case 15:
              costMod[storeKey] = -(button.cost[storeKey] || 0);
              _context.next = 8;
              break;

            case 18:
              if (!(state.engine.activeSpace === GameSpace.World)) {
                _context.next = 23;
                break;
              }

              _context.next = 21;
              return engine.dispatch(engine.actions.path.outfit.addM(costMod));

            case 21:
              _context.next = 25;
              break;

            case 23:
              _context.next = 25;
              return engine.dispatch(engine.actions.stores.addM(costMod));

            case 25:
              if (typeof button.onChoose === 'function') {
                button.onChoose(engine);
              }

              if (!button.reward) {
                _context.next = 29;
                break;
              }

              _context.next = 29;
              return engine.dispatch(engine.actions.stores.addM(button.reward));

            case 29:
              if (button.notification) {
                engine.notify(button.notification);
              }

              if (!button.nextScene) {
                _context.next = 47;
                break;
              }

              nextScene = button.nextScene;

              if (!(nextScene === 'end')) {
                _context.next = 36;
                break;
              }

              engine.events.endEvent();
              _context.next = 47;
              break;

            case 36:
              if (!(typeof nextScene === 'string')) {
                _context.next = 40;
                break;
              }

              engine.events.loadScene(nextScene);
              _context.next = 47;
              break;

            case 40:
              r = Math.random();
              lowestMatch = null;

              for (i in nextScene) {
                sceneRate = parseFloat(i);

                if (r < sceneRate && (lowestMatch == null || i < lowestMatch)) {
                  lowestMatch = i;
                }
              }

              if (!(lowestMatch !== null)) {
                _context.next = 46;
                break;
              }

              engine.events.loadScene(nextScene[lowestMatch]);
              return _context.abrupt("return");

            case 46:
              engine.events.endEvent();

            case 47:
              return _context.abrupt("return", true);

            case 48:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function exec(_x, _x2, _x3) {
      return _exec.apply(this, arguments);
    }

    return exec;
  }()
});

var Events = /*#__PURE__*/function (_GameModule) {
  _inheritsLoose(Events, _GameModule);

  function Events(engine) {
    var _this;

    _this = _GameModule.call(this, engine) || this;
    _this._enemyAttackTimer = null;
    _this.eventPool = {
      Global: events$1,
      Room: events$2,
      Outside: events$3,
      World: Object.values(events$5),
      Fight: events$6,
      Ship: []
    };
    _this.eventMap = {
      Global: events$1,
      Room: events$2,
      Outside: events$3,
      Market: events$4
    };

    _this.scheduleNextEvent();

    _this.initDelay();

    return _this;
  }

  var _proto = Events.prototype;

  _proto.winFight = function winFight() {
    clearInterval(this._enemyAttackTimer);
    this.engine.dispatch(this.engine.actions.events.winFight());
  };

  _proto.getHitChance = function getHitChance() {
    var state = this.engine.getState();

    if (state.character.perks.precise) {
      return config$1.World.BASE_HIT_CHANCE + 0.1;
    }

    return config$1.World.BASE_HIT_CHANCE;
  };

  _proto.doHeal = /*#__PURE__*/function () {
    var _doHeal = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cost, heal) {
      var state, _changed, changed, hp;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = this.engine.getState();

              if (!state.game.world.outfit[cost]) {
                _context.next = 11;
                break;
              }

              changed = (_changed = {}, _changed["outfit." + cost] = (state.path.outfit[cost] || 0) - 1, _changed);
              hp = state.game.world.health + heal;
              hp = Math.min(this.engine.spaces.World.getMaxHealth(), hp);
              changed.health = hp;
              _context.next = 8;
              return this.engine.dispatch(this.engine.actions.game.world.setM(changed));

            case 8:
              return _context.abrupt("return", true);

            case 11:
              this.engine.notify("not enough " + cost);

            case 12:
              return _context.abrupt("return", false);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function doHeal(_x, _x2) {
      return _doHeal.apply(this, arguments);
    }

    return doHeal;
  }();

  _proto.getCurrentSpaceEventsPool = function getCurrentSpaceEventsPool() {
    var space = this.engine.getState().engine.activeSpace;

    if (space === GameSpace.World) {
      return [].concat(this.eventPool.World, this.eventPool.Fight);
    } else if (space === GameSpace.Ship) {
      return [].concat(this.eventPool.Ship, this.eventPool.Global);
    } else {
      return [].concat(this.eventPool.Global, this.eventPool[space] || []);
    }
  };

  _proto.triggerEvent = function triggerEvent() {
    var space = this.engine.getState().engine.activeSpace;

    if (space !== GameSpace.World && this.getActiveEvent() === null) {
      var pool = this.getCurrentSpaceEventsPool();
      var possibleEvents = [];

      for (var i in pool) {
        var event = pool[i];

        if (event.isAvailable && event.isAvailable(this.engine.store.getState(), this.engine)) {
          possibleEvents.push(event);
        }
      }

      if (possibleEvents.length === 0) {
        this.scheduleNextEvent(0.5);
        return;
      } else {
        var r = Math.floor(Math.random() * possibleEvents.length);
        this.startEvent(possibleEvents[r]);
      }
    }

    this.scheduleNextEvent();
  };

  _proto.startEvent = /*#__PURE__*/function () {
    var _startEvent = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(event) {
      var pool, eventIndex, eventTitle;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (event) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              pool = this.getCurrentSpaceEventsPool();
              eventIndex = pool.indexOf(event);

              if (eventIndex === -1) {
                eventIndex = pool.findIndex(function (e) {
                  return e.id === event.id && typeof e.id !== 'undefined';
                });
              }

              eventTitle = eventIndex > -1 ? pool[eventIndex].title : '';

              if (!eventTitle) {
                _context2.next = 11;
                break;
              }

              _context2.next = 9;
              return this.engine.dispatch(this.engine.actions.events.push(eventTitle));

            case 9:
              _context2.next = 11;
              return this.loadScene('start');

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function startEvent(_x3) {
      return _startEvent.apply(this, arguments);
    }

    return startEvent;
  }();

  _proto.loadScene = /*#__PURE__*/function () {
    var _loadScene = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(sceneName) {
      var state, eventTitle, pool, event, scene;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = this.engine.getState();
              eventTitle = state.events.eventStack[0];
              pool = this.getCurrentSpaceEventsPool();
              event = pool.find(function (evt) {
                return evt.title === eventTitle;
              });

              if (!event) {
                sceneName = 'end';
              }

              _context3.next = 7;
              return this.engine.dispatch(this.engine.actions.events.cleanEnemys());

            case 7:
              this.engine.dispatch(this.engine.actions.events.setM({
                activeScene: sceneName
              }));
              scene = event == null ? void 0 : event.scenes[sceneName];

              if (scene) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return");

            case 11:
              if (scene.onLoad) {
                scene.onLoad(this.engine);
              }

              if (scene.notification) {
                this.engine.notify(scene.notification);
              }

              if (scene.reward) {
                this.engine.dispatch(this.engine.actions.stores.addM(scene.reward));
              }

              if (scene.combat) {
                this.startCombat(scene);
              } else {
                this.startStory(scene);
              }

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function loadScene(_x4) {
      return _loadScene.apply(this, arguments);
    }

    return loadScene;
  }();

  _proto.addEvent = function addEvent(space, event) {
    var events = this.eventPool[space];
    var exist = events.find(function (e) {
      return e.id === event.id;
    });

    if (!exist) {
      this.eventPool[space].push(event);
    }
  };

  _proto.startCombat = function startCombat(scene) {
    this.setRandomLoots(scene.loot);
    this.engine.dispatch(this.engine.actions.events.setSceneEnemy(scene));
    clearInterval(this._enemyAttackTimer);
    this._enemyAttackTimer = this.engine.setInterval(this.enemyAttack.bind(this), scene.attackDelay * 1000);
  };

  _proto.startStory = function startStory(scene) {
    this.setRandomLoots(scene.loot);
  };

  _proto.enemyAttack = /*#__PURE__*/function () {
    var _enemyAttack = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4() {
      var event, state, scene, i, len, enemy, toHit, dmg, newState;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              event = this.getActiveEvent();

              if (event) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return");

            case 3:
              state = this.engine.getState();
              scene = event.scenes[state.events.activeScene];

              if (scene) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return");

            case 7:
              i = 0, len = state.events.enemys.length;

            case 8:
              if (!(i < len)) {
                _context4.next = 20;
                break;
              }

              enemy = state.events.enemys[i];

              if (enemy.stunned) {
                _context4.next = 17;
                break;
              }

              toHit = scene.hit;
              toHit *= state.character.perks.evasive ? 0.8 : 1;
              dmg = -1;

              if (Math.random() <= toHit) {
                dmg = scene.damage;
              }

              _context4.next = 17;
              return this.damageAdventurer(enemy, dmg);

            case 17:
              i++;
              _context4.next = 8;
              break;

            case 20:
              newState = this.engine.getState();

              if (newState.game.world.health <= 0) {
                clearInterval(this._enemyAttackTimer);
                this.endEvent();
                this.engine.spaces.World.die();
              }

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function enemyAttack() {
      return _enemyAttack.apply(this, arguments);
    }

    return enemyAttack;
  }();

  _proto.damageEnemy = /*#__PURE__*/function () {
    var _damageEnemy = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(dmg, weapon) {
      var state, hp;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = this.engine.getState();
              hp = state.events.enemys[0].health;

              if (typeof dmg === 'number') {
                if (dmg < 0) {
                  dmg = 0;
                  this.engine.dispatch(this.engine.actions.events.logFight({
                    time: Date.now(),
                    type: 'miss',
                    target: 'enemy',
                    meta: {
                      weapon: weapon
                    }
                  }));
                } else {
                  hp = hp - dmg < 0 ? 0 : hp - dmg;
                  this.engine.dispatch(this.engine.actions.events.setM({
                    'enemys[0].health': hp
                  }));
                  this.engine.dispatch(this.engine.actions.events.logFight({
                    time: Date.now(),
                    type: 'damage',
                    target: 'enemy',
                    meta: {
                      dmg: dmg,
                      weapon: weapon
                    }
                  }));
                }
              } else {
                if (dmg == 'stun') {
                  this.engine.dispatch(this.engine.actions.events.setM({
                    'enemys[0].stunned': Date.now() + config$1.Event.STUN_DURATION
                  }));
                  this.engine.dispatch(this.engine.actions.events.logFight({
                    time: Date.now(),
                    type: 'stunned',
                    target: 'enemy',
                    meta: {
                      weapon: weapon
                    }
                  }));
                }
              }

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function damageEnemy(_x5, _x6) {
      return _damageEnemy.apply(this, arguments);
    }

    return damageEnemy;
  }();

  _proto.damageAdventurer = function damageAdventurer(_, dmg) {
    var state = this.engine.getState();
    var hp = state.game.world.health;

    if (typeof dmg === 'number') {
      if (dmg < 0) {
        this.engine.dispatch(this.engine.actions.events.logFight({
          time: Date.now(),
          type: 'miss',
          target: 'player'
        }));
        dmg = 0;
      } else {
        hp = hp - dmg < 0 ? 0 : hp - dmg;
        this.engine.spaces.World.setHp(hp);
        this.engine.dispatch(this.engine.actions.events.logFight({
          time: Date.now(),
          type: 'damage',
          target: 'player',
          meta: {
            dmg: dmg
          }
        }));
      }
    } else {
      if (dmg == 'stun') {
        this.engine.dispatch(this.engine.actions.game.world.setM({
          stunned: Date.now() + config$1.Event.STUN_DURATION
        }));
        this.engine.dispatch(this.engine.actions.events.logFight({
          time: Date.now(),
          type: 'stunned',
          target: 'player'
        }));
      }
    }
  };

  _proto.setRandomLoots = function setRandomLoots(lootList) {
    var randomLoot = {};
    lootList = lootList || {};

    for (var k in lootList) {
      var loot = lootList[k];

      if (Math.random() < loot.chance) {
        var num = Math.floor(Math.random() * (loot.max - loot.min)) + loot.min;
        randomLoot[k] = num;
      }
    }

    this.engine.dispatch(this.engine.actions.events.setM({
      loot: randomLoot
    }));
  };

  _proto.triggerFight = function triggerFight() {
    var possibleFights = [];
    var state = this.engine.getState();

    for (var i in this.eventPool.Fight) {
      var fight = this.eventPool.Fight[i];

      if (fight.isAvailable && fight.isAvailable(state, this.engine)) {
        possibleFights.push(fight);
      }
    }

    var r = Math.floor(Math.random() * possibleFights.length);
    this.startEvent(possibleFights[r]);
  };

  _proto.scheduleNextEvent = function scheduleNextEvent(scale) {
    var nextEvent = Math.floor(Math.random() * (config$1.Event.EVENT_TIME_RANGE[1] - config$1.Event.EVENT_TIME_RANGE[0])) + config$1.Event.EVENT_TIME_RANGE[0];

    if (scale && scale > 0) {
      nextEvent *= scale;
    }

    log('next event scheduled in ' + nextEvent + ' minutes');
    this.engine.setTimeout(this.triggerEvent.bind(this), nextEvent * 60 * 1000);
  };

  _proto.saveDelay = function saveDelay(action, stateName, delay) {
    var _this2 = this;

    if (delay) {
      var _this$engine$store, _this$engine$actions$;

      (_this$engine$store = this.engine.store) == null ? void 0 : _this$engine$store.dispatch(this.engine.actions.delay.setM((_this$engine$actions$ = {}, _this$engine$actions$[stateName] = delay, _this$engine$actions$)));
    } else {
      var _this$engine$store2;

      delay = ((_this$engine$store2 = this.engine.store) == null ? void 0 : _this$engine$store2.getState().delay[stateName]) || 0;
    }

    var interval = this.engine.setInterval(function () {
      var _this2$engine$store, _this2$engine$store2, _this2$engine$actions;

      (_this2$engine$store = _this2.engine.store) == null ? void 0 : _this2$engine$store.dispatch(_this2.engine.actions.delay.setM((_this2$engine$actions = {}, _this2$engine$actions[stateName] = (((_this2$engine$store2 = _this2.engine.store) == null ? void 0 : _this2$engine$store2.getState().delay[stateName]) || 0) - 0.5, _this2$engine$actions)));
    }, 500);
    this.engine.setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6() {
      var _this2$engine$store3, _this2$engine$actions2, _this2$engine$store4, _this2$engine$store5;

      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              clearInterval(interval);
              _context6.next = 3;
              return (_this2$engine$store3 = _this2.engine.store) == null ? void 0 : _this2$engine$store3.dispatch(_this2.engine.actions.delay.setM((_this2$engine$actions2 = {}, _this2$engine$actions2[stateName] = undefined, _this2$engine$actions2)));

            case 3:
              _context6.next = 5;
              return (_this2$engine$store4 = _this2.engine.store) == null ? void 0 : _this2$engine$store4.dispatch(_this2.engine.actions.delay.removeM([stateName]));

            case 5:
              (_this2$engine$store5 = _this2.engine.store) == null ? void 0 : _this2$engine$store5.dispatch(_this2.engine.actions.delay.clean());
              action(_this2.engine);

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })), (delay || 0) * 1000);
  };

  _proto.clean = function clean() {
    clearInterval(this._enemyAttackTimer);

    _GameModule.prototype.clean.call(this);
  };

  _proto.recallDelay = function recallDelay(stateName, target) {
    var _this$engine$store3;

    var state = _.get((_this$engine$store3 = this.engine.store) == null ? void 0 : _this$engine$store3.getState().events, stateName);

    for (var i in state) {
      if (_.isObject(state[i])) {
        this.recallDelay(stateName + '["' + i + '"]', target[i]);
      } else {
        if (typeof target[i] == 'function') {
          target[i](this.engine);
        }
      }
    }
  };

  _proto.initDelay = function initDelay() {
    var _this$engine$store4;

    var state = (_this$engine$store4 = this.engine.store) == null ? void 0 : _this$engine$store4.getState().delay;

    for (var i in state) {
      if (_.isObject(state[i])) {
        this.recallDelay(i, this.eventMap[i]);
      }
    }
  };

  _proto.getActiveScene = function getActiveScene() {
    var state = this.engine.getState();
    var event = this.getActiveEvent();

    if (!event) {
      return null;
    }

    return event.scenes[state.events.activeScene] || null;
  };

  _proto.getActiveEvent = function getActiveEvent() {
    var state = this.engine.getState();

    if (state.events.eventStack.length > 0) {
      var pool = this.getCurrentSpaceEventsPool();
      return pool.find(function (evt) {
        return evt.title === state.events.eventStack[0];
      }) || null;
    }

    return null;
  };

  _proto.endEvent = function endEvent() {
    this.engine.dispatch(this.engine.actions.events.end({}));
  };

  return Events;
}(GameModule);

operationManager.add({
  id: 'World.moveSouth',
  name: translate('south'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    var event = engine.events.getActiveEvent();
    return state.engine.activeSpace === GameSpace.World && !event;
  },
  meta: {
    space: GameSpace.World
  },
  exec: function () {
    var _exec = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(engine) {
      var curPos;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              curPos = engine.getState().game.world.curPos;

              if (curPos[1] < config$1.World.RADIUS * 2) {
                engine.spaces.World.move(config$1.World.SOUTH);
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function exec(_x) {
      return _exec.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'World.moveNorth',
  name: translate('north'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    var event = engine.events.getActiveEvent();
    return state.engine.activeSpace === GameSpace.World && !event;
  },
  meta: {
    space: GameSpace.World
  },
  exec: function () {
    var _exec2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(engine) {
      var curPos;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              curPos = engine.getState().game.world.curPos;

              if (curPos[1] > 0) {
                engine.spaces.World.move(config$1.World.NORTH);
              }

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function exec(_x2) {
      return _exec2.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'World.moveWest',
  name: translate('west'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    var event = engine.events.getActiveEvent();
    return state.engine.activeSpace === GameSpace.World && !event;
  },
  meta: {
    space: GameSpace.World
  },
  exec: function () {
    var _exec3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(engine) {
      var curPos;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              curPos = engine.getState().game.world.curPos;

              if (curPos[0] > 0) {
                engine.spaces.World.move(config$1.World.WEST);
              }

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function exec(_x3) {
      return _exec3.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'World.moveEast',
  name: translate('east'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    var event = engine.events.getActiveEvent();
    return state.engine.activeSpace === GameSpace.World && !event;
  },
  meta: {
    space: GameSpace.World
  },
  exec: function () {
    var _exec4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(engine) {
      var curPos;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              curPos = engine.getState().game.world.curPos;

              if (curPos[0] < config$1.World.RADIUS * 2) {
                engine.spaces.World.move(config$1.World.EAST);
              }

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function exec(_x4) {
      return _exec4.apply(this, arguments);
    }

    return exec;
  }()
});

var World = /*#__PURE__*/function (_GameModule) {
  _inheritsLoose(World, _GameModule);

  function World(engine) {
    var _this;

    _this = _GameModule.call(this, engine) || this;
    var state = engine.store.getState();

    if (state.previous.stores) {
      config$1.World.LANDMARKS[config$1.World.TILE.CACHE] = {
        num: 1,
        minRadius: 10,
        maxRadius: config$1.World.RADIUS * 1.5,
        scene: 'cache',
        label: translate('A&nbsp;Destroyed&nbsp;Village')
      };
    }

    if (!state.features.location.Path) {
      var map = _this.generateMap();

      var mask = _this.newMask();

      var ship = _this.mapSearch(config$1.World.TILE.SHIP, map, 1);

      var dir;

      if (ship) {
        dir = _this.compassDir(ship[0]);
      }

      engine.dispatch(engine.actions.game.world.setM({
        map: map,
        mask: mask,
        ship: ship,
        dir: dir
      }));

      _this.testMap();
    }

    return _this;
  }

  var _proto = World.prototype;

  _proto.newMask = function newMask() {
    var RADIUS = config$1.World.RADIUS;
    var mask = new Array(RADIUS * 2 + 1);

    for (var i = 0; i <= RADIUS * 2; i++) {
      mask[i] = new Array(RADIUS * 2 + 1);
    }

    this.lightMap(RADIUS, RADIUS, mask);
    return mask;
  };

  _proto.lightMap = function lightMap(x, y, mask) {
    var _this$engine$store;

    var state = (_this$engine$store = this.engine.store) == null ? void 0 : _this$engine$store.getState();
    var r = config$1.World.LIGHT_RADIUS;
    r *= state != null && state.character.perks.scout ? 2 : 1;
    this.uncoverMap(x, y, r, mask);
    return mask;
  };

  _proto.uncoverMap = function uncoverMap(x, y, r, mask) {
    mask[x][y] = true;

    for (var i = -r; i <= r; i++) {
      for (var j = -r + Math.abs(i); j <= r - Math.abs(i); j++) {
        if (y + j >= 0 && y + j <= config$1.World.RADIUS * 2 && x + i <= config$1.World.RADIUS * 2 && x + i >= 0) {
          mask[x + i][y + j] = true;
        }
      }
    }
  };

  _proto.getTerrain = function getTerrain() {
    var state = this.engine.getState();
    var curPos = state.game.world.curPos;
    return state.game.world.map[curPos[0]][curPos[1]];
  };

  _proto.markVisited = function markVisited(x, y) {
    this.engine.dispatch(this.engine.actions.game.world.visit({
      x: x,
      y: y
    }));
  };

  _proto.clearDungeon = function clearDungeon() {
    var state = this.engine.getState();
    var curPos = state.game.world.curPos;
    this.engine.dispatch(this.engine.actions.game.world.setMap({
      pos: curPos,
      value: config$1.World.TILE.OUTPOST
    }));
    this.drawRoad();
  };

  _proto.findClosestRoad = function findClosestRoad(startPos) {
    var state = this.engine.getState();
    var searchX,
        searchY,
        dtmp,
        x = 0,
        y = 0,
        dx = 1,
        dy = -1;

    for (var i = 0; i < Math.pow(this.getDistance(startPos, config$1.World.VILLAGE_POS) + 2, 2); i++) {
      searchX = startPos[0] + x;
      searchY = startPos[1] + y;

      if (0 < searchX && searchX < config$1.World.RADIUS * 2 && 0 < searchY && searchY < config$1.World.RADIUS * 2) {
        // check for road
        var tile = state.game.world.map[searchX][searchY];

        if (tile === config$1.World.TILE.ROAD || tile === config$1.World.TILE.OUTPOST && !(x === 0 && y === 0) || // outposts are connected to roads
        tile === config$1.World.TILE.VILLAGE // all roads lead home
        ) {
          return [searchX, searchY];
        }
      }

      if (x === 0 || y === 0) {
        // Turn the corner
        dtmp = dx;
        dx = -dy;
        dy = dtmp;
      }

      if (x === 0 && y <= 0) {
        x++;
      } else {
        x += dx;
        y += dy;
      }
    }

    return config$1.World.VILLAGE_POS;
  };

  _proto.drawRoad = function drawRoad() {
    var _this$engine$getState = this.engine.getState().game.world,
        curPos = _this$engine$getState.curPos,
        map = _this$engine$getState.map;
    map = _.cloneDeep(map);
    var closestRoad = this.findClosestRoad(curPos);
    var xDist = curPos[0] - closestRoad[0];
    var yDist = curPos[1] - closestRoad[1];
    var xDir = Math.abs(xDist) / xDist;
    var yDir = Math.abs(yDist) / yDist;
    var xIntersect, yIntersect;

    if (Math.abs(xDist) > Math.abs(yDist)) {
      xIntersect = closestRoad[0];
      yIntersect = closestRoad[1] + yDist;
    } else {
      xIntersect = closestRoad[0] + xDist;
      yIntersect = closestRoad[1];
    }

    for (var x = 0; x < Math.abs(xDist); x++) {
      if (this.isTerrain(map[closestRoad[0] + xDir * x][yIntersect])) {
        map[closestRoad[0] + xDir * x][yIntersect] = config$1.World.TILE.ROAD;
      }
    }

    for (var y = 0; y < Math.abs(yDist); y++) {
      if (this.isTerrain(map[xIntersect][closestRoad[1] + yDir * y])) {
        map[xIntersect][closestRoad[1] + yDir * y] = config$1.World.TILE.ROAD;
      }
    }

    this.engine.dispatch(this.engine.actions.game.world.setM({
      map: map
    }));
  };

  _proto.getMaxHealth = function getMaxHealth() {
    var state = this.engine.store.getState();

    if (!!state.stores.s_armour) {
      return config$1.World.BASE_HEALTH + 35;
    } else if (!!state.stores.i_armour) {
      return config$1.World.BASE_HEALTH + 15;
    } else if (!!state.stores.l_armou) {
      return config$1.World.BASE_HEALTH + 5;
    }

    return config$1.World.BASE_HEALTH;
  };

  _proto.applyMap = /*#__PURE__*/function () {
    var _applyMap = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _this$engine$store2;

      var state, x, y, mask;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = (_this$engine$store2 = this.engine.store) == null ? void 0 : _this$engine$store2.getState();

              if (state != null && state.game.world.seenAll) {
                _context.next = 7;
                break;
              }

              mask = state.game.world.mask;

              do {
                x = Math.floor(Math.random() * (config$1.World.RADIUS * 2 + 1));
                y = Math.floor(Math.random() * (config$1.World.RADIUS * 2 + 1));
              } while (mask[x][y]);

              this.uncoverMap(x, y, 5, mask);
              _context.next = 7;
              return this.engine.dispatch(this.engine.actions.game.world.setM({
                mask: mask
              }));

            case 7:
              this.testMap();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function applyMap() {
      return _applyMap.apply(this, arguments);
    }

    return applyMap;
  }();

  _proto.testMap = /*#__PURE__*/function () {
    var _testMap = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var _this$engine$store3;

      var state, _this$engine$store4, dark, mask, i, j;

      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = (_this$engine$store3 = this.engine.store) == null ? void 0 : _this$engine$store3.getState();

              if (state != null && state.game.world.seenAll) {
                _context2.next = 18;
                break;
              }

              mask = state.game.world.mask;
              i = 0;

            case 4:
              if (!(i < mask.length)) {
                _context2.next = 16;
                break;
              }

              j = 0;

            case 6:
              if (!(j < mask[i].length)) {
                _context2.next = 13;
                break;
              }

              if (mask[i][j]) {
                _context2.next = 10;
                break;
              }

              dark = true;
              return _context2.abrupt("break", 16);

            case 10:
              j++;
              _context2.next = 6;
              break;

            case 13:
              i++;
              _context2.next = 4;
              break;

            case 16:
              _context2.next = 18;
              return (_this$engine$store4 = this.engine.store) == null ? void 0 : _this$engine$store4.dispatch(this.engine.actions.game.world.seeAll(!dark));

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function testMap() {
      return _testMap.apply(this, arguments);
    }

    return testMap;
  }();

  _proto.onArrival = function onArrival() {
    this.engine.dispatch(this.engine.actions.game.world.setM({
      water: this.getMaxWater(),
      health: this.getMaxHealth(),
      foodMove: 0,
      waterMove: 0,
      starvation: false,
      thirst: false,
      usedOutposts: {},
      curPos: _.cloneDeep(config$1.World.VILLAGE_POS),
      dead: false
    }));
  };

  _proto.setHp = function setHp(hp) {
    this.engine.dispatch(this.engine.actions.game.world.setM({
      health: Math.min(hp, this.getMaxHealth())
    }));
  };

  _proto.setWater = function setWater(w) {
    var water = w;
    var maxWater = this.getMaxWater();

    if (water > maxWater) {
      water = maxWater;
    }

    this.engine.dispatch(this.engine.actions.game.world.setM({
      water: water
    }));
  };

  _proto.moveSouth = function moveSouth() {
    var curPos = this.engine.getState().game.world.curPos;

    if (curPos[1] < config$1.World.RADIUS * 2) {
      this.move(config$1.World.SOUTH);
    }
  };

  _proto.moveWest = function moveWest() {
    var curPos = this.engine.getState().game.world.curPos;

    if (curPos[0] > 0) {
      this.move(config$1.World.WEST);
    }
  };

  _proto.moveEast = function moveEast() {
    var curPos = this.engine.getState().game.world.curPos;

    if (curPos[0] < config$1.World.RADIUS * 2) {
      this.move(config$1.World.EAST);
    }
  };

  _proto.moveNorth = function moveNorth() {
    var curPos = this.engine.getState().game.world.curPos;

    if (curPos[1] > 0) {
      this.move(config$1.World.NORTH);
    }
  };

  _proto.move = /*#__PURE__*/function () {
    var _move = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(direction) {
      var _this$engine$getState2, map, mask, curPos, danger, oldTile;

      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$engine$getState2 = this.engine.getState().game.world, map = _this$engine$getState2.map, mask = _this$engine$getState2.mask, curPos = _this$engine$getState2.curPos, danger = _this$engine$getState2.danger;
              mask = _.cloneDeep(mask);
              curPos = _.cloneDeep(curPos);
              oldTile = map[curPos[0]][curPos[1]];
              curPos[0] += direction[0];
              curPos[1] += direction[1];
              this.narrateMove(oldTile, map[curPos[0]][curPos[1]]);
              this.lightMap(curPos[0], curPos[1], mask);
              _context3.next = 10;
              return this.engine.dispatch(this.engine.actions.game.world.setM({
                mask: mask,
                curPos: curPos
              }));

            case 10:
              _context3.next = 12;
              return this.doSpace();

            case 12:
              // play random footstep
              if (this.checkDanger()) {
                if (danger) {
                  this.engine.notify(translate('dangerous to be this far from the village without proper protection'), GameSpace.World);
                } else {
                  this.engine.notify(translate('safer here'), GameSpace.World);
                }
              }

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function move(_x) {
      return _move.apply(this, arguments);
    }

    return move;
  }();

  _proto.useOutpost = function useOutpost() {
    this.engine.dispatch(this.engine.actions.game.world.useOutpost());
    this.setWater(this.getMaxWater());
    this.engine.notify(translate('water replenished'));
  };

  _proto.getMaxWater = function getMaxWater() {
    var state = this.engine.store.getState();

    if (!!state.stores.water_tank) {
      return config$1.World.BASE_WATER + 50;
    } else if (!!state.stores.cask) {
      return config$1.World.BASE_WATER + 20;
    } else if (!!state.stores.waterskin) {
      return config$1.World.BASE_WATER + 10;
    }

    return config$1.World.BASE_WATER;
  };

  _proto.generateMap = function generateMap() {
    var RADIUS = config$1.World.RADIUS;
    var map = new Array(RADIUS * 2 + 1);

    for (var i = 0; i <= RADIUS * 2; i++) {
      map[i] = new Array(RADIUS * 2 + 1);
    } // The Village is always at the exact center
    // Spiral out from there


    map[RADIUS][RADIUS] = config$1.World.TILE.VILLAGE;

    for (var r = 1; r <= RADIUS; r++) {
      for (var t = 0; t < r * 8; t++) {
        var x, y;

        if (t < 2 * r) {
          x = RADIUS - r + t;
          y = RADIUS - r;
        } else if (t < 4 * r) {
          x = RADIUS + r;
          y = RADIUS - 3 * r + t;
        } else if (t < 6 * r) {
          x = RADIUS + 5 * r - t;
          y = RADIUS + r;
        } else {
          x = RADIUS - r;
          y = RADIUS + 7 * r - t;
        }

        map[x][y] = this.chooseTile(x, y, map);
      }
    } // Place landmarks


    for (var k in config$1.World.LANDMARKS) {
      var landmark = config$1.World.LANDMARKS[k];

      for (var l = 0; l < landmark.num; l++) {
        this.placeLandmark(landmark.minRadius, landmark.maxRadius, k, map);
      }
    }

    return map;
  };

  _proto.chooseTile = function chooseTile(x, y, map) {
    var adjacent = [y > 0 ? map[x][y - 1] : null, y < config$1.World.RADIUS * 2 ? map[x][y + 1] : null, x < config$1.World.RADIUS * 2 ? map[x + 1][y] : null, x > 0 ? map[x - 1][y] : null];
    var chances = {};
    var nonSticky = 1;
    var cur;

    for (var i in adjacent) {
      if (adjacent[i] == config$1.World.TILE.VILLAGE) {
        // Village must be in a forest to maintain thematic consistency, yo.
        return config$1.World.TILE.FOREST;
      } else if (typeof adjacent[i] === 'string') {
        cur = chances[adjacent[i]];
        cur = typeof cur == 'number' ? cur : 0;
        chances[adjacent[i]] = cur + config$1.World.STICKINESS;
        nonSticky -= config$1.World.STICKINESS;
      }
    }

    for (var t in config$1.World.TILE) {
      var tile = config$1.World.TILE[t];

      if (this.isTerrain(tile)) {
        cur = chances[tile];
        cur = typeof cur == 'number' ? cur : 0;
        cur += config$1.World.TILE_PROBS[tile] * nonSticky;
        chances[tile] = cur;
      }
    }

    var list = [];

    for (var j in chances) {
      list.push(chances[j] + '' + j);
    }

    list.sort(function (a, b) {
      var n1 = parseFloat(a.substring(0, a.length - 1));
      var n2 = parseFloat(b.substring(0, b.length - 1));
      return n2 - n1;
    });
    var c = 0;
    var r = Math.random();

    for (var l in list) {
      var prob = list[l];
      c += parseFloat(prob.substring(0, prob.length - 1));

      if (r < c) {
        return prob.charAt(prob.length - 1);
      }
    }

    return config$1.World.TILE.BARRENS;
  };

  _proto.placeLandmark = function placeLandmark(minRadius, maxRadius, landmark, map) {
    var x = config$1.World.RADIUS,
        y = config$1.World.RADIUS;

    while (!this.isTerrain(map[x][y])) {
      var r = Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
      var xDist = Math.floor(Math.random() * r);
      var yDist = r - xDist;
      if (Math.random() < 0.5) xDist = -xDist;
      if (Math.random() < 0.5) yDist = -yDist;
      x = config$1.World.RADIUS + xDist;
      if (x < 0) x = 0;
      if (x > config$1.World.RADIUS * 2) x = config$1.World.RADIUS * 2;
      y = config$1.World.RADIUS + yDist;
      if (y < 0) y = 0;
      if (y > config$1.World.RADIUS * 2) y = config$1.World.RADIUS * 2;
    }

    map[x][y] = landmark;
    return [x, y];
  };

  _proto.isTerrain = function isTerrain(tile) {
    return tile == config$1.World.TILE.FOREST || tile == config$1.World.TILE.FIELD || tile == config$1.World.TILE.BARRENS;
  };

  _proto.mapSearch = function mapSearch(target, map, required) {
    var max = config$1.World.LANDMARKS[target].num;

    if (!max) {
      // this restrict the research to numerable landmarks
      return null;
    } // restrict research if only a fixed number (usually 1) is required


    max = required ? Math.min(required, max) : max;
    var index = 0;
    var targets = [];
    var RADIUS = config$1.World.RADIUS; // label for coordinate research

    search: for (var i = 0; i <= RADIUS * 2; i++) {
      for (var j = 0; j <= RADIUS * 2; j++) {
        if (map[i][j].charAt(0) === target) {
          // search result is stored as an object;
          // items are listed as they appear in the map, tl-br
          // each item has relative coordinates and a compass-type direction
          targets[index] = {
            x: i - RADIUS,
            y: j - RADIUS
          };
          index++;

          if (index === max) {
            // optimisation: stop the research if maximum number of items has been reached
            break search;
          }
        }
      }
    }

    return targets;
  };

  _proto.compassDir = function compassDir(pos) {
    var dir = '';
    var horz = pos.x < 0 ? 'west' : 'east';
    var vert = pos.y < 0 ? 'north' : 'south';

    if (Math.abs(pos.x) / 2 > Math.abs(pos.y)) {
      dir = horz;
    } else if (Math.abs(pos.y) / 2 > Math.abs(pos.x)) {
      dir = vert;
    } else {
      dir = vert + horz;
    }

    return dir;
  };

  _proto.goHome = /*#__PURE__*/function () {
    var _goHome = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4() {
      var state;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = this.engine.getState();

              if (state.game.world.sulphurmine && !state.game.buildings.sulphur_mine) {
                this.engine.dispatch(this.engine.actions.game.buildings.addM({
                  sulphur_mine: 1
                }));
              }

              if (state.game.world.ironmine && !state.game.buildings.iron_mine) {
                this.engine.dispatch(this.engine.actions.game.buildings.addM({
                  iron_mine: 1
                }));
              }

              if (state.game.world.coalmine && !state.game.buildings.coal_mine) {
                this.engine.dispatch(this.engine.actions.game.buildings.addM({
                  coal_mine: 1
                }));
              } // if (state.game.world.ship && !state.features.location.Ship) {
              //   this.engine.dispatch(
              //     this.engine.actions.features.location.enableSpaceShip()
              //   );
              // }


              this.engine.dispatch(this.engine.actions.stores.addM(state.game.world.outfit));
              this.engine.travelTo(GameSpace.Path);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function goHome() {
      return _goHome.apply(this, arguments);
    }

    return goHome;
  }();

  _proto.getFreeSpace = function getFreeSpace() {
    var state = this.engine.getState();
    var num = 0;

    for (var k in state.game.world.outfit) {
      var n = state.game.world.outfit[k] || 0;
      num += n * this.engine.spaces.Path.getWeight(k);
    }

    return this.engine.spaces.Path.getCapacity() - num;
  };

  _proto.die = function die() {
    var state = this.engine.getState();

    if (!state.game.world.dead) {
      this.engine.dispatch(this.engine.actions.game.world.setM({
        dead: true
      })); // Dead! Discard any world changes and go home

      this.engine.notify(translate('the world fades'), GameSpace.World);
      this.engine.dispatch(this.engine.actions.path.outfit.empty());
      this.engine.travelTo(GameSpace.Room);
    }
  };

  _proto.checkFight = function checkFight() {
    var state = this.engine.getState();
    var fightMove = state.game.world.fightMove + 1;

    if (fightMove > config$1.World.FIGHT_DELAY) {
      var chance = config$1.World.FIGHT_CHANCE;
      chance *= state.character.perks.stealthy ? 0.5 : 1;

      if (Math.random() < chance) {
        fightMove = 0;
        this.engine.events.triggerFight();
      }
    }

    this.engine.dispatch(this.engine.actions.game.world.setM({
      fightMove: fightMove
    }));
  };

  _proto.narrateMove = function narrateMove(oldTile, newTile) {
    var msg = null;

    switch (oldTile) {
      case config$1.World.TILE.FOREST:
        switch (newTile) {
          case config$1.World.TILE.FIELD:
            msg = translate('the trees yield to dry grass. the yellowed brush rustles in the wind.');
            break;

          case config$1.World.TILE.BARRENS:
            msg = translate('the trees are gone. parched earth and blowing dust are poor replacements.');
            break;
        }

        break;

      case config$1.World.TILE.FIELD:
        switch (newTile) {
          case config$1.World.TILE.FOREST:
            msg = translate('trees loom on the horizon. grasses gradually yield to a forest floor of dry branches and fallen leaves.');
            break;

          case config$1.World.TILE.BARRENS:
            msg = translate('the grasses thin. soon, only dust remains.');
            break;
        }

        break;

      case config$1.World.TILE.BARRENS:
        switch (newTile) {
          case config$1.World.TILE.FIELD:
            msg = translate('the barrens break at a sea of dying grass, swaying in the arid breeze.');
            break;

          case config$1.World.TILE.FOREST:
            msg = translate('a wall of gnarled trees rises from the dust. their branches twist into a skeletal canopy overhead.');
            break;
        }

        break;
    }

    if (msg != null) {
      this.engine.notify(msg, GameSpace.World);
    }
  };

  _proto.getDistance = function getDistance(from, to) {
    if (!from) {
      from = this.engine.getState().game.world.curPos;
    }

    to = to || config$1.World.VILLAGE_POS;
    return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
  };

  _proto.outpostUsed = function outpostUsed(x, y) {
    var _this$engine$getState3 = this.engine.getState().game.world,
        curPos = _this$engine$getState3.curPos,
        usedOutposts = _this$engine$getState3.usedOutposts;
    x = typeof x == 'number' ? x : curPos[0];
    y = typeof y == 'number' ? y : curPos[1];
    var used = usedOutposts[x + ',' + y];
    return used === true;
  };

  _proto.useSupplies = /*#__PURE__*/function () {
    var _useSupplies = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5() {
      var state, foodMove, waterMove, changed, movesPerFood, num, starvedCount, movesPerWater, water, dehydratedCount;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = this.engine.getState();
              foodMove = state.game.world.foodMove + 1;
              waterMove = state.game.world.waterMove + 1;
              changed = {
                foodMove: foodMove,
                waterMove: waterMove
              }; // Food

              movesPerFood = config$1.World.MOVES_PER_FOOD;
              movesPerFood *= state.character.perks.slow_metabolism ? 2 : 1;

              if (!(foodMove >= movesPerFood)) {
                _context5.next = 33;
                break;
              }

              foodMove = 0;
              changed.foodMove = 0;
              num = state.game.world.outfit.cured_meat || 0;
              num--;

              if (!(num === 0)) {
                _context5.next = 15;
                break;
              }

              this.engine.notify(translate('the meat has run out'), GameSpace.World);
              _context5.next = 32;
              break;

            case 15:
              if (!(num < 0)) {
                _context5.next = 30;
                break;
              }

              // Starvation! Hooray!
              num = 0;

              if (state.game.world.starvation) {
                _context5.next = 22;
                break;
              }

              this.engine.notify(translate('starvation sets in'), GameSpace.World);
              changed.starvation = true;
              _context5.next = 28;
              break;

            case 22:
              starvedCount = state.character.statistics.starved + 1;
              this.engine.dispatch(this.engine.actions.character.statistics.setM({
                starved: starvedCount
              }));

              if (starvedCount >= 10 && !state.character.perks.slow_metabolism) {
                this.engine.dispatch(this.engine.actions.character.perks.addPerk(PerkCategory.slow_metabolism));
              }

              this.engine.dispatch(this.engine.actions.game.world.setM(changed));
              this.die();
              return _context5.abrupt("return", false);

            case 28:
              _context5.next = 32;
              break;

            case 30:
              changed.starvation = false;
              changed.health = Math.min(state.game.world.health + this.meatHeal(), this.getMaxHealth());

            case 32:
              changed['outfit.cured_meat'] = num;

            case 33:
              // Water
              movesPerWater = config$1.World.MOVES_PER_WATER;
              movesPerWater *= state.character.perks.desert_rat ? 2 : 1;

              if (!(waterMove >= movesPerWater)) {
                _context5.next = 61;
                break;
              }

              waterMove = 0;
              changed.waterMove = 0;
              water = state.game.world.water;
              water--;

              if (!(water === 0)) {
                _context5.next = 44;
                break;
              }

              this.engine.notify(translate('there is no more water'), GameSpace.World);
              _context5.next = 60;
              break;

            case 44:
              if (!(water < 0)) {
                _context5.next = 59;
                break;
              }

              water = 0;

              if (state.game.world.thirst) {
                _context5.next = 51;
                break;
              }

              this.engine.notify(translate('the thirst becomes unbearable'), GameSpace.World);
              changed.thirst = true;
              _context5.next = 57;
              break;

            case 51:
              dehydratedCount = state.character.statistics.dehydrated + 1;
              this.engine.dispatch(this.engine.actions.character.statistics.setM({
                dehydrated: dehydratedCount
              }));

              if (dehydratedCount >= 10 && !state.character.perks.desert_rat) {
                this.engine.dispatch(this.engine.actions.character.perks.addPerk(PerkCategory.desert_rat));
              }

              this.engine.dispatch(this.engine.actions.game.world.setM(changed));
              this.die();
              return _context5.abrupt("return", false);

            case 57:
              _context5.next = 60;
              break;

            case 59:
              changed.thirst = false;

            case 60:
              changed.water = water;

            case 61:
              _context5.next = 63;
              return this.engine.dispatch(this.engine.actions.game.world.setM(changed));

            case 63:
              return _context5.abrupt("return", true);

            case 64:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function useSupplies() {
      return _useSupplies.apply(this, arguments);
    }

    return useSupplies;
  }();

  _proto.meatHeal = function meatHeal() {
    var state = this.engine.getState();
    return config$1.World.MEAT_HEAL * (state.character.perks.gastronome ? 2 : 1);
  };

  _proto.medsHeal = function medsHeal() {
    return config$1.World.MEDS_HEAL;
  };

  _proto.checkDanger = function checkDanger() {
    var state = this.engine.getState();

    if (!state.game.world.danger) {
      if (!state.stores.i_armour && this.getDistance() >= 8) {
        this.engine.dispatch(this.engine.actions.game.world.setM({
          danger: true
        }));
        return true;
      }

      if (!state.stores.s_armour && this.getDistance() >= 18) {
        this.engine.dispatch(this.engine.actions.game.world.setM({
          danger: true
        }));
        return true;
      }
    } else {
      if (this.getDistance() < 8) {
        this.engine.dispatch(this.engine.actions.game.world.setM({
          danger: false
        }));
        return true;
      }

      if (this.getDistance() < 18 && (state.stores.i_armour || 0) > 0) {
        this.engine.dispatch(this.engine.actions.game.world.setM({
          danger: false
        }));
        return true;
      }
    }

    return false;
  };

  _proto.doSpace = /*#__PURE__*/function () {
    var _doSpace = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6() {
      var _this$engine$getState4, map, curPos, curTile, event, res;

      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this$engine$getState4 = this.engine.getState().game.world, map = _this$engine$getState4.map, curPos = _this$engine$getState4.curPos;
              curTile = map[curPos[0]][curPos[1]];

              if (!(curTile === config$1.World.TILE.VILLAGE)) {
                _context6.next = 6;
                break;
              }

              this.goHome();
              _context6.next = 14;
              break;

            case 6:
              if (!(typeof config$1.World.LANDMARKS[curTile] !== 'undefined')) {
                _context6.next = 10;
                break;
              }

              if (curTile !== config$1.World.TILE.OUTPOST || !this.outpostUsed()) {
                event = this.engine.events.eventPool.World.find(function (event) {
                  return event.id === config$1.World.LANDMARKS[curTile].scene;
                });

                if (event) {
                  this.engine.events.startEvent(event);
                }
              }

              _context6.next = 14;
              break;

            case 10:
              _context6.next = 12;
              return this.useSupplies();

            case 12:
              res = _context6.sent;

              if (res) {
                this.checkFight();
              }

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function doSpace() {
      return _doSpace.apply(this, arguments);
    }

    return doSpace;
  }();

  return World;
}(GameModule);

function needsWorkshop(type) {
  return type == 'weapon' || type == 'upgrade' || type == 'tool';
}

var _cost$1, _cost2$1;
operationManager.add({
  id: 'Room.lightFire',
  name: translate("light fire"),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && state.game.fire.status.value === config$1.Room.FireStatus.Dead.value;
  },
  exec: function () {
    var _exec = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(engine) {
      var Room, appState, wood, currentFireStatus;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Room = engine.spaces.Room;
              appState = engine.getState();
              wood = appState.stores.wood;
              currentFireStatus = appState.game.fire.status;

              if (!(typeof wood !== 'undefined')) {
                _context.next = 17;
                break;
              }

              wood = wood || 0;

              if (!(wood < 5)) {
                _context.next = 12;
                break;
              }

              engine.notify(translate('not enough wood to get the fire going'), GameSpace.Room);
              engine.operationExecutor.clearCooldown('Room.lightFire');
              return _context.abrupt("return", currentFireStatus);

            case 12:
              if (!(wood > 4)) {
                _context.next = 15;
                break;
              }

              _context.next = 15;
              return engine.dispatch(engine.actions.stores.addM({
                wood: -5
              }));

            case 15:
              _context.next = 21;
              break;

            case 17:
              _context.next = 19;
              return engine.dispatch(engine.actions.stores.addM({
                wood: 5
              }));

            case 19:
              _context.next = 21;
              return engine.operationExecutor.cooldown('Room.stokeFire');

            case 21:
              currentFireStatus = config$1.Room.FireStatus.Burning;
              _context.next = 24;
              return engine.dispatch(engine.actions.game.fire.changeFire(currentFireStatus));

            case 24:
              Room.onFireChange(currentFireStatus);
              return _context.abrupt("return", currentFireStatus);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function exec(_x) {
      return _exec.apply(this, arguments);
    }

    return exec;
  }(),
  cooldown: function cooldown() {
    return config$1.Room.STOKE_COOLDOWN;
  },
  meta: {
    space: GameSpace.Room,
    cost: (_cost$1 = {}, _cost$1[StoreCategory.wood] = 5, _cost$1)
  }
});
operationManager.add({
  id: 'Room.stokeFire',
  name: translate("stoke fire"),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && state.game.fire.status.value !== config$1.Room.FireStatus.Dead.value;
  },
  exec: function () {
    var _exec2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(engine) {
      var appState, wood, Room, currentFireStatus, newState;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              appState = engine.getState();
              wood = appState.stores.wood;
              Room = engine.spaces.Room;
              currentFireStatus = appState.game.fire.status;

              if (wood) {
                _context2.next = 8;
                break;
              }

              engine.notify(translate('the wood has run out'), GameSpace.Room);
              engine.operationExecutor.clearCooldown('Room.stokeFire');
              return _context2.abrupt("return", currentFireStatus);

            case 8:
              _context2.next = 10;
              return engine.dispatch(engine.actions.stores.addM({
                wood: -1
              }));

            case 10:
              if (!(currentFireStatus.value < config$1.Room.FireStatus.Roaring.value)) {
                _context2.next = 16;
                break;
              }

              newState = _.findKey(config$1.Room.FireStatus, function (fire) {
                return fire.value === currentFireStatus.value + 1;
              });

              if (!newState) {
                _context2.next = 16;
                break;
              }

              currentFireStatus = config$1.Room.FireStatus[newState];
              _context2.next = 16;
              return engine.dispatch(engine.actions.game.fire.changeFire(currentFireStatus));

            case 16:
              Room.onFireChange(currentFireStatus);
              return _context2.abrupt("return", currentFireStatus);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function exec(_x2) {
      return _exec2.apply(this, arguments);
    }

    return exec;
  }(),
  cooldown: function cooldown() {
    return config$1.Room.STOKE_COOLDOWN;
  },
  meta: {
    space: GameSpace.Room,
    cost: (_cost2$1 = {}, _cost2$1[StoreCategory.wood] = 1, _cost2$1)
  }
});
operationManager.add({
  id: 'Room.stores',
  name: translate("warehouse"),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && typeof state.stores.wood !== 'undefined';
  },
  exec: function () {
    var _exec3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(engine) {
      var state, storeNames, stores, i, len, name, count;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = engine.getState();
              storeNames = Object.keys(state.stores);
              stores = [];

              for (i = 0, len = storeNames.length; i < len; i++) {
                name = storeNames[i];
                count = state.stores[name];

                if (!!count && config$1.items[name] && config$1.items[name].type !== 'building') {
                  stores.push({
                    name: name,
                    count: count,
                    info: config$1.items[name]
                  });
                }
              }

              return _context3.abrupt("return", stores);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function exec(_x3) {
      return _exec3.apply(this, arguments);
    }

    return exec;
  }(),
  meta: {
    space: GameSpace.Room
  }
});
operationManager.add({
  id: 'Room.trading_post',
  name: translate('trading post'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && !!state.game.buildings.trading_post;
  },
  meta: {
    space: GameSpace.Room
  },
  exec: function () {
    var _exec4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(engine, operation) {
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return engine.travelToSubSpace(operation.name);

            case 2:
              return _context4.abrupt("return", operation.name);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function exec(_x4, _x5) {
      return _exec4.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Room.workshop',
  name: translate('workshop'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && !!state.game.buildings.workshop;
  },
  meta: {
    space: GameSpace.Room
  },
  exec: function () {
    var _exec5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(engine, operation) {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return engine.travelToSubSpace(operation.name);

            case 2:
              return _context5.abrupt("return", operation.name);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function exec(_x6, _x7) {
      return _exec5.apply(this, arguments);
    }

    return exec;
  }()
});
Object.keys(TradeCategory).forEach(function (thing) {
  operationManager.add({
    id: "Room.buy." + thing,
    name: translate(thing),
    isAvailable: function isAvailable(engine, operation) {
      var state = engine.getState();
      var thing = operation.meta.thing;
      return state.engine.activeSubSpace === 'trading post' && engine.spaces.Room.buyUnlocked(thing);
    },
    meta: {
      thing: thing,
      space: GameSpace.Room,
      group: 'buy'
    },
    exec: function () {
      var _exec6 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(engine, operation) {
        var _engine$actions$store;

        var thing, state, good, count, storeMod, cost, k, have;
        return runtime_1.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                thing = operation.meta.thing;
                state = engine.getState();
                good = config$1.items[thing];
                count = state.stores[thing] || 0;

                if (count < 0) {
                  count = 0;
                }

                if (good.trade) {
                  _context6.next = 7;
                  break;
                }

                return _context6.abrupt("return", false);

              case 7:
                if (!(good.trade.maximum && good.trade.maximum < count)) {
                  _context6.next = 10;
                  break;
                }

                /* i18n-extract can't buy any more of {item} */
                engine.notify("can't buy any more of " + good.name, GameSpace.Room);
                return _context6.abrupt("return", false);

              case 10:
                storeMod = {};
                cost = good.trade.cost();
                _context6.t0 = runtime_1.keys(cost);

              case 13:
                if ((_context6.t1 = _context6.t0()).done) {
                  _context6.next = 24;
                  break;
                }

                k = _context6.t1.value;
                have = state.stores[k] || 0;

                if (!(have < cost[k])) {
                  _context6.next = 21;
                  break;
                }

                /* i18n-extract not enough {item}, need {count1}, stock {count2} */
                engine.notify("not enough " + k + ", need " + cost[k] + ", stock " + have, GameSpace.Room);
                return _context6.abrupt("return", false);

              case 21:
                storeMod[k] = have - cost[k];

              case 22:
                _context6.next = 13;
                break;

              case 24:
                _context6.next = 26;
                return engine.dispatch(engine.actions.stores.addM(storeMod));

              case 26:
                _context6.next = 28;
                return _context6.sent;

              case 28:
                if (good.trade.tradeMsg) {
                  engine.notify(good.trade.tradeMsg);
                }

                _context6.next = 31;
                return engine.dispatch(engine.actions.stores.addM((_engine$actions$store = {}, _engine$actions$store[thing] = 1, _engine$actions$store)));

              case 31:
                return _context6.abrupt("return", true);

              case 32:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function exec(_x8, _x9) {
        return _exec6.apply(this, arguments);
      }

      return exec;
    }()
  });
});
Object.keys(CraftableCategory).forEach(function (thing) {
  var item = config$1.items[thing];
  var group = needsWorkshop(item.craft.type) ? 'craft' : 'build';
  operationManager.add({
    id: "Room." + group + "." + thing,
    name: translate(thing),
    isAvailable: function isAvailable(engine, operation) {
      var state = engine.getState();
      var thing = operation.meta.thing;
      var group = operation.meta.group;

      if (group === 'craft') {
        return state.engine.activeSubSpace === 'workshop' && state.engine.activeSpace === GameSpace.Room && engine.spaces.Room.craftUnlocked(thing);
      }

      return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && engine.spaces.Room.craftUnlocked(thing);
    },
    meta: {
      thing: thing,
      space: GameSpace.Room,
      group: group
    },
    exec: function () {
      var _exec7 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(engine, operation) {
        var _craftable$craft2, _engine$addToStore, _engine$actions$game$;

        var thing, state, craftable, numThings, storeMod, cost, k, have, _craftable$craft;

        return runtime_1.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                thing = operation.meta.thing;
                state = engine.getState();

                if (!(state.game.temperature.status.value <= config$1.Room.TemperatureStatus.Cold.value)) {
                  _context7.next = 5;
                  break;
                }

                engine.notify('builder just shivers', GameSpace.Room);
                return _context7.abrupt("return", false);

              case 5:
                craftable = config$1.items[thing];

                if (craftable.craft) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", false);

              case 8:
                numThings = 0;
                _context7.t0 = craftable.type;
                _context7.next = _context7.t0 === 'good' ? 12 : _context7.t0 === 'weapon' ? 12 : _context7.t0 === 'tool' ? 12 : _context7.t0 === 'upgrade' ? 12 : _context7.t0 === 'building' ? 14 : 16;
                break;

              case 12:
                numThings = state.stores[thing] || 0;
                return _context7.abrupt("break", 16);

              case 14:
                numThings = state.game.buildings[thing] || 0;
                return _context7.abrupt("break", 16);

              case 16:
                if (numThings < 0) numThings = 0;

                if (!(craftable.craft.maximum && craftable.craft.maximum <= numThings)) {
                  _context7.next = 20;
                  break;
                }

                /* i18n-extract can't build any more of {item} */
                engine.notify("can't build any more of " + craftable.name, GameSpace.Room);
                return _context7.abrupt("return", false);

              case 20:
                storeMod = {};
                cost = craftable.craft.cost(state);
                _context7.t1 = runtime_1.keys(cost);

              case 23:
                if ((_context7.t2 = _context7.t1()).done) {
                  _context7.next = 34;
                  break;
                }

                k = _context7.t2.value;
                have = state.stores[k] || 0;

                if (!(have < cost[k])) {
                  _context7.next = 31;
                  break;
                }

                engine.notify("not enough " + k + ", need " + cost[k] + ", stock " + have, GameSpace.Room);
                return _context7.abrupt("return", false);

              case 31:
                storeMod[k] = have - cost[k];

              case 32:
                _context7.next = 23;
                break;

              case 34:
                _context7.next = 36;
                return engine.setToStore(storeMod);

              case 36:
                if (craftable.craft.buildMsg) {
                  engine.notify((_craftable$craft = craftable.craft) == null ? void 0 : _craftable$craft.buildMsg, GameSpace.Room);
                }

                _context7.t3 = (_craftable$craft2 = craftable.craft) == null ? void 0 : _craftable$craft2.type;
                _context7.next = _context7.t3 === 'good' ? 40 : _context7.t3 === 'weapon' ? 40 : _context7.t3 === 'upgrade' ? 40 : _context7.t3 === 'tool' ? 40 : _context7.t3 === 'building' ? 43 : 46;
                break;

              case 40:
                _context7.next = 42;
                return engine.addToStore((_engine$addToStore = {}, _engine$addToStore[thing] = 1, _engine$addToStore));

              case 42:
                return _context7.abrupt("break", 46);

              case 43:
                _context7.next = 45;
                return engine.dispatch(engine.actions.game.buildings.addM((_engine$actions$game$ = {}, _engine$actions$game$[thing] = 1, _engine$actions$game$)));

              case 45:
                return _context7.abrupt("break", 46);

              case 46:
                return _context7.abrupt("return", true);

              case 47:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function exec(_x10, _x11) {
        return _exec7.apply(this, arguments);
      }

      return exec;
    }()
  });
});

var Room = /*#__PURE__*/function (_GameModule) {
  _inheritsLoose(Room, _GameModule);

  function Room(engine) {
    var _this;

    _this = _GameModule.call(this, engine) || this;
    _this._fireTimer = null;
    _this._tempTimer = null;
    _this._builderTimer = null;
    var state = engine.getState();

    if (!state.features.location.Room) {
      engine.dispatch(engine.actions.features.location.enableRoom());
      engine.dispatch(engine.actions.game.builder.setM({
        level: -1
      }));
    }

    _this._fireTimer = engine.setTimeout(_this.coolFire.bind(_assertThisInitialized(_this)), config$1.Room.FIRE_COOL_DELAY);
    _this._tempTimer = engine.setTimeout(_this.adjustTemp.bind(_assertThisInitialized(_this)), config$1.Room.ROOM_WARM_DELAY);
    var builderLevel = state.game.builder.level;

    if (builderLevel >= 0 && builderLevel < 3) {
      _this._builderTimer = engine.setTimeout(_this.updateBuilderState.bind(_assertThisInitialized(_this)), config$1.Room.BUILDER_STATE_DELAY);
    }

    if (builderLevel == 1 && typeof state.stores.wood === 'undefined') {
      _this.engine.setTimeout(_this.unlockForest.bind(_assertThisInitialized(_this)), config$1.Room.NEED_WOOD_DELAY);
    }

    _this.engine.observer(function (state) {
      return {
        wood: state.stores.wood,
        meat: state.stores.meat,
        fur: state.stores.fur,
        thieves: state.game.thieves,
        enableWorld: state.features.location.World
      };
    }, function (state) {
      if (!state.thieves && state.enableWorld) {
        if ((state.wood || 0) > 5000 || (state.meat || 0) > 5000 || (state.fur || 0) > 5000) {
          _this.startThieves();
        }
      }
    });

    return _this;
  }

  var _proto = Room.prototype;

  _proto.coolFire = function coolFire() {
    var appState = this.engine.getState();
    var wood = appState.stores.wood;
    var currentFireStatus = appState.game.fire.status;
    var builderLevel = appState.game.builder.level;

    if (currentFireStatus.value <= config$1.Room.FireStatus.Flickering.value && builderLevel > 3 && !!wood) {
      this.engine.notify(translate('builder stokes the fire'), GameSpace.Room, true);
      this.engine.dispatch(this.engine.actions.stores.addM({
        wood: -1
      }));
      currentFireStatus = config$1.Room.FireStatus[_.findKey(config$1.Room.FireStatus, function (fire) {
        return fire.value === currentFireStatus.value + 1;
      })];
    }

    if (currentFireStatus.value > 0) {
      currentFireStatus = config$1.Room.FireStatus[_.findKey(config$1.Room.FireStatus, function (fire) {
        return fire.value === currentFireStatus.value - 1;
      })];
      this.engine.dispatch(this.engine.actions.game.fire.changeFire(currentFireStatus));
      this.onFireChange(currentFireStatus);
    }
  };

  _proto.onArrival = function onArrival() {
    var state = this.engine.getState();

    if (state.room.changed) {
      /* i18n-extract the fire is {fireStatus} */

      /* i18n-extract the room is {roomStatus} */
      this.engine.notify("the fire is " + state.game.fire.status.text);
      this.engine.notify("the room is " + state.game.temperature.status.text);
      this.engine.dispatch(this.engine.actions.room.setChanged(false));
    }

    if (state.game.builder.level === 3) {
      this.engine.dispatch(this.engine.actions.game.builder.addM({
        level: 1
      }));
      this.engine.setIncome('builder', {
        delay: 10,
        stores: {
          wood: 2
        }
      });
      this.engine.notify(translate('the stranger is standing by the fire. she says she can help. says she builds things.'), GameSpace.Room);
    }
  };

  _proto.canTrade = function canTrade(thing) {
    var state = this.engine.getState();

    if (state.room.crafts[thing]) {
      return true;
    } else if (state.game.buildings.trading_post > 0) {
      if (thing === StoreCategory.compass || typeof state.stores[thing] !== 'undefined') {
        return true;
      }
    }

    return false;
  };

  _proto.buyUnlocked = function buyUnlocked(thing) {
    var state = this.engine.getState();

    if (state.room.buys[thing]) {
      return true;
    } else if (!!state.game.buildings.trading_post) {
      if (thing === StoreCategory.compass || typeof state.stores[thing] !== 'undefined') {
        return true;
      }
    }

    return false;
  };

  _proto.clean = function clean() {
    clearTimeout(this._fireTimer);
    clearTimeout(this._tempTimer);
    clearTimeout(this._builderTimer);

    _GameModule.prototype.clean.call(this);
  };

  _proto.craftUnlocked = function craftUnlocked(thing) {
    var state = this.engine.getState();

    if (state.room.crafts[thing]) {
      return true;
    }

    if (state.game.builder.level < 4) {
      return false;
    }

    var craftable = config$1.items[thing];

    if (!craftable.craft) {
      return false;
    }

    if (needsWorkshop(craftable.type) && state.game.buildings.workshop === 0) {
      return false;
    }

    var cost = craftable.craft.cost(state);

    if (state.game.buildings[thing] > 0) {
      this.engine.dispatch(this.engine.actions.room.addCraft({
        name: thing
      }));
      return true;
    }

    if (cost.wood && (state.stores.wood || 0) < cost.wood * 0.5) {
      return false;
    }

    for (var c in cost) {
      if (!state.stores[c]) {
        return false;
      }
    }

    this.engine.dispatch(this.engine.actions.room.addCraft({
      name: thing
    }));

    if (craftable.craft.availableMsg && !state.game.buildings[thing]) {
      this.engine.notify(craftable.craft.availableMsg, GameSpace.Room);
    }

    return true;
  };

  _proto.adjustTemp = function adjustTemp() {
    var state = this.engine.getState();
    var old = state.game.temperature.status;
    var temperature = old;
    var fireStatus = state.game.fire.status;

    if (old.value > 0 && old.value > fireStatus.value) {
      temperature = config$1.Room.TemperatureStatus[_.findKey(config$1.Room.TemperatureStatus, function (temp) {
        return temp.value === temperature.value - 1;
      })];
      this.engine.notify("the room is " + temperature.text, GameSpace.Room, true);
    }

    if (temperature.value < 4 && temperature.value < fireStatus.value) {
      temperature = config$1.Room.TemperatureStatus[_.findKey(config$1.Room.TemperatureStatus, function (temp) {
        return temp.value === temperature.value + 1;
      })];
      this.engine.notify("the room is " + temperature.text, GameSpace.Room, true);
    }

    if (temperature.value != old.value) {
      this.engine.dispatch(this.engine.actions.room.setChanged(true));
      this.engine.dispatch(this.engine.actions.game.temperature.change(temperature));
    }

    this._tempTimer = this.engine.setTimeout(this.adjustTemp.bind(this), config$1.Room.ROOM_WARM_DELAY);
  };

  _proto.onFireChange = function onFireChange(fireStatus) {
    var appState = this.engine.getState();

    if (appState.engine.activeSpace !== GameSpace.Room) {
      this.engine.dispatch(this.engine.actions.room.setChanged(true));
    }

    this.engine.notify("the fire is " + fireStatus.text, GameSpace.Room, true);
    var builderLevel = appState.game.builder.level;

    if (fireStatus.value > config$1.Room.FireStatus.Smoldering.value && builderLevel < 0) {
      this.engine.dispatch(this.engine.actions.game.builder.setM({
        level: 0
      }));
      this.engine.notify(translate('the light from the fire spills from the windows, out into the dark'), GameSpace.Room);
      this.engine.setTimeout(this.updateBuilderState.bind(this), config$1.Room.BUILDER_STATE_DELAY);
    }

    clearTimeout(this._fireTimer);
    this._fireTimer = this.engine.setTimeout(this.coolFire.bind(this), config$1.Room.FIRE_COOL_DELAY);
  };

  _proto.updateBuilderState = function updateBuilderState() {
    if (!this.engine) {
      return;
    }

    var state = this.engine.getState();
    var lBuilder = state.game.builder.level;

    if (lBuilder === 0) {
      this.engine.notify(translate('a ragged stranger stumbles through the door and collapses in the corner'), GameSpace.Room);
      lBuilder = 1;
      this.engine.dispatch(this.engine.actions.game.builder.setM({
        level: 1
      }));
      this.engine.setTimeout(this.unlockForest.bind(this), config$1.Room.NEED_WOOD_DELAY);
    } else if (lBuilder < 3 && state.game.temperature.status.value >= config$1.Room.TemperatureStatus.Warm.value) {
      var msg = '';

      switch (lBuilder) {
        case 1:
          msg = translate('the stranger shivers, and mumbles quietly. her words are unintelligible.');
          break;

        case 2:
          msg = translate('the stranger in the corner stops shivering. her breathing calms.');
          break;
      }

      this.engine.notify(msg, GameSpace.Room);

      if (lBuilder < 3) {
        lBuilder += 1;
        this.engine.dispatch(this.engine.actions.game.builder.setM({
          level: lBuilder
        }));
      }
    }

    if (lBuilder < 3) {
      this.engine.setTimeout(this.updateBuilderState.bind(this), config$1.Room.BUILDER_STATE_DELAY);
    }
  };

  _proto.unlockForest = function unlockForest() {
    this.engine.dispatch(this.engine.actions.stores.setM({
      wood: 4
    }));
    this.engine.dispatch(this.engine.actions.features.location.enableOutside());
    this.engine.notify(translate('the wind howls outside'), GameSpace.Room);
    this.engine.notify(translate('the wood is running out'), GameSpace.Room);
  };

  _proto.startThieves = function startThieves() {
    this.engine.dispatch(this.engine.actions.game.thieves.change(1));
    this.engine.setIncome('thieves', {
      delay: 10,
      stores: {
        wood: -10,
        fur: -5,
        meat: -5
      }
    });
  };

  return Room;
}(GameModule);

operationManager.add({
  id: 'Path.perks',
  name: translate('perks'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();

    if (!(!state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Path)) {
      return false;
    }

    var isExist = false;

    for (var perk in state.character.perks) {
      if (state.character.perks[perk]) {
        isExist = true;
        break;
      }
    }

    return isExist;
  },
  exec: function () {
    var _exec = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(engine) {
      var state, perks, perk;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = engine.getState();
              perks = [];

              for (perk in state.character.perks) {
                if (state.character.perks[perk]) {
                  perks.push({
                    name: perk,
                    desc: Perks[perk].desc
                  });
                }
              }

              return _context.abrupt("return", perks);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function exec(_x) {
      return _exec.apply(this, arguments);
    }

    return exec;
  }(),
  meta: {
    space: GameSpace.Path
  }
});
operationManager.add({
  id: 'Path.embark',
  name: translate('embark'),
  cooldown: function cooldown() {
    return config$1.World.DEATH_COOLDOWN;
  },
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.engine.activeSpace === GameSpace.Path;
  },
  meta: {
    space: GameSpace.Path
  },
  exec: function () {
    var _exec2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(engine) {
      var state, outfit, addStores, k, cloneOutfit, key;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = engine.getState();
              outfit = state.path.outfit;
              addStores = {};

              for (k in state) {
                addStores[k] = -1 * (outfit[k] || 0);
              }

              _context2.next = 6;
              return engine.dispatch(engine.actions.stores.addM(addStores));

            case 6:
              cloneOutfit = {};

              for (key in outfit) {
                if (!!outfit[key]) {
                  cloneOutfit[key] = outfit[key];
                }
              }

              _context2.next = 10;
              return engine.dispatch(engine.actions.game.world.setM({
                outfit: _.cloneDeep(cloneOutfit)
              }));

            case 10:
              _context2.next = 12;
              return engine.travelTo(GameSpace.World);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function exec(_x2) {
      return _exec2.apply(this, arguments);
    }

    return exec;
  }()
});

var Path = /*#__PURE__*/function (_GameModule) {
  _inheritsLoose(Path, _GameModule);

  function Path(engine) {
    var _this;

    _this = _GameModule.call(this, engine) || this;

    _this.engine.observer(function (state) {
      return {
        compass: state.stores.compass,
        pathEnable: state.features.location.Path
      };
    }, function (state) {
      if (state.compass && !state.pathEnable) {
        _this.openPath();
      }
    });

    return _this;
  }

  var _proto = Path.prototype;

  _proto.onArrival = function onArrival() {
    this.updateOutfitting();
  };

  _proto.openPath = /*#__PURE__*/function () {
    var _openPath = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var state;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = this.engine.getState();
              _context.next = 3;
              return this.engine.dispatch(this.engine.actions.features.location.enablePath());

            case 3:
              /* i18n-extract the compass points {dir} */
              this.engine.notify('the compass points ' + state.game.world.dir);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function openPath() {
      return _openPath.apply(this, arguments);
    }

    return openPath;
  }();

  _proto.getWeight = function getWeight(thing) {
    var w = config$1.Path.Weight[thing];
    if (typeof w !== 'number') w = 1;
    return w;
  };

  _proto.getCapacity = function getCapacity() {
    var state = this.engine.getState();

    if (!!state.stores.convoy) {
      return config$1.Path.DEFAULT_BAG_SPACE + 60;
    } else if (!!state.stores.wagon) {
      return config$1.Path.DEFAULT_BAG_SPACE + 30;
    } else if (!!state.stores.rucksack) {
      return config$1.Path.DEFAULT_BAG_SPACE + 10;
    } else {
      return config$1.Path.DEFAULT_BAG_SPACE;
    }
  };

  _proto.getFreeSpace = function getFreeSpace() {
    var state = this.engine.getState();
    var num = 0;

    for (var k in state.path.outfit) {
      var n = state.path.outfit[k] || 0;
      num += n * this.getWeight(k);
    }

    return this.getCapacity() - num;
  };

  _proto.updateOutfitting = function updateOutfitting() {
    var state = this.engine.getState();
    var outfits = Object.keys(NonCraftableCategory).concat(Object.keys(CraftableCategory));
    var outfitChanged = false;
    var setOutfit = {};

    for (var k in outfits) {
      var itemName = k;
      var have = state.stores[itemName] || 0;
      var num = state.path.outfit[itemName] || 0;
      num = typeof num === 'number' ? num : 0;

      if (have < num) {
        num = have;
        outfitChanged = true;
        setOutfit[k] = num;
      }
    }

    if (outfitChanged) {
      this.engine.dispatch(this.engine.actions.path.outfit.setM(setOutfit));
    }
  };

  _proto.increaseSupply = /*#__PURE__*/function () {
    var _increaseSupply = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(supply, count) {
      var state, cur, freeSpace, weight, storeCount, addCount, maxExtraByWeight, maxExtraByStore, _this$engine$actions$;

      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = this.engine.getState();
              cur = state.path.outfit[supply] || 0;
              freeSpace = this.getFreeSpace();
              weight = this.getWeight(supply);
              storeCount = state.stores[supply] || 0;
              addCount = 0;

              if (!(freeSpace >= weight && cur < storeCount)) {
                _context2.next = 14;
                break;
              }

              maxExtraByWeight = Math.floor(freeSpace / weight);
              maxExtraByStore = storeCount - cur;
              addCount = Math.min(count, maxExtraByWeight, maxExtraByStore);

              if (!addCount) {
                _context2.next = 14;
                break;
              }

              _context2.next = 13;
              return this.engine.dispatch(this.engine.actions.path.outfit.addM((_this$engine$actions$ = {}, _this$engine$actions$[supply] = addCount, _this$engine$actions$)));

            case 13:
              this.updateOutfitting();

            case 14:
              return _context2.abrupt("return", cur + addCount);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function increaseSupply(_x, _x2) {
      return _increaseSupply.apply(this, arguments);
    }

    return increaseSupply;
  }();

  _proto.decreaseSupply = /*#__PURE__*/function () {
    var _decreaseSupply = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(supply, count) {
      var state, cur, to, _this$engine$actions$2;

      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = this.engine.getState();
              cur = state.path.outfit[supply] || 0;

              if (!cur) {
                _context3.next = 8;
                break;
              }

              to = Math.max(0, cur - count);

              if (!(cur !== to)) {
                _context3.next = 8;
                break;
              }

              _context3.next = 7;
              return this.engine.dispatch(this.engine.actions.path.outfit.setM((_this$engine$actions$2 = {}, _this$engine$actions$2[supply] = to, _this$engine$actions$2)));

            case 7:
              this.updateOutfitting();

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function decreaseSupply(_x3, _x4) {
      return _decreaseSupply.apply(this, arguments);
    }

    return decreaseSupply;
  }();

  return Path;
}(GameModule);

var _cost$2, _cost2$2;
operationManager.add({
  id: 'Ship.reinforceHull',
  name: translate('reinforce hull'),
  cooldown: function cooldown() {
    return config$1.Ship.ALLOY_PER_HULL;
  },
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.engine.activeSpace === GameSpace.Ship;
  },
  meta: {
    space: GameSpace.Ship,
    cost: (_cost$2 = {}, _cost$2[StoreCategory.alien_alloy] = config$1.Ship.ALLOY_PER_HULL, _cost$2)
  },
  exec: function () {
    var _exec = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(engine) {
      var state;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = engine.getState();

              if (!((state.stores.alien_alloy || 0) < config$1.Ship.ALLOY_PER_HULL)) {
                _context.next = 4;
                break;
              }

              engine.notify(translate('not enough alien alloy'), GameSpace.Ship);
              return _context.abrupt("return", false);

            case 4:
              _context.next = 6;
              return engine.dispatch(engine.actions.stores.addM({
                alien_alloy: -1 * config$1.Ship.ALLOY_PER_HULL
              }));

            case 6:
              _context.next = 8;
              return engine.dispatch(engine.actions.game.spaceShip.addM({
                hull: 1
              }));

            case 8:
              return _context.abrupt("return", true);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function exec(_x) {
      return _exec.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Ship.upgradeEngine',
  name: translate('upgrade engine'),
  cooldown: function cooldown() {
    return config$1.Ship.ALLOY_PER_THRUSTER;
  },
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.engine.activeSpace === GameSpace.Ship;
  },
  meta: {
    space: GameSpace.Ship,
    cost: (_cost2$2 = {}, _cost2$2[StoreCategory.alien_alloy] = config$1.Ship.ALLOY_PER_THRUSTER, _cost2$2)
  },
  exec: function () {
    var _exec2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(engine) {
      var state;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = engine.getState();

              if (!((state.stores.alien_alloy || 0) < config$1.Ship.ALLOY_PER_THRUSTER)) {
                _context2.next = 4;
                break;
              }

              engine.notify(translate('not enough alien alloy'), GameSpace.Ship);
              return _context2.abrupt("return", false);

            case 4:
              _context2.next = 6;
              return engine.dispatch(engine.actions.stores.addM({
                alien_alloy: -1 * config$1.Ship.ALLOY_PER_THRUSTER
              }));

            case 6:
              _context2.next = 8;
              return engine.dispatch(engine.actions.game.spaceShip.addM({
                thrusters: 1
              }));

            case 8:
              return _context2.abrupt("return", true);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function exec(_x2) {
      return _exec2.apply(this, arguments);
    }

    return exec;
  }()
});
operationManager.add({
  id: 'Ship.checkLiftOff',
  name: translate('lift off'),
  cooldown: function cooldown() {
    return 0;
  },
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.engine.activeSpace === GameSpace.Ship;
  },
  meta: {
    space: GameSpace.Ship
  },
  exec: function () {
    var _exec3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(engine) {
      var event;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // const state = engine.getState();
              {
                event = {
                  title: translate('Ready to Leave?'),
                  id: 'ship_check_lift_off',
                  scenes: {
                    start: {
                      text: [translate("time to get out of this place. won't be coming back.")],
                      buttons: {
                        fly: {
                          text: translate('lift off'),
                          onChoose: function onChoose(engine) {
                            engine.dispatch(engine.actions.game.spaceShip.setM({
                              seenWarning: true
                            }));
                            var score = engine.prestige.calculateScore();
                            engine.notify(translate("game end"));
                            /* i18n-extract score for this game: {score} */

                            engine.notify("score for this game: " + score);
                            engine.notify("https://adarkroom.doublespeakgames.com");
                            engine.spaces.Ship.liftOff();
                          },
                          nextScene: 'end'
                        },
                        wait: {
                          text: translate('linger'),
                          onChoose: function onChoose() {},
                          nextScene: 'end'
                        }
                      }
                    }
                  }
                };
                engine.events.addEvent('Ship', event);
                engine.events.startEvent(event);
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function exec(_x3) {
      return _exec3.apply(this, arguments);
    }

    return exec;
  }()
});

var Ship = /*#__PURE__*/function (_GameModule) {
  _inheritsLoose(Ship, _GameModule);

  function Ship(engine) {
    return _GameModule.call(this, engine) || this;
  }

  var _proto = Ship.prototype;

  _proto.onArrival = function onArrival() {
    var state = this.engine.getState();

    if (!state.game.spaceShip.seenShip) {
      this.engine.notify(translate('somewhere above the debris cloud, the wanderer fleet hovers. been on this rock too long.'), GameSpace.Ship);
      this.engine.dispatch(this.engine.actions.game.spaceShip.setM({
        seenShip: true
      }));
    }
  };

  _proto.getMaxHull = function getMaxHull() {
    return this.engine.getState().game.spaceShip.hull || 0;
  };

  _proto.liftOff = function liftOff() {
    this.engine.travelTo(GameSpace.Space);
  };

  return Ship;
}(GameModule);

var Space = /*#__PURE__*/function (_GameModule) {
  _inheritsLoose(Space, _GameModule);

  function Space(engine) {
    return _GameModule.call(this, engine) || this;
  }

  var _proto = Space.prototype;

  _proto.onArrival = function onArrival() {
    this.engine.endGame();
  };

  return Space;
}(GameModule);

var _buildings;
operationManager.add({
  id: 'Outside.checkTraps',
  name: translate('check traps'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.engine.activeSpace === GameSpace.Outside;
  },
  cooldown: function cooldown() {
    return config$1.Outside.TRAPS_DELAY;
  },
  exec: function () {
    var _exec = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(engine) {
      var state, drops, msg, numTraps, numBait, numDrops, i, roll, j, drop, num, s, l, len, baitUsed;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = engine.getState();
              drops = {};
              msg = [];
              numTraps = state.game.buildings.trap || 0;

              if (numTraps) {
                _context.next = 9;
                break;
              }

              engine.notify('not enough trap');
              _context.next = 8;
              return engine.operationExecutor.clearCooldown('Outside.checkTraps');

            case 8:
              return _context.abrupt("return");

            case 9:
              numBait = state.stores.bait || 0;
              numDrops = numTraps + (numBait < numTraps ? numBait : numTraps);
              i = 0;

            case 12:
              if (!(i < numDrops)) {
                _context.next = 28;
                break;
              }

              roll = Math.random();
              _context.t0 = runtime_1.keys(config$1.Outside.TrapDrops);

            case 15:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 25;
                break;
              }

              j = _context.t1.value;
              drop = config$1.Outside.TrapDrops[j];

              if (!(roll < drop.rollUnder)) {
                _context.next = 23;
                break;
              }

              num = drops[drop.name];

              if (typeof num == 'undefined') {
                num = 0;
                msg.push(drop.message);
              }

              drops[drop.name] = num + 1;
              return _context.abrupt("break", 25);

            case 23:
              _context.next = 15;
              break;

            case 25:
              i++;
              _context.next = 12;
              break;

            case 28:
              /// TRANSLATORS : Mind the whitespace at the end.

              /* i18n-extract the traps contain {item1} */

              /* i18n-extract the traps contain {item1} and {item2} */

              /* i18n-extract the traps contain {item1}, {item2} and {item3} */

              /* i18n-extract the traps contain {item1}, {item2}, {item3} and {item4} */

              /* i18n-extract the traps contain {item1}, {item2}, {item3}, {item4} and {item5} */

              /* i18n-extract the traps contain {item1}, {item2}, {item3}, {item4}, {item5} and {item6} */
              s = 'the traps contain ';

              for (l = 0, len = msg.length; l < len; l++) {
                if (len > 1 && l > 0 && l < len - 1) {
                  s += ", ";
                } else if (len > 1 && l == len - 1) {
                  /// TRANSLATORS : Mind the whitespaces at the beginning and end.
                  s += " and ";
                }

                s += msg[l];
              }

              baitUsed = numBait < numTraps ? numBait : numTraps;
              drops['bait'] = -baitUsed;
              engine.notify(s, GameSpace.Outside);
              _context.next = 35;
              return engine.dispatch(engine.actions.stores.addM(drops));

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function exec(_x) {
      return _exec.apply(this, arguments);
    }

    return exec;
  }(),
  meta: {
    buildings: (_buildings = {}, _buildings[Building.trap] = 1, _buildings),
    space: GameSpace.Outside
  }
});
operationManager.add({
  id: 'Outside.gatherWood',
  name: translate('gather wood'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return state.engine.activeSpace === GameSpace.Outside;
  },
  cooldown: function cooldown() {
    return config$1.Outside.GATHER_DELAY;
  },
  exec: function () {
    var _exec2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(engine) {
      var state, gatherAmt;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              engine.notify(translate("dry brush and dead branches litter the forest floor"), GameSpace.Outside);
              state = engine.getState();
              gatherAmt = !!state.game.buildings.cart ? 50 : 10;
              _context2.next = 5;
              return engine.dispatch(engine.actions.stores.addM({
                wood: gatherAmt
              }));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function exec(_x2) {
      return _exec2.apply(this, arguments);
    }

    return exec;
  }(),
  meta: {
    space: GameSpace.Outside
  }
});
operationManager.add({
  id: 'Outside.building',
  name: translate("Buildings"),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();

    if (state.engine.activeSpace !== GameSpace.Outside) {
      return false;
    }

    var existBuilding = false;
    var storeNames = Object.keys(state.stores);

    for (var i = 0, len = storeNames.length; i < len; i++) {
      var name = storeNames[i];

      if (state.stores[name] && config$1.items[name] && config$1.items[name].type === 'building') {
        existBuilding = true;
        break;
      }
    }

    return existBuilding;
  },
  exec: function () {
    var _exec3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(engine) {
      var state, storeNames, buildings, i, len, name, count;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = engine.getState();
              storeNames = Object.keys(state.stores);
              buildings = [];

              for (i = 0, len = storeNames.length; i < len; i++) {
                name = storeNames[i];
                count = state.stores[name];

                if (count && config$1.items[name] && config$1.items[name].type === 'building') {
                  buildings.push({
                    name: name,
                    count: count,
                    info: config$1.items[name]
                  });
                }
              }

              return _context3.abrupt("return", buildings);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function exec(_x3) {
      return _exec3.apply(this, arguments);
    }

    return exec;
  }(),
  meta: {
    space: GameSpace.Outside
  }
});

var Outside = /*#__PURE__*/function (_GameModule) {
  _inheritsLoose(Outside, _GameModule);

  function Outside(engine) {
    var _this;

    _this = _GameModule.call(this, engine) || this;
    _this._popTimeout = null;

    _this.unsubBuilding = function () {};

    _this.updateVillageIncome();

    _this.schedulePopIncrease();

    _this.unsubBuilding = engine.observer(function (state) {
      return state.game.buildings;
    }, function () {
      _this.enableBuildingWorker();
    });
    return _this;
  }

  var _proto = Outside.prototype;

  _proto.onArrival = function onArrival() {
    var state = this.engine.getState();

    if (!state.game.outside.seenForest) {
      this.engine.notify(translate('the sky is grey and the wind blows relentlessly'), GameSpace.Outside);
      this.engine.dispatch(this.engine.actions.game.outside.setM({
        seenForest: true
      }));
    }
  };

  _proto.increaseWorker = function increaseWorker(worker, count) {
    var gatherCount = this.getNumGatherers();

    if (gatherCount > 0) {
      var _this$engine$actions$;

      var increaseAmt = Math.min(gatherCount, count);
      log('increasing ' + worker + ' by ' + increaseAmt);
      this.engine.dispatch(this.engine.actions.game.workers.addM((_this$engine$actions$ = {}, _this$engine$actions$[worker] = increaseAmt, _this$engine$actions$)));
    }
  };

  _proto.getTitle = function getTitle() {
    var numHuts = this.engine.getState().game.buildings.hut || 0;
    var title;

    if (numHuts === 0) {
      title = translate("A Silent Forest");
    } else if (numHuts == 1) {
      title = translate("A Lonely Hut");
    } else if (numHuts <= 4) {
      title = translate("A Tiny Village");
    } else if (numHuts <= 8) {
      title = translate("A Modest Village");
    } else if (numHuts <= 14) {
      title = translate("A Large Village");
    } else {
      title = translate("A Raucous Village");
    }

    return title;
  };

  _proto.decreaseWorker = function decreaseWorker(worker, count) {
    var state = this.engine.getState();
    var existCount = state.game.workers[worker] || 0;

    if (existCount > 0) {
      var _this$engine$actions$2;

      var decreaseAmt = Math.min(existCount, count);
      log('decreasing ' + worker + ' by ' + decreaseAmt);
      this.engine.dispatch(this.engine.actions.game.workers.addM((_this$engine$actions$2 = {}, _this$engine$actions$2[worker] = decreaseAmt * -1, _this$engine$actions$2)));
    }
  };

  _proto.clean = function clean() {
    clearTimeout(this._popTimeout);
    this.unsubBuilding();

    _GameModule.prototype.clean.call(this);
  };

  _proto.destroyHuts = /*#__PURE__*/function () {
    var _destroyHuts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(count, allowEmpty) {
      var state, dead, lastHut, hut, i, population, rate, full, huts, target, inhabitants;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = this.engine.getState();
              dead = 0;
              lastHut = state.game.buildings.hut;
              hut = lastHut;
              i = 0;

            case 5:
              if (!(i < count)) {
                _context.next = 20;
                break;
              }

              population = state.game.population.value;
              rate = population / config$1.Outside.HUT_ROOM;
              full = Math.floor(rate);
              huts = allowEmpty ? hut : Math.ceil(rate);

              if (huts) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("break", 20);

            case 12:
              target = Math.floor(Math.random() * huts) + 1;
              inhabitants = 0;

              if (target <= full) {
                inhabitants = config$1.Outside.HUT_ROOM;
              } else if (target === full + 1) {
                inhabitants = population % config$1.Outside.HUT_ROOM;
              }

              hut--;

              if (inhabitants) {
                dead += inhabitants;
              }

            case 17:
              i++;
              _context.next = 5;
              break;

            case 20:
              if (!dead) {
                _context.next = 23;
                break;
              }

              _context.next = 23;
              return this.killVillagers(dead);

            case 23:
              if (!(hut !== lastHut)) {
                _context.next = 26;
                break;
              }

              _context.next = 26;
              return this.engine.dispatch(this.engine.actions.game.buildings.setM({
                hut: hut
              }));

            case 26:
              return _context.abrupt("return", {
                dead: dead,
                destroyHut: hut - lastHut
              });

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function destroyHuts(_x, _x2) {
      return _destroyHuts.apply(this, arguments);
    }

    return destroyHuts;
  }();

  _proto.killVillagers = /*#__PURE__*/function () {
    var _killVillagers = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(count) {
      var state, last_population, population, remaining, changed, gap, k, numWorkers;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = this.engine.getState();
              last_population = state.game.population.value;
              population = last_population - count * -1;

              if (population < 0) {
                population = 0;
              }

              if (!(population !== last_population)) {
                _context2.next = 7;
                break;
              }

              _context2.next = 7;
              return this.engine.dispatch(this.engine.actions.game.population.setM({
                value: population
              }));

            case 7:
              remaining = this.getNumGatherers();
              changed = {};

              if (!(remaining < 0)) {
                _context2.next = 25;
                break;
              }

              gap = -remaining;
              _context2.t0 = runtime_1.keys(state.game.workers);

            case 12:
              if ((_context2.t1 = _context2.t0()).done) {
                _context2.next = 24;
                break;
              }

              k = _context2.t1.value;
              numWorkers = _.get(state.game.workers, k, 0);

              if (!(numWorkers < gap)) {
                _context2.next = 20;
                break;
              }

              gap -= numWorkers;
              changed[k] = 0;
              _context2.next = 22;
              break;

            case 20:
              changed[k] = numWorkers + gap * -1;
              return _context2.abrupt("break", 24);

            case 22:
              _context2.next = 12;
              break;

            case 24:
              if (!_.isPlainObject(changed)) {
                this.engine.dispatch(this.engine.actions.game.workers.setM(changed));
              }

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function killVillagers(_x3) {
      return _killVillagers.apply(this, arguments);
    }

    return killVillagers;
  }();

  _proto.getNumGatherers = function getNumGatherers() {
    var state = this.engine.getState();
    var num = state.game.population.value;

    for (var k in state.game.workers) {
      num -= _.get(state.game.workers, k, 0);
    }

    return num;
  };

  _proto.getMaxPopulation = function getMaxPopulation() {
    var state = this.engine.getState();
    return (state.game.buildings.hut || 0) * config$1.Outside.HUT_ROOM;
  };

  _proto.schedulePopIncrease = function schedulePopIncrease() {
    var nextIncrease = Math.floor(Math.random() * (config$1.Outside.POP_DELAY[1] - config$1.Outside.POP_DELAY[0])) + config$1.Outside.POP_DELAY[0];
    log('next population increase scheduled in ' + nextIncrease + ' minutes');
    this._popTimeout = this.engine.setTimeout(this.increasePopulation.bind(this), nextIncrease * 60 * 1000);
  };

  _proto.increasePopulation = function increasePopulation() {
    var state = this.engine.getState();

    if (state.features.location.Outside) {
      var space = this.getMaxPopulation() - state.game.population.value;

      if (space > 0) {
        var num = Math.floor(Math.random() * (space / 2) + space / 2);
        if (num === 0) num = 1;
        var msg;

        if (num == 1) {
          msg = translate('a stranger arrives in the night');
        } else if (num < 5) {
          msg = translate('a weathered family takes up in one of the huts.');
        } else if (num < 10) {
          msg = translate('a small group arrives, all dust and bones.');
        } else if (num < 30) {
          msg = translate('a convoy lurches in, equal parts worry and hope.');
        } else {
          msg = translate("the town's booming. word does get around.");
        }

        this.engine.notify(msg);
        log('population increased by ' + num);
        this.engine.dispatch(this.engine.actions.game.population.addM({
          value: num
        }));
      }
    }

    this.schedulePopIncrease();
  };

  _proto.enableBuildingWorker = function enableBuildingWorker() {
    var state = this.engine.getState();
    var jobMap = {
      'lodge': ['hunter', 'trapper'],
      'tannery': ['tanner'],
      'smokehouse': ['charcutier'],
      'iron mine': ['iron miner'],
      'coal mine': ['coal miner'],
      'sulphur mine': ['sulphur miner'],
      'steelworks': ['steelworker'],
      'armoury': ['armourer']
    };
    var added = false;

    for (var name in state.game.buildings) {
      if (name !== 'trap') {
        var jobs = jobMap[name];

        if (jobs) {
          for (var i = 0, len = jobs.length; i < len; i++) {
            var job = jobs[i];

            if (typeof state.game.buildings[name] !== 'undefined' && typeof state.game.workers[job] === 'undefined') {
              var _this$engine$actions$3;

              this.engine.dispatch(this.engine.actions.game.workers.setM((_this$engine$actions$3 = {}, _this$engine$actions$3[job] = 0, _this$engine$actions$3)));
              added = true;
            }
          }
        }
      }
    }

    return added;
  };

  _proto.updateVillageIncome = function updateVillageIncome() {
    var state = this.engine.getState();

    for (var worker in config$1.Outside.INCOME) {
      var income = config$1.Outside.INCOME[worker];
      var num = worker == 'gatherer' ? this.getNumGatherers() : state.game.workers[worker] || 0;

      if (typeof num === 'number') {
        var stores = {};

        if (num < 0) {
          num = 0;
        }

        var needsUpdate = false;
        var curIncome = this.engine.getIncome(worker);

        for (var store in income.stores) {
          stores[store] = (income.stores[store] || 0) * num;

          if (curIncome[store] !== stores[store]) {
            needsUpdate = true;
          }
        }

        if (needsUpdate) {
          this.engine.setIncome(worker, {
            delay: income.delay,
            stores: stores
          });
        }
      }
    }
  };

  return Outside;
}(GameModule);

var Prestige = /*#__PURE__*/function (_GameModule) {
  _inheritsLoose(Prestige, _GameModule);

  function Prestige(engine) {
    return _GameModule.call(this, engine) || this;
  }

  var _proto = Prestige.prototype;

  _proto.collectStores = function collectStores() {
    var _this$engine$store, _this$engine2, _this$engine2$store;

    var state = (_this$engine$store = this.engine.store) == null ? void 0 : _this$engine$store.getState();
    var prevStores = state.previous.stores;

    if (prevStores && prevStores.length > 0) {
      var _this$engine, _this$engine$store2;

      var toAdd = {};

      for (var i in config$1.Prestige.storesMap) {
        var s = config$1.Prestige.storesMap[i];
        toAdd[s.store.toString()] = prevStores[i];
      }

      (_this$engine = this.engine) == null ? void 0 : (_this$engine$store2 = _this$engine.store) == null ? void 0 : _this$engine$store2.dispatch(this.engine.actions.stores.addM(toAdd));
    }

    (_this$engine2 = this.engine) == null ? void 0 : (_this$engine2$store = _this$engine2.store) == null ? void 0 : _this$engine2$store.dispatch(this.engine.actions.previous.setM({
      stores: []
    }));
  };

  _proto.save = function save() {
    var _this$engine$store3;

    var stores = this.getStores(true);
    var score = this.totalScore();
    (_this$engine$store3 = this.engine.store) == null ? void 0 : _this$engine$store3.dispatch(this.engine.actions.previous.setM({
      stores: stores,
      score: score
    }));
  };

  _proto.totalScore = function totalScore() {
    var _this$engine$store4;

    var state = (_this$engine$store4 = this.engine.store) == null ? void 0 : _this$engine$store4.getState();
    return ((state == null ? void 0 : state.previous.score) || 0) + this.calculateScore();
  };

  _proto.calculateScore = function calculateScore() {
    var _this$engine$store5;

    var state = (_this$engine$store5 = this.engine.store) == null ? void 0 : _this$engine$store5.getState();
    var scoreUnadded = this.getStores(false);
    var fullScore = 0;
    var factor = [1, 1.5, 1, 2, 2, 3, 3, 2, 2, 2, 2, 1.5, 1, 1, 10, 30, 50, 100, 150, 150, 3, 3, 5, 4];

    for (var i = 0; i < factor.length; i++) {
      fullScore += scoreUnadded[i] * factor[i];
    }

    fullScore = fullScore + ((state == null ? void 0 : state.stores.alien_alloy) || 0) * 10;
    fullScore = fullScore + state.game.spaceShip.hull * 50;
    return Math.floor(fullScore);
  };

  _proto.getStores = function getStores(reduce) {
    var state = this.engine.store.getState();
    var stores = [];

    for (var i in config$1.Prestige.storesMap) {
      var s = config$1.Prestige.storesMap[i];
      stores.push(Math.floor((state.stores[s.store] || 0) / (reduce ? this.randGen(s.type) : 1)));
    }

    return stores;
  };

  _proto.randGen = function randGen(storeType) {
    var amount;

    switch (storeType) {
      case 'g':
        amount = Math.floor(Math.random() * 10);
        break;

      case 'w':
        amount = Math.floor(Math.floor(Math.random() * 10) / 2);
        break;

      case 'a':
        amount = Math.ceil(Math.random() * 10 * Math.ceil(Math.random() * 10));
        break;

      default:
        return 1;
    }

    if (amount !== 0) {
      return amount;
    }

    return 1;
  };

  return Prestige;
}(GameModule);

operationManager.add({
  id: 'Engine.travelTo',
  name: translate('travel to'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    var activeCount = 0;
    Object.keys(state.features.location).forEach(function (location) {
      if (state.features.location[location]) {
        activeCount++;
      }
    });
    return !state.engine.activeSubSpace && activeCount > 1 && state.engine.activeSpace !== GameSpace.World && state.engine.activeSpace !== GameSpace.Space;
  },
  exec: function () {
    var _exec = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(engine, _, space) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return engine.travelTo(space);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function exec(_x, _x2, _x3) {
      return _exec.apply(this, arguments);
    }

    return exec;
  }(),
  help: function help(engine) {
    var state = engine.getState();
    var locations = [];
    Object.keys(state.features.location).forEach(function (location) {
      if (state.features.location[location]) {
        locations.push(location);
      }
    });
    return {
      desc: "travel to " + locations.join(', '),
      parms: [locations]
    };
  }
});
operationManager.add({
  id: 'Engine.SubSpace.back',
  name: translate('Back'),
  isAvailable: function isAvailable(engine) {
    var state = engine.getState();
    return !!state.engine.activeSubSpace;
  },
  meta: {},
  exec: function () {
    var _exec2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(engine) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return engine.travelToSubSpace('');

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function exec(_x4) {
      return _exec2.apply(this, arguments);
    }

    return exec;
  }()
});

var Engine = /*#__PURE__*/function () {
  function Engine(options) {
    this.GAME_OVER = false;
    this.options = {
      debug: false,
      doubleTime: false
    };
    this.actions = actions$v;
    this.paused = false;
    this._incomeTimeout = null;
    Object.assign(this.options, options || {});
    config$2({
      enable: this.options.debug
    });
    this.operationExecutor = new OperationExecutor(this, operationManager);
    this.startGame(options == null ? void 0 : options.state);
  }

  var _proto = Engine.prototype;

  _proto.notify = function notify(text, space, noQueue) {
    var _this$store;

    (_this$store = this.store) == null ? void 0 : _this$store.dispatch(this.actions.notifications.notify({
      message: {
        text: translate(text),
        module: space
      },
      noQueue: noQueue
    }));
  };

  _proto.dispatch = /*#__PURE__*/function () {
    var _dispatch = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(action) {
      var res;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.store.dispatch(action);

            case 2:
              res = _context.sent;
              return _context.abrupt("return", res);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function dispatch(_x7) {
      return _dispatch.apply(this, arguments);
    }

    return dispatch;
  }();

  _proto.operation = /*#__PURE__*/function () {
    var _operation = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(operationId, data) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.operationExecutor.exec(operationId, data);

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function operation(_x8, _x9) {
      return _operation.apply(this, arguments);
    }

    return operation;
  }();

  _proto.operations = function operations() {
    return this.operationExecutor.availableOperations();
  };

  _proto.startGame = function startGame(state) {
    var _this$spaces;

    // this.clean();
    this.GAME_OVER = false;
    this.paused = false;
    this.loadGame(state);
    this.events = new Events(this);
    this.spaces = (_this$spaces = {}, _this$spaces[GameSpace.World] = new World(this), _this$spaces[GameSpace.Room] = new Room(this), _this$spaces[GameSpace.Outside] = new Outside(this), _this$spaces[GameSpace.Path] = new Path(this), _this$spaces[GameSpace.Ship] = new Ship(this), _this$spaces[GameSpace.Space] = new Space(this), _this$spaces);
    this.prestige = new Prestige(this);
    this._incomeTimeout = this.setTimeout(this.collectIncome.bind(this), 1000);
    var gameState = this.getState();

    if (!(gameState != null && gameState.engine.activeSpace)) {
      this.travelTo(GameSpace.Room, true);
    } else {
      this.travelTo(gameState == null ? void 0 : gameState.engine.activeSpace, true);
    }
  };

  _proto.clean = function clean() {
    var _this = this;

    if (!this.events) {
      return;
    }

    clearTimeout(this._incomeTimeout);
    this.events.clean();
    Object.keys(this.spaces).forEach(function (space) {
      _this.spaces[space].clean();
    });
    this.prestige.clean();
  };

  _proto.endGame = function endGame() {
    if (this.GAME_OVER) {
      return;
    }

    this.GAME_OVER = true;
    this.clean();
  };

  _proto.addToStore = function addToStore(toAdd) {
    this.dispatch(this.actions.stores.addM(toAdd));
  };

  _proto.setToStore = function setToStore(toSet) {
    this.dispatch(this.actions.stores.setM(toSet));
  };

  _proto.observer = function observer(select, onChange) {
    var currentState;
    var store = this.store;

    function handleChange() {
      var nextState = select(store.getState());

      if (!_.isEqual(nextState, currentState)) {
        currentState = nextState;
        onChange(currentState);
      }
    }

    var unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  };

  _proto.getIncome = function getIncome(source) {
    var state = this.getState();
    return _.get(state.income, source, {});
  };

  _proto.setIncome = function setIncome(source, options) {
    var _this$actions$income$;

    var state = this.getState();

    var exist = _.get(state.income, source);

    if (exist) {
      options.timeLeft = exist.timeLeft;
    }

    this.dispatch(this.actions.income.setM((_this$actions$income$ = {}, _this$actions$income$[source] = options, _this$actions$income$)));
  };

  _proto.pauseGame = function pauseGame() {
    this.paused = true;
    this.clean();
  };

  _proto.continueGame = function continueGame() {
    var _this$store2;

    this.paused = false;
    this.startGame((_this$store2 = this.store) == null ? void 0 : _this$store2.getState());
  };

  _proto.saveGame = function saveGame() {};

  _proto.getActionSpace = function getActionSpace() {
    var _this$store3;

    return (_this$store3 = this.store) == null ? void 0 : _this$store3.getState().engine.activeSpace;
  };

  _proto.getState = function getState() {
    return this.store.getState();
  };

  _proto.switchLanguage = function switchLanguage() {};

  _proto.travelTo = /*#__PURE__*/function () {
    var _travelTo = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(space, force) {
      var activeSpace, _this$store4;

      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              activeSpace = this.getActionSpace();

              if (!(activeSpace !== space || force)) {
                _context3.next = 7;
                break;
              }

              _context3.next = 4;
              return this.travelToSubSpace('');

            case 4:
              _context3.next = 6;
              return (_this$store4 = this.store) == null ? void 0 : _this$store4.dispatch(this.actions.engine.changeSpace(space));

            case 6:
              this.spaces[space].onArrival();

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function travelTo(_x10, _x11) {
      return _travelTo.apply(this, arguments);
    }

    return travelTo;
  }();

  _proto.travelToSubSpace = /*#__PURE__*/function () {
    var _travelToSubSpace = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(space) {
      var _this$store5;

      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (_this$store5 = this.store) == null ? void 0 : _this$store5.dispatch(this.actions.engine.changeSubSpace(space));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function travelToSubSpace(_x12) {
      return _travelToSubSpace.apply(this, arguments);
    }

    return travelToSubSpace;
  }();

  _proto.getGuid = function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  _proto.setTimeout = /*#__PURE__*/function (_setTimeout) {
    function setTimeout(_x, _x2, _x3) {
      return _setTimeout.apply(this, arguments);
    }

    setTimeout.toString = function () {
      return _setTimeout.toString();
    };

    return setTimeout;
  }(function (callback, timeout, skipDouble) {
    if (this.options.doubleTime && !skipDouble) {
      log('Double time, cutting timeout in half');
      timeout /= 2;
    }

    return setTimeout(callback, timeout);
  });

  _proto.setInterval = /*#__PURE__*/function (_setInterval) {
    function setInterval(_x4, _x5, _x6) {
      return _setInterval.apply(this, arguments);
    }

    setInterval.toString = function () {
      return _setInterval.toString();
    };

    return setInterval;
  }(function (callback, interval, skipDouble) {
    if (this.options.doubleTime && !skipDouble) {
      log('Double time, cutting timeout in half');
      interval /= 2;
    }

    return setInterval(callback, interval);
  });

  _proto.loadGame = function loadGame(state) {
    this.store = createState(this, state);
  };

  _proto.collectIncome = function collectIncome() {
    var changed = false;
    var incomeStores = [];

    var state = _.cloneDeep(this.getState());

    if (state.engine.activeSpace !== GameSpace.Space) {
      for (var source in state.income) {
        var income = state.income[source];

        if (!income) {
          continue;
        }

        if (typeof income.timeLeft !== 'number') {
          income.timeLeft = 0;
        }

        income.timeLeft--;

        if (income.timeLeft <= 0) {
          log('collection income from ' + source);

          if (source === 'thieves') {
            this.addStolen(income.stores);
          }

          var cost = income.stores;
          var ok = true;

          if (source !== 'thieves') {
            for (var k in cost) {
              var have = state.stores[k] || 0;

              if (have + cost[k] < 0) {
                ok = false;
                break;
              }
            }
          }

          if (ok) {
            incomeStores.push(income.stores);
          }

          changed = true;

          if (typeof income.delay == 'number') {
            income.timeLeft = income.delay;
          }
        }
      }
    }

    if (changed) {
      var addStores = {};
      incomeStores.forEach(function (store) {
        Object.keys(store).forEach(function (key) {
          var addCount = addStores[key] || 0 + store[key] || 0;

          if (addCount) {
            addStores[key] = addStores[key] || 0 + store[key] || 0;
          }
        });
      });
      this.dispatch(this.actions.stores.addM(addStores));
    }

    this.dispatch(this.actions.income.setM(state.income));
    this._incomeTimeout = this.setTimeout(this.collectIncome.bind(this), 1000);
  };

  _proto.addStolen = function addStolen(stores) {
    var state = this.getState();
    var addStores = {};

    for (var k in stores) {
      var old = state.stores[k] || 0;

      var _short = old + stores[k]; //if they would steal more than actually owned


      if (_short < 0) {
        addStores[k] = stores[k] * -1 + _short;
      } else {
        addStores[k] = stores[k] * -1;
      }
    }

    this.dispatch(this.actions.game.stolen.addM(addStores));
  };

  return Engine;
}();

_.templateSettings.interpolate = /{([\s\S]+?)}/;
var translation = /*#__PURE__*/new Polyglot();
var superInterpolation = [];
var cache = {};
var R_Match_Super_Interpolcation_raw = /\\{\w+\\}/g;

function escapeStringRegexp(string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

function setTranslation(strings) {
  translation = new Polyglot();
  translation.extend(strings);
  superInterpolation = [];
  cache = {};
  Object.keys(strings).forEach(function (key) {
    var r = /{(.+?)}/g;
    var match = r.exec(key);
    var keys = [];

    while (match) {
      keys.push(match[1]);
      match = r.exec(key);
    }

    if (keys.length > 0) {
      var reg = escapeStringRegexp(key).replace(R_Match_Super_Interpolcation_raw, '(.+?)');
      superInterpolation.push({
        match: new RegExp("^" + reg + "$"),
        interpolcation: function interpolcation(template, templateKeys, keys) {
          var ctx = {};
          templateKeys.forEach(function (key, index) {
            ctx[key] = translate$1(keys[index]);
          });
          return template.replace(/{(.+?)}/g, function (_, key) {
            return typeof ctx[key] === 'undefined' ? key : ctx[key];
          });
        },
        template: strings[key],
        keys: keys
      });
    }
  });
  superInterpolation.sort(function (a, b) {
    return b.template.length - a.template.length;
  });
}
function translate$1(text, options) {
  if (cache[text]) {
    return cache[text];
  }

  if (!isNaN(Number(text))) {
    return text;
  }

  if (config$1.items[text]) {
    text = config$1.items[text].name;
  } else if (config$1.Outside.INCOME[text]) {
    text = config$1.Outside.INCOME[text].name;
  } else {
    for (var i = 0, len = superInterpolation.length; i < len; i++) {
      var tester = superInterpolation[i];
      var match = tester.match.exec(text);
      tester.match.lastIndex = 0;

      if (match) {
        var _res = tester.interpolcation(tester.template, tester.keys, match.slice(1));

        cache[text] = _res;
        return _res;
      }
    }
  }

  var res = translation.t(text, options);
  cache[text] = res;
  return res;
}

export { Building, Craftable, CraftableCategory, Engine, GameSpace, PerkCategory, Perks, StoreCategory, TradeCategory, WeaponCategory, WorkerType, config$1 as config, incomes, setTranslation, translate$1 as translate };
//# sourceMappingURL=adarkroom-core.esm.js.map
