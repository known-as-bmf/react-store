import { renderHook, act } from '@testing-library/react-hooks';
import { of, set, swap } from 'store';

import { useStore } from '../src';

describe('useStore', () => {
  it('should be a function', () => {
    expect(useStore).toBeDefined();
    expect(useStore).toBeInstanceOf(Function);
  });

  describe('without selector', () => {
    it('should return the state of the store on first render', () => {
      const initialState = 'test';
      const store = of(initialState);

      const { result } = renderHook(() => useStore(store));

      expect(result.current).toBeDefined();
      expect(result.current).toBe(initialState);
    });

    it('should return the new state when the state changes', () => {
      const initialState = 'test';
      const newState = 'test2';
      const store = of(initialState);

      const { result } = renderHook(() => useStore(store));

      expect(result.current).toBeDefined();
      expect(result.current).toBe(initialState);

      act(() => set(store, newState));

      expect(result.current).toBeDefined();
      expect(result.current).toBe(newState);
    });
  });

  describe('with selector', () => {
    it('should return the state of the store on first render', () => {
      const initialState = { a: 'test', b: 'test' };
      const store = of(initialState);

      const { result } = renderHook(() => useStore(store, s => s.a));

      expect(result.current).toBeDefined();
      expect(result.current).toBe(initialState.a);
    });

    it('should return the new state when the selector(state) changes (1)', () => {
      const initialState = { a: 'test', b: 'test' };
      const newState = { a: 'test2', b: 'test' };
      const store = of(initialState);

      const { result } = renderHook(() => useStore(store, s => s.a));

      expect(result.current).toBeDefined();
      expect(result.current).toBe(initialState.a);

      act(() => set(store, newState));

      expect(result.current).toBeDefined();
      expect(result.current).toBe(newState.a);
    });

    it('should return the new state when the selector(state) changes (2)', () => {
      const initialState = { a: 'test', b: 'test' };
      const store = of(initialState);

      const { result } = renderHook(() => useStore(store, s => s.a));

      expect(result.current).toBeDefined();
      expect(result.current).toBe(initialState.a);

      act(() =>
        swap(store, s => {
          s.a = 'test2';
          return s;
        })
      );

      expect(result.current).toBeDefined();
      expect(result.current).toBe('test2');
    });

    it("should'nt do anything if selector(state) doesn't changes", () => {
      const initialState = { a: { some: 'thing' }, b: { some: 'thing' } };
      // const newState = { ...initialState, b: { some: 'other thing' } };
      const store = of(initialState);

      const { result } = renderHook(() => useStore(store, s => s.a));

      expect(result.current).toBeDefined();
      expect(result.current).toBe(initialState.a);

      // act(() => set(store, newState));
      act(() =>
        swap(store, s => {
          s.b.some = 'other thing';
          return s;
        })
      );

      expect(result.current).toBeDefined();
      expect(result.current).toBe(initialState.a);
    });
  });
});
