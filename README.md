# Snappy.Kit

[![npm version](https://badge.fury.io/js/snappykit.svg)](https://badge.fury.io/js/snappykit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Snappy.Kit** is a lightweight, zero-dependency TypeScript utility library for working with the DOM, strings, events, and more. Designed for component-based development without the overhead of a framework.

## Installation

```bash
npm install snappykit
```

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
  toCamelCase, // String utilities
  parseHtml,
  escapeHtml, // Html
  // ...
} from 'snappykit';
```

## API Reference

### String Utilities

Functions for string validation, transformation, and formatting.

| Method          | Arguments                                                                      | Return    | Description                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isEmptyString` | `(str: string \| null \| undefined)`                                           | `boolean` | Returns `true` if the string is empty, `null`, `undefined`, or contains only whitespace/invisible characters (zero-width spaces, BOM, etc.).                         |
| `isNullOrEmpty` | `(str: string \| null \| undefined)`                                           | `boolean` | Returns `true` if the string is `null`, `undefined`, or `""`.                                                                                                        |
| `isWhitespace`  | `(str: string)`                                                                | `boolean` | Returns `true` if the string is not empty but consists entirely of whitespace.                                                                                       |
| `upper`         | `(str: string)`                                                                | `string`  | Converts the entire string to uppercase.                                                                                                                             |
| `lower`         | `(str: string)`                                                                | `string`  | Converts the entire string to lowercase.                                                                                                                             |
| `upperFirst`    | `(str: string)`                                                                | `string`  | Converts the first character to uppercase, leaving the rest unchanged.                                                                                               |
| `lowerFirst`    | `(str: string)`                                                                | `string`  | Converts the first character to lowercase, leaving the rest unchanged.                                                                                               |
| `replaceAll`    | `(find: string, replace: string, str: string)`                                 | `string`  | Replaces all occurrences of `find` with `replace` (no regex, uses split-join).                                                                                       |
| `truncate`      | `(str: string, maxLength: number, suffix?: string, cutFromStart?: boolean)`    | `string`  | Truncates the string to `maxLength` and appends `suffix` (default `"..."`). If `cutFromStart` is `true`, truncates from the beginning.                               |
| `toCamelCase`   | `(str: string)`                                                                | `string`  | Converts kebab-case, snake_case, or space-separated strings to camelCase.                                                                                            |
| `toKebabCase`   | `(str: string)`                                                                | `string`  | Converts camelCase, PascalCase, or snake_case to kebab-case.                                                                                                         |
| `toSnakeCase`   | `(str: string)`                                                                | `string`  | Converts camelCase, PascalCase, or kebab-case to snake_case.                                                                                                         |
| `reverse`       | `(str: string)`                                                                | `string`  | Reverses the string.                                                                                                                                                 |
| `formatBytes`   | `(bytes: number, decimals?: number)`                                           | `string`  | Formats a byte count into a human-readable string (e.g., `"1.5 MB"`), using the browser's locale for number formatting and unit translation.                         |
| `randString`    | `(length: number, charset?: "alphanumeric" \| "alpha" \| "numeric" \| "hex")`  | `string`  | Generates a random string of the given length using the specified charset (default `"alphanumeric"`).                                                                |
| `mask`          | `(str: string, startVisible?: number, endVisible?: number, maskChar?: string)` | `string`  | Masks the middle portion of a string, leaving `startVisible` and `endVisible` characters visible (default 4). Uses `maskChar` (default `"*"`) for hidden characters. |

---

## 2. DOM Utilities

DOM manipulation, traversal, creation, and style management.

| Method                   | Arguments                                                                                                       | Return                              | Description                                                                                                                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `css`                    | `(el: HTMLElement, prop: string \| Record<string, string \| number \| null>, value?: string \| number \| null)` | `string`                            | Gets or sets CSS styles. Accepts camelCase or kebab-case property names, or an object of properties. Numeric values get `"px"` appended automatically. Returns computed style when getting. |
| `hasClass`               | `(el: HTMLElement \| EventTarget \| null, className: string)`                                                   | `boolean`                           | Checks if the element has the specified CSS class.                                                                                                                                          |
| `addClass`               | `(el: HTMLElement, className: string)`                                                                          | `void`                              | Adds a CSS class to the element.                                                                                                                                                            |
| `removeClass`            | `(el: HTMLElement, className: string)`                                                                          | `void`                              | Removes a CSS class from the element.                                                                                                                                                       |
| `toggleClass`            | `(el: HTMLElement, className: string)`                                                                          | `void`                              | Toggles a CSS class on the element.                                                                                                                                                         |
| `setClass`               | `(el: HTMLElement, className: string, active?: boolean)`                                                        | `void`                              | Adds or removes a CSS class based on the `active` flag (default `true`).                                                                                                                    |
| `make`                   | `(tagName: string, callback?: (el: HTMLElement) => void)`                                                       | `HTMLElement`                       | Creates a new HTML element. An optional callback receives the created element for further configuration.                                                                                    |
| `makeText`               | `(content?: string)`                                                                                            | `Text`                              | Creates a new text node with the given content.                                                                                                                                             |
| `remove`                 | `(el: Element \| HTMLElement)`                                                                                  | `void`                              | Removes the element from its parent in the DOM.                                                                                                                                             |
| `query`                  | `(selector: string, callback: (el: HTMLElement, index: number) => void, context?: HTMLElement \| Document)`     | `false \| number`                   | Queries elements matching the CSS selector and executes callback for each. Returns `false` if no elements found, otherwise the number of matched elements.                                  |
| `queryList`              | `(selector: string, context?: HTMLElement \| Document)`                                                         | `HTMLElement[]`                     | Returns an array of all elements matching the CSS selector.                                                                                                                                 |
| `queryLength`            | `(selector: string, context?: HTMLElement \| Document)`                                                         | `number`                            | Returns the count of elements matching the CSS selector.                                                                                                                                    |
| `html`                   | `(el: HTMLElement, value?: string \| null)`                                                                     | `string \| HTMLElement`             | Gets or sets the `innerHTML` of an element. Returns the HTML string when getting, returns the element when setting.                                                                         |
| `toHtml`                 | `(data: string \| Node \| Node[] \| HTMLElement \| HTMLElement[])`                                              | `string`                            | Converts a node, element, array of nodes/elements, or string to an HTML string representation.                                                                                              |
| `append`                 | `(el: Node \| Element \| HTMLElement, child: HTMLElement \| Node \| NodeList \| Node[])`                        | `Element \| HTMLElement \| Node`    | Appends a child node, `NodeList`, or array of nodes to the end of the parent element. Returns the parent.                                                                                   |
| `prepend`                | `(el: Node \| Element \| HTMLElement, child: HTMLElement \| Node \| NodeList \| Node[])`                        | `Element \| HTMLElement \| Node`    | Prepends a child node, `NodeList`, or array of nodes to the beginning of the parent element. Returns the parent.                                                                            |
| `before`                 | `(el: Node \| Element \| HTMLElement, child: HTMLElement \| Node \| NodeList \| Node[])`                        | `Element \| HTMLElement \| Node`    | Inserts a node or array of nodes before the reference element. Returns the reference element.                                                                                               |
| `after`                  | `(el: Node \| Element \| HTMLElement, child: HTMLElement \| Node \| NodeList \| Node[])`                        | `Element \| HTMLElement \| Node`    | Inserts a node or array of nodes after the reference element. Returns the reference element.                                                                                                |
| `attr`                   | `(el: Element \| HTMLElement, key: string \| Record<string, string>, value?: string)`                           | `string \| null \| undefined`       | Gets or sets an attribute on an element. Accepts a single key-value pair or an object of attributes. Returns the attribute value when getting.                                              |
| `removeAttr`             | `(el: Element \| HTMLElement, attrName: string \| string[])`                                                    | `void`                              | Removes an attribute or array of attributes from the element.                                                                                                                               |
| `data`                   | `(el: HTMLElement, key: string \| Record<string, string>, value?: string)`                                      | `string \| undefined`               | Gets or sets a `data-*` attribute on an element. Accepts a single key-value pair or an object. Returns the value when getting.                                                              |
| `dataByPrefix`           | `(el: HTMLElement, prefix: string)`                                                                             | `Record<string, string \| number>`  | Retrieves all `data-*` attributes that start with the given prefix. Keys are camelCased, and numeric values are parsed to numbers.                                                          |
| `val`                    | `(el: HTMLInputElement \| HTMLSelectElement \| HTMLTextAreaElement, value?: string)`                            | `string \| undefined`               | Gets or sets the value of a form element. Returns the value when getting.                                                                                                                   |
| `closest`                | `(child: Node \| HTMLElement \| EventTarget \| null, parent: Node \| HTMLElement \| EventTarget \| null)`       | `Element \| false`                  | Walks up the DOM tree from `child` and returns the `parent` if found in the ancestry, otherwise `false`.                                                                                    |
| `offset`                 | `(el: HTMLElement)`                                                                                             | `{ top: number; left: number }`     | Returns the element's position relative to the document, accounting for scroll offset.                                                                                                      |
| `outerSize`              | `(el: HTMLElement)`                                                                                             | `{ width: number; height: number }` | Returns the element's outer dimensions including margin.                                                                                                                                    |
| `empty`                  | `(el: HTMLElement)`                                                                                             | `HTMLElement`                       | Removes all child nodes from the element. Returns the emptied element.                                                                                                                      |
| `show`                   | `(el: HTMLElement & { __visibleStatus?: string })`                                                              | `void`                              | Shows a previously hidden element by restoring its `display` value.                                                                                                                         |
| `hide`                   | `(el: HTMLElement & { __visibleStatus?: string })`                                                              | `void`                              | Hides the element and stores its current `display` value for later restoration.                                                                                                             |
| `toggle`                 | `(el: HTMLElement & { __visibleStatus?: string })`                                                              | `void`                              | Toggles the visibility of the element.                                                                                                                                                      |
| `appendText`             | `(el: Node \| Element \| HTMLElement, text: string)`                                                            | `Node \| Element \| HTMLElement`    | Creates a text node and appends it to the element.                                                                                                                                          |
| `toTextNode`             | `(text: string)`                                                                                                | `Text`                              | Creates a text node from the given string.                                                                                                                                                  |
| `mergeAdjacentTextNodes` | `(el: HTMLElement)`                                                                                             | `void`                              | Merges all adjacent text nodes within the element into single text nodes.                                                                                                                   |
| `replaceWithChildren`    | `(el: HTMLElement)`                                                                                             | `void`                              | Replaces the element with its child nodes, effectively removing the wrapper element.                                                                                                        |
| `getChildNodes`          | `(el: Node)`                                                                                                    | `Node[]`                            | Returns an array of all child nodes of the element.                                                                                                                                         |
| `getText`                | `(node: Node \| Node[])`                                                                                        | `string`                            | Returns the combined `textContent` of a node or array of nodes.                                                                                                                             |
| `getLength`              | `(node: Node \| Node[])`                                                                                        | `number`                            | Returns the total text length of a node or array of nodes.                                                                                                                                  |

---

## 3. Event Utilities

Wraps native `addEventListener`/`removeEventListener` with automatic handler tracking and namespacing.

| Method   | Arguments                                                                                                       | Return | Description                                                                                                                                                                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on`     | `(target: EventTarget, eventName: string, handler: EventHandler, options?: AddEventListenerOptions \| boolean)` | `void` | Registers an event listener with automatic tracking. Supports ID namespacing via dot notation (e.g., `"click.myButton"`). Overwrites existing handlers with the same ID. The handler receives an extended event with `delegateTarget` set to the bound element. |
| `off`    | `(target: EventTarget, eventName: string, options?: AddEventListenerOptions \| boolean)`                        | `void` | Removes a tracked event listener. If an ID is provided (e.g., `"click.myButton"`), removes only that specific handler. If no ID is given, removes all tracked handlers for that event type.                                                                     |
| `rebind` | `(target: EventTarget, eventName: string, handler: EventHandler, options?: AddEventListenerOptions \| boolean)` | `void` | Convenience method that calls `off()` followed by `on()` to replace an existing listener with a new handler.                                                                                                                                                    |

**Types:**

```typescript
type EventHandler<T extends Event = Event> = (event: T & { delegateTarget: EventTarget }) => void;
```

---

## 4. HTML Utilities

Safe HTML string manipulation and parsing.

| Method          | Arguments                                   | Return   | Description                                                                                                                                                                       |
| --------------- | ------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stripHtml`     | `(str: string)`                             | `string` | Removes all HTML tags from the string, leaving only text content.                                                                                                                 |
| `stripFragment` | `(html: string)`                            | `string` | Removes `<!--StartFragment-->` and `<!--EndFragment-->` wrapper tags, commonly found in clipboard or editor output.                                                               |
| `escapeHtml`    | `(input: string)`                           | `string` | Escapes HTML special characters (`&`, `"`, `'`, `<`, `>`) into their corresponding HTML entities.                                                                                 |
| `decodeHtml`    | `(input: string)`                           | `string` | Decodes common HTML entities (`&amp;`, `&quot;`, `&#039;`, `&lt;`, `&gt;`) back to their characters.                                                                              |
| `parseHtml`     | `(html: string, isStripFragment?: boolean)` | `Node[]` | Parses an HTML string into an array of DOM nodes using `DOMParser`. If `isStripFragment` is `true`, strips fragment tags before parsing. Returns an empty array if parsing fails. |

---

## 5. Store Utility

Lightweight key and value storage

### `createStore`

| Method        | Arguments          | Return     | Description                                      |
| ------------- | ------------------ | ---------- | ------------------------------------------------ |
| `createStore` | `(storeObject: T)` | `Store<T>` | Creates a store instance from an initial object. |

### Store API (`Store<T>`)

| Method   | Arguments                               | Return       | Description                                                                         |
| -------- | --------------------------------------- | ------------ | ----------------------------------------------------------------------------------- |
| `get`    | `(key: keyof T)`                        | `T[keyof T]` | Retrieves the value associated with the given key.                                  |
| `set`    | `(key: K extends keyof T, value: T[K])` | `void`       | Sets the value for the given key.                                                   |
| `has`    | `(key: string)`                         | `boolean`    | Returns `true` if the key exists in the store.                                      |
| `delete` | `(key: keyof T)`                        | `boolean`    | Deletes the key from the store. Returns `true` if the key was successfully deleted. |

### Example:

```typescript
import { createStore } from 'snappykit/store';

const userStore = createStore<{ name: string; age: number }>({ name: 'Alice', age: 25 });

userStore.get('name'); // "Alice"
userStore.set('name', 'Bob');
userStore.has('age'); // true
userStore.delete('age'); // true
```

## License

[MIT](https://opensource.org/licenses/MIT)
