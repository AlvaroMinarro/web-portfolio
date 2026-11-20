import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import type { Theme } from '@/types';

type ThemeOrigin = { x: number; y: number };
type ThemeTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
};
type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ThemeTransition;
};

const readStoredTheme = (): Theme | null => {
  try {
    const stored = window.localStorage.getItem('theme');
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    readStoredTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const requestedTheme = useRef(theme);
  const requestId = useRef(0);
  const active = useRef<{ transition: ThemeTransition; animation?: Animation } | null>(null);

  const cancelTransition = useCallback(() => {
    const previous = active.current;
    active.current = null;
    const root = document.documentElement;
    root.classList.remove('theme-reveal');
    root.style.removeProperty('--theme-reveal-color-scheme');
    root.style.removeProperty('--theme-reveal-x');
    root.style.removeProperty('--theme-reveal-y');
    try {
      previous?.animation?.cancel();
      previous?.transition.skipTransition();
    } catch {
      // DOM cleanup is complete even if an interrupted API fails to cancel.
    }
  }, []);

  // Layout effects run inside flushSync, before the new snapshot is captured.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // A blocked/full store must not prevent an in-memory theme change.
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme() !== null) return;
      requestId.current += 1;
      cancelTransition();
      requestedTheme.current = event.matches ? 'dark' : 'light';
      setTheme(requestedTheme.current);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      requestId.current += 1;
      cancelTransition();
    };
  }, [cancelTransition]);

  const toggleTheme = (origin?: ThemeOrigin) => {
    const id = ++requestId.current;
    const next = requestedTheme.current === 'dark' ? 'light' : 'dark';
    requestedTheme.current = next;
    cancelTransition();
    let applied = false;
    const commit = () => {
      // Superseded callbacks cannot overwrite the latest activation.
      if (applied || id !== requestId.current) return;
      applied = true;
      flushSync(() => setTheme(next));
    };
    const root = document.documentElement;
    const transitionDocument = document as TransitionDocument;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canReveal = !reducedMotion.matches &&
      typeof transitionDocument.startViewTransition === 'function' &&
      typeof root.animate === 'function' &&
      typeof KeyframeEffect !== 'undefined' && 'pseudoElement' in KeyframeEffect.prototype &&
      typeof CSS !== 'undefined' && CSS.supports('selector(::view-transition-new(root))') &&
      CSS.supports('clip-path', 'circle(1px at 1px 1px)');

    if (!canReveal) {
      commit();
      return;
    }

    const x = Math.min(window.innerWidth, Math.max(0, origin?.x ?? window.innerWidth / 2));
    const y = Math.min(window.innerHeight, Math.max(0, origin?.y ?? window.innerHeight / 2));
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    ) + 1;

    try {
      // Native scrollbars are not clipped by the root snapshot's circular reveal.
      root.style.setProperty('--theme-reveal-color-scheme', getComputedStyle(root).colorScheme);
      root.style.setProperty('--theme-reveal-x', `${x}px`);
      root.style.setProperty('--theme-reveal-y', `${y}px`);
      root.classList.add('theme-reveal');
      const transition = transitionDocument.startViewTransition!(commit);
      const current: { transition: ThemeTransition; animation?: Animation } = { transition };
      active.current = current;
      const finish = () => {
        if (active.current !== current) return;
        active.current = null;
        root.classList.remove('theme-reveal');
        root.style.removeProperty('--theme-reveal-color-scheme');
        root.style.removeProperty('--theme-reveal-x');
        root.style.removeProperty('--theme-reveal-y');
      };
      const fallback = () => {
        if (id !== requestId.current) return;
        commit();
        cancelTransition();
      };
      // Skipping a transition can reject ready/finished independently.
      void transition.updateCallbackDone.catch(fallback);
      void transition.finished.then(finish, fallback);
      void transition.ready.then(() => {
        if (active.current !== current) return;
        if (reducedMotion.matches) {
          fallback();
          return;
        }
        current.animation = root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards', pseudoElement: '::view-transition-new(root)' }
        );
        void current.animation.finished.catch(() => undefined);
      }).catch(fallback);
    } catch {
      // A failing API must still apply the target, never toggle a second time.
      cancelTransition();
      commit();
    }
  };

  return { theme, toggleTheme };
};
