import { useState, useEffect } from 'react';

import { deref, subscribe, Store, Selector } from 'store';

export function useStore<S>(store: Store<S>): S;
export function useStore<S, R>(store: Store<S>, selector: Selector<S, R>): R;
export function useStore<S>(
  store: Store<S>,
  selector: Selector<S, any> = (s): S => s
): S {
  const [state, setState] = useState(deref(store));

  useEffect(
    () => subscribe(store, ({ current }) => setState(current), selector),
    [store, selector]
  );

  return state;
}
