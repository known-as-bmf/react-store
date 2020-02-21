import { useState, useEffect } from 'react';

import { deref, subscribe, Store, Selector } from '@known-as-bmf/store';

/**
 * Subscribe to a store and re-render when its state changes.
 * @param store The store to subscribe to.
 */
export function useStore<S>(store: Store<S>): S;
/**
 * Subscribe to part of a state of a store and re-render when it changes.
 * @param store The store to subscribe to.
 * @param selector The part of the state to subscribe to.
 */
export function useStore<S, R>(store: Store<S>, selector: Selector<S, R>): R;
export function useStore<S>(
  store: Store<S>,
  selector: Selector<S, any> = (s): S => s
): any {
  const [state, setState] = useState(deref(store));

  useEffect(
    () => subscribe(store, ({ current }) => setState(current), selector),
    [store, selector]
  );

  return selector(state);
}
