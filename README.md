# Super PostCSS [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

> Now you’re playing with [PostCSS] — [Super PostCSS]!

```bash
npm install super-postcss
```

[Super PostCSS] is an experimental CSS parser that combines [PostCSS],
[PostCSS Values Parser], and [PostCSS Selector Parser] and introduces a new
way to write plugins that run simultaniously.

```js
const superPostCSS = require('super-postcss');

superPostCSS({
  CustomSpacingDeclaration(node, result) {
    node.prop = 'margin';
    return result.refresh(node);
  },
  pxNumber(node, result) {
    if (node.value === '0') {
      node.unit = '';

      return result.refresh(node);
    }
  }
}).use({
  declaration(node, result) {
    if (node.prop === 'spacing') {
      node.prop = '-custom-spacing';
      return result.refresh(node);
    }
  }
}).process('body { spacing: 0px; }', { from: '<stdin>' }).then(
  ({ css }) => console.log(css) // body { margin: 0; }
);
```

[Super PostCSS] lets you add listener-style functions that respond to specific
nodes in the CSS Tree.

### rule

Any rule or at-rule.

### customRule

A select at-rule, where `custom` is the name of an at-rule.

### declaration

Any declaration.

### customDeclaration

A select declaration, where `custom` is the property name of a declaration.

### selector

Any selector in a selector list.

### value

Any value in a declaration value.

### number

Any number in a declaration value.

### customNumber

A select number in a declaration value, where `custom` is the unit of the
number.

[cli-img]: https://img.shields.io/travis/csstools/super-postcss.svg
[cli-url]: https://travis-ci.org/csstools/super-postcss
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/super-postcss.svg
[npm-url]: https://www.npmjs.com/package/super-postcss

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Values Parser]: https://github.com/shellscape/postcss-values-parser
[PostCSS Selector Parser]: https://github.com/postcss/postcss-selector-parser
[Super PostCSS]: https://github.com/csstools/super-postcss
