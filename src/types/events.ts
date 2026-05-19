/**
 * Generic event handler callback
 * @template T - Event type, defaults to base Event
 * @param evt - The event object
 */
export type EventHandler<T extends Event = Event> = (evt: T) => void;

/**
 * Event with extended delegate target
 * Adds the element that the delegated handler was bound to
 * @property delegateTarget - The element that the event handler is attached to
 */
declare global {
  interface Event {
    delegateTarget: HTMLElement;
  }
}
