/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

jest.dontMock('../getExtensions');

var getPlatformExtension = require('../getExtensions').getPlatformExtension;
var getInfixExtension = require('../getExtensions').getInfixExtension;

describe('getPlatformExtension', function() {
  it('should get platform ext', function() {
    expect(getPlatformExtension('a.ios.js')).toBe('ios');
    expect(getPlatformExtension('a.android.js')).toBe('android');
    expect(getPlatformExtension('/b/c/a.ios.js')).toBe('ios');
    expect(getPlatformExtension('/b/c.android/a.ios.something.js')).toBe('ios');
    expect(getPlatformExtension('/b/c/a@1.5x.ios.png')).toBe('ios');
    expect(getPlatformExtension('/b/c/a@1.5x.lol.png')).toBe(null);
    expect(getPlatformExtension('/b/c/a.lol.png')).toBe(null);
  });

  it('should optionally accept supported platforms', function() {
    expect(getPlatformExtension('a.ios.js', new Set(['ios']))).toBe('ios');
    expect(getPlatformExtension('a.android.js', new Set(['android']))).toBe('android');
    expect(getPlatformExtension('/b/c/a.ios.js', new Set(['ios', 'android']))).toBe('ios');
    expect(getPlatformExtension('a.ios.js', new Set(['ubuntu']))).toBe(null);
    expect(getPlatformExtension('a.ios.js', new Set([null]))).toBe(null);
    expect(getPlatformExtension('a.ubuntu.js', new Set(['ubuntu']))).toBe('ubuntu');
  });

  it('should get infix ext', function() {
    expect(getInfixExtension('a.b.js', ['b'])).toBe('b');
    expect(getInfixExtension('a.b.js', ['a', 'b'])).toBe('b');
    expect(getInfixExtension('/b/c/a.e.js', ['e'])).toBe('e');
    expect(getInfixExtension('/b/c.android/a.e.js', ['e'])).toBe('e');
    expect(getInfixExtension('/b/c/a@1.5x.e.png', ['e'])).toBe('e');
    expect(getInfixExtension('/b/c/a@1.5x.lol.png', ['e'])).toBe(null);
    expect(getInfixExtension('/b/c/a.lol.png')).toBe(null);
  });
});
