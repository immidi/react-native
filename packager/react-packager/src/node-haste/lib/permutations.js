/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

/**
 *
 * @param options {Array.<*>}
 * @returns {Array.<Array.<*>>}
 */
function permutations(options) {
  const results = [];
  function permute(arr, memory) {
    const memo = memory || [];
    let cur;
    for (let i = 0; i < arr.length; ++i) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }
    return results;
  }
  return permute(options);
}

module.exports = permutations;