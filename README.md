# Snappy.Kit

[![npm version](https://img.shields.io/npm/v/snappykit.svg)](https://www.npmjs.com/package/snappykit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Website
[Website](https://snappykit.priveted.com)
[Guide](https://snappykit.priveted.com/guide/)
[API](https://snappykit.priveted.com/api/)

#### Русская версия
[Сайт](https://snappykit.priveted.com/ru/)
[Руководство](https://snappykit.priveted.com/ru/guide/)
[API](https://snappykit.priveted.com/ru/api/)

**Snappy.Kit** is a lightweight, zero-dependency TypeScript utility library for working with the DOM, primitives (strings and numbers), events, HTML, and more. Designed for component-based development without the overhead of a framework.

---

## Installation

```bash
npm install snappykit
```

---

## Import

All utilities are organized into logical modules. Import directly from the package:

```typescript
import {
  css,
  addClass,
  make,
  show, // DOM
  on,
  off,
  rebind, // Events
  formatBytes,
  toCamelCase, // Primitives (String and Number Utils)
  parseHtml,
  escapeHtml, // HTML
  createStore, // Store
  // ...
} from 'snappykit';
```

---

## License

[MIT](https://opensource.org/licenses/MIT)
