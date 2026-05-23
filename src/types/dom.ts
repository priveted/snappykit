/**
 * Element with visible state tracking
 * @property __visibleStatus - Internal visibility status marker
 */
export type VisibleElement = HTMLElement & { __visibleStatus?: string };

/**
 * Form control elements with .value property
 * Covers HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement
 */
export type ValueElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Generic DOM node type
 * Union of Node, Element, and HTMLElement for broad compatibility
 */
export type DomNode = Node | Element | HTMLElement;

/** Allowed types for nodes to insert into the DOM */
export type DomChildNode = Node | Node[] | NodeList;

/**
 * Generic type for elements that support scroll operations.
 * Includes both HTMLElement and Window.
 */
export type ScrollableElement = HTMLElement | Window;
