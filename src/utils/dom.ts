import { toCamelCase, toKebabCase } from './primitives';
import type { DomChildNode, DomNode, ValueElement, VisibleElement } from '@/types';

/**
 * Gets or sets CSS styles on an element
 * @param element - Target DOM element
 * @param prop - CSS property name (camelCase or kebab-case) or object with multiple properties
 * @param value - CSS value (required if prop is string)
 * @returns Computed style value when getting, empty string when setting
 */
export function css(
  element: HTMLElement,
  prop: string | Record<string, string | number | null>,
  value?: string | number | null,
): string {
  let result = '';

  const addPxSuffix = (value: string | number): string => {
    return typeof value === 'number' ? `${value}px` : String(value);
  };

  if (typeof prop === 'object') {
    for (const [property, val] of Object.entries(prop)) {
      css(element, property, val);
    }
  } else {
    const kebabProp = toKebabCase(prop);
    const camelProp = toCamelCase(prop);

    if (value === '' || value === null) {
      element.style.removeProperty(kebabProp);
      element.style.setProperty(kebabProp, '');
    } else if (value !== undefined) {
      if (camelProp in element.style) {
        element.style.setProperty(kebabProp, addPxSuffix(value));
      }
    } else {
      const inlineValue = element.style.getPropertyValue(kebabProp);

      if (inlineValue) {
        result = inlineValue;
      } else {
        result = window.getComputedStyle(element, '').getPropertyValue(kebabProp) || '';
      }
    }
  }

  return result;
}

/**
 * Checks if an element has a specific CSS class
 * @param element - Target DOM element
 * @param className - CSS class name to check
 * @returns True if element has the class, false otherwise
 */
export function hasClass(element: HTMLElement | null, className: string): boolean {
  if (!element) return false;
  return element.classList.contains(className.trim());
}

/**
 * Adds one or more CSS classes to an element
 * @param el - Target DOM element
 * @param className - CSS class name(s) as string or array of strings
 */
export function addClass(el: HTMLElement, className: string | string[]) {
  if (!el) return;

  const classes = typeof className === 'string'
    ? className.split(' ').filter(cls => cls !== '')
    : className;

  if (classes.length === 0) return;

  el.classList.add(...classes);
}

/**
 * Removes one or more CSS classes from an element
 * @param el - Target DOM element
 * @param className - CSS class name(s) as string or array of strings
 */
export function removeClass(el: HTMLElement, className: string | string[]) {
  if (!el) return;

  const classes = typeof className === 'string'
    ? className.split(' ').filter(cls => cls !== '')
    : className;

  if (classes.length === 0) return;

  el.classList.remove(...classes);
}

/**
 * Toggles one or more CSS classes on an element
 * @param el - Target DOM element
 * @param className - CSS class name(s) as string or array of strings
 */
export function toggleClass(el: HTMLElement, className: string | string[]) {
  if (!el) return;

  const classes = typeof className === 'string'
    ? className.split(' ').filter(cls => cls !== '')
    : className;

  classes.forEach((cls) => {
    if (cls === '') return;

    if (hasClass(el, cls)) {
      removeClass(el, cls);
    } else {
      addClass(el, cls);
    }
  });
}

/**
 * Creates a new HTML element
 * @param name - HTML tag name
 * @param callback - Optional callback function called with the created element
 * @returns The created element
 */
export function make<T extends HTMLElement = HTMLElement>(
  name: string,
  callback?: (el: T) => void
): T {
  const el = document.createElement(name) as T;
  if (callback) callback(el);
  return el;
}

/**
 * Creates a new text node
 * @param content - The text content
 * @returns The created text node
 */
export function makeText(content: string = ''): Text {
  return document.createTextNode(content);
}

/**
 * Removes an element(s) from the DOM
 * @param element - Element, array of elements, or NodeList to remove
 */
export function remove(element: Element | Element[] | NodeListOf<Element>): void {
  if (!element) return;

  if (element instanceof NodeList) {
    Array.from(element).forEach((el) => remove(el));
  } else if (Array.isArray(element)) {
    element.slice().forEach((el) => remove(el));
  } else if (element?.parentNode) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Queries DOM elements matching a selector and executes a callback for each
 * @param selector - CSS selector
 * @param callback - Function called for each matching element
 * @param context - DOM context to query within (default: document)
 * @returns Number of elements
 */
export function query<T extends Element = Element>(
  selector: string,
  callback: (el: T, index: number) => void,
  context: Element | Document = document,
): number {
  context = context ? context : document;
  const elements = context.querySelectorAll(selector);

  if (!elements.length) return 0;

  elements.forEach((el, i) => {
    if (callback) callback(el as T, i);
  });

  return elements.length;
}

/**
 * Returns an array of elements matching a selector
 * @param selector - CSS selector
 * @param context - DOM context to query within (default: document)
 * @returns Array of matching elements
 */
export function queryList<T extends Element = Element>(selector: string, context: Element | Document = document): T[] {
  const list: T[] = [];

  query<T>(selector, (el) => list.push(el), context);

  return list;
}

/**
 * Returns the count of elements matching a selector
 * @param selector - CSS selector
 * @param context - DOM context to query within (default: document)
 * @returns Number of matching elements
 */
export function queryLength(selector: string, context: Element | Document = document): number {
  let length = 0;

  query(selector, () => length++, context);

  return length;
}

/**
 * Gets or sets inner HTML of an element
 * @param el - Target DOM element
 * @param value - HTML string to set (optional)
 * @returns Element when setting, HTML string when getting
 */
export function html(el: HTMLElement, value?: string | null): string;
export function html(el: HTMLElement, value: string): HTMLElement;
export function html(el: HTMLElement, value?: string | null): HTMLElement | string {
  if (value != null) {
    el.innerHTML = value;
    return el;
  }

  return el.innerHTML;
}

/**
 * Converts DOM nodes or elements to HTML string
 * @param data - Node, element, array, or string to convert
 * @returns HTML string representation
 */
export function toHtml(data: string | Node | Node[] | HTMLElement | HTMLElement[]): string {
  if (typeof data === 'string') return data;

  if (Array.isArray(data)) {
    return data
      .map((item) => {
        if (item instanceof HTMLElement) return item.outerHTML;
        if (item instanceof Node) {
          return item.nodeType === Node.TEXT_NODE
            ? item.textContent || ''
            : (item as HTMLElement).outerHTML || item.textContent || '';
        }
        return '';
      })
      .join('');
  }

  if (data instanceof HTMLElement) return data.outerHTML;

  if (data instanceof Node) {
    return data.nodeType === Node.TEXT_NODE
      ? data.textContent || ''
      : (data as HTMLElement).outerHTML || data.textContent || '';
  }

  return '';
}

/**
 * Appends a child node or nodes to an element
 * @param el - Parent element
 * @param child - Child node, array of nodes, or NodeList to append
 * @returns The parent element
 */
export function append<T extends DomNode = DomNode>(
  el: T,
  child: DomChildNode
): T {
  if (child instanceof NodeList) child.forEach((item: Node) => append(el, item));
  else if (Array.isArray(child)) Array.from(child).forEach((item: Node) => append(el, item));
  else el.appendChild(child);

  return el;
}

/**
 * Prepends a child node or nodes to an element (inserts at the beginning)
 * @param el - Parent element
 * @param child - Child node, array of nodes, or NodeList to prepend
 * @returns The parent element
 */
export function prepend<T extends DomNode = DomNode>(
  el: T,
  child: DomChildNode
): T {
  if (child instanceof NodeList) {
    Array.from(child)
      .reverse()
      .forEach((item: Node) => prepend(el, item));
  } else if (Array.isArray(child)) {
    [...child].reverse().forEach((item: Node) => prepend(el, item));
  } else {
    el.insertBefore(child, el.firstChild);
  }

  return el;
}

/**
 * Inserts nodes before an element, or retrieves the previous sibling element
 * if no nodes are provided.
 * 
 * @param el - Reference element
 * @param child - Node or nodes to insert (optional)
 * @returns The reference element when inserting, or the previous sibling element when reading
 */
export function before<T extends Element>(el: T): Element | null;
export function before<T extends Element>(el: T, child: DomChildNode): T;
export function before<T extends Element>(el: T, child?: DomChildNode): T | Element | null {
  if (child === undefined) {
    return el.previousElementSibling;
  }

  if (child instanceof NodeList) {
    Array.from(child).forEach((item) => before(el, item));
  } else if (Array.isArray(child)) {
    child.forEach((item) => before(el, item));
  } else {
    el.parentNode?.insertBefore(child, el);
  }
  return el;
}

/**
 * Inserts nodes after an element, or retrieves the next sibling element
 * if no nodes are provided.
 * 
 * @param el - Reference element
 * @param child - Node or nodes to insert (optional)
 * @returns The reference element when inserting, or the next sibling element when reading
 */
export function after<T extends Element>(el: T): Element | null;
export function after<T extends Element>(el: T, child: DomChildNode): T;
export function after<T extends Element>(el: T, child?: DomChildNode): T | Element | null {
  if (child === undefined) {
    return el.nextElementSibling;
  }

  if (child instanceof NodeList) {
    Array.from(child).forEach((item) => after(el, item));
  } else if (Array.isArray(child)) {
    child.forEach((item) => after(el, item));
  } else {
    el.parentNode?.insertBefore(child, el.nextSibling);
  }
  return el;
}

/**
 * Gets or sets an attribute on an element
 * @param el - Target element
 * @param key - Attribute name or object with attributes
 * @param value - Attribute value (if provided, sets the attribute)
 * @returns Attribute value when getting, undefined when setting
 */
export function attr(el: Element | HTMLElement, key: string | Record<string, string>, value?: string) {
  if (typeof key === 'object' && key !== null) {
    Object.entries(key).forEach(([attrKey, attrValue]) => {
      attr(el, attrKey, attrValue);
    });
    return;
  }

  if (value !== undefined) el.setAttribute(key, value);
  else return el.getAttribute(key);
}

/**
 * Removes an attribute or array of attributes from an element
 * @param el - Target element
 * @param attrName - Attribute name or array of attribute names to remove
 */
export function removeAttr(el: Element | HTMLElement, attrName: string | string[]): void {
  if (Array.isArray(attrName)) {
    attrName.forEach((name) => removeAttr(el, name));
  } else {
    el.removeAttribute(attrName);
  }
}

/**
 * Checks if an element is a child of another element
 * @param child - Child element to check
 * @param parent - Potential parent element
 * @returns The parent if found, false otherwise
 */
export function closest<C extends Node = HTMLElement, P extends Node = HTMLElement>(
  child: C | EventTarget | null,
  parent: P | EventTarget | null,
): P | false {
  if (!child || !parent) return false;
  if (!(child instanceof Node) || !(parent instanceof Node)) return false;

  let el: Node | null = child;

  while (el) {
    if (el === parent) return el as P;
    el = el.parentElement || el.parentNode;
  }

  return false;
}

/**
 * Gets or sets the value of a form element
 * @param el - Target form element (input, select, textarea)
 * @param value - Value to set (optional)
 * @returns Element value when getting, undefined when setting
 */
export function val(el: ValueElement): string;
export function val(el: ValueElement, value: string): ValueElement;
export function val(el: ValueElement, value?: string): string | ValueElement {
  if (value !== undefined) {
    el.value = value;
    return el;
  }

  return el.value || '';
}

/**
 * Appends a text node to an element
 * @param el - Target element
 * @param text - Text content
 * @returns The parent element
 */
export function appendText(el: DomNode, text: string): DomNode {
  return append(el, document.createTextNode(text));
}

/**
 * Creates a text node
 * @param text - Text content
 * @returns The created text node
 */
export function toTextNode(text: string): Node {
  return document.createTextNode(text);
}

/**
 * Merges adjacent text nodes within an element
 * @param element - Target element
 */
export function mergeAdjacentTextNodes(element: HTMLElement): void {
  let childNodes = Array.from(element.childNodes);
  let i = 0;

  while (i < childNodes.length - 1) {
    const currentNode = childNodes[i],
      nextNode = childNodes[i + 1];

    if (currentNode.nodeType === Node.TEXT_NODE && nextNode.nodeType === Node.TEXT_NODE) {
      const combinedText = (currentNode.textContent || '') + (nextNode.textContent || ''),
        newTextNode = document.createTextNode(combinedText);

      element.replaceChild(newTextNode, currentNode);
      element.removeChild(nextNode);
      childNodes = Array.from(element.childNodes);
    } else {
      i++;
    }
  }
}

/**
 * Replaces an element with its children (removes the wrapper element)
 * @param element - Element to replace with its children
 */
export function replaceWithChildren(element: HTMLElement): void {
  const parent = element.parentNode;

  if (!parent) return;

  const children = Array.from(element.childNodes);

  children.forEach((child) => {
    parent.insertBefore(child, element);
  });

  parent.removeChild(element);
}

/**
 * Gets or sets a data attribute on an element
 * @param el - Target element
 * @param key - Data attribute name (without 'data-' prefix) or object with data attributes
 * @param value - Data attribute value (if provided, sets the attribute)
 * @returns Data attribute value when getting, undefined when setting
 */
export function data(el: HTMLElement, key: string | Record<string, string>, value?: string): string | undefined | void {
  if (typeof key === 'object' && key !== null) {
    Object.entries(key).forEach(([dataKey, dataValue]) => {
      data(el, dataKey, dataValue);
    });
    return;
  }

  if (value !== undefined) {
    el.dataset[key] = value;
    return;
  }

  return el.dataset[key];
}

/**
 * Finds all data attributes with a specific prefix
 * @param element - Target element
 * @param prefix - Data attribute prefix (without 'data-')
 * @returns Object with camelCased keys and parsed values
 */
export function dataByPrefix(element: HTMLElement, prefix: string): Record<string, string | number> {
  const result: Record<string, string | number> = {};
  const dataPrefix = `data-${prefix}`;

  Array.from(element.attributes).forEach((attr) => {
    if (attr.name.startsWith(dataPrefix)) {
      const key = attr.name.replace(`${dataPrefix}-`, '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

      const value = isNaN(Number(attr.value)) ? attr.value : Number(attr.value);
      result[key] = value;
    }
  });

  return result;
}

/**
 * Returns an array of child nodes from an element
 * @param element - Target node
 * @returns Array of child nodes
 */
export function getChildNodes(element: Node): Node[] {
  const nodes: Node[] = [],
    childNodes = Array.from(element.childNodes);

  for (const node of childNodes) {
    nodes.push(node);
  }

  return nodes;
}

/**
 * Gets combined text content from a node or array of nodes
 * @param node - Node or array of nodes
 * @returns Combined text content
 */
export function getText(node: Node | Node[]): string {
  let result = '';

  const nodes = Array.isArray(node) ? node : [node];

  nodes.forEach((nodeItem) => (result += nodeItem.textContent));

  return result;
}

/**
 * Gets the total text length from a node or array of nodes
 * @param node - Node or array of nodes
 * @returns Total text length
 */
export function getLength(node: Node | Node[]): number {
  return getText(node).length;
}

/**
 * Gets the offset of an element relative to the document
 * @param el - Target element
 * @returns Object with top and left offsets
 */
export function offset(el: HTMLElement): { top: number; left: number } {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  };
}

/**
 * Gets the outer dimensions of an element including margin
 * @param el - Target element
 * @returns Object with width and height
 */
export function outerSize(el: HTMLElement): { width: number; height: number } {
  const styles = window.getComputedStyle(el);

  return {
    width: el.offsetWidth + parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10),
    height: el.offsetHeight + parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10),
  };
}

/**
 * Empties an element by removing all child nodes
 * @param el - Target element
 * @returns The emptied element
 */
export function empty<T extends HTMLElement = HTMLElement>(el: T): T {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  return el;
}

/**
 * Shows a hidden element by restoring its previous display value
 * @param el - Target element
 */
export function show(el: VisibleElement): void {
  if (el.__visibleStatus) {
    css(el, 'display', el.__visibleStatus);
    delete el.__visibleStatus;
  } else {
    css(el, 'display', '');

    if (attr(el, 'style') === '') removeAttr(el, 'style');
  }
}

/**
 * Hides an element and stores its current display value for later restoration
 * @param el - Target element
 */
export function hide(el: VisibleElement): void {
  if (css(el, 'display') === 'none') return;

  const currentDisplay = el.style.display || css(el, 'display');

  if (currentDisplay === 'none') return;

  if (el.style.display) {
    el.__visibleStatus = el.style.display;
  }

  css(el, 'display', 'none');
}

/**
 * Toggles element visibility, restoring previous display value when showing
 * @param el - Target element
 */
export function toggle(el: VisibleElement): void {
  const isHidden = css(el, 'display') === 'none';

  if (isHidden) show(el);
  else hide(el);
}
