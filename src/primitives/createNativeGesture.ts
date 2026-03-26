import { animate } from "@motionone/dom";
import { createSignal, onCleanup } from "solid-js";

export interface NativeGestureOptions {
  passive?: boolean;
  cssVarPrefix?: string;
  spring?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

export interface NativeGestureState {
  x: () => number;
  y: () => number;
  deltaX: () => number;
  deltaY: () => number;
  velocityX: () => number;
  velocityY: () => number;
  isActive: () => boolean;
}

export interface NativeGestureBinding {
  ref: (el: HTMLElement) => void;
  onPointerDown: (ev: PointerEvent) => void;
  onPointerMove: (ev: PointerEvent) => void;
  onPointerUp: (ev: PointerEvent) => void;
  onPointerCancel: (ev: PointerEvent) => void;
  style: () => string;
}

interface Point {
  x: number;
  y: number;
  t: number;
}

const DEFAULT_PREFIX = "--gesture";

export function createNativeGesture(options: NativeGestureOptions = {}) {
  const prefix = options.cssVarPrefix ?? DEFAULT_PREFIX;
  const passive = options.passive ?? true;

  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [deltaX, setDeltaX] = createSignal(0);
  const [deltaY, setDeltaY] = createSignal(0);
  const [velocityX, setVelocityX] = createSignal(0);
  const [velocityY, setVelocityY] = createSignal(0);
  const [isActive, setIsActive] = createSignal(false);

  let target: HTMLElement | null = null;
  let rafId: number | null = null;
  let pointerId: number | null = null;
  let origin: Point | null = null;
  let last: Point | null = null;

  const applyCssVars = () => {
    if (!target) {
      return;
    }

    target.style.setProperty(`${prefix}-x`, `${x()}px`);
    target.style.setProperty(`${prefix}-y`, `${y()}px`);
    target.style.setProperty(`${prefix}-dx`, `${deltaX()}px`);
    target.style.setProperty(`${prefix}-dy`, `${deltaY()}px`);
    target.style.setProperty(`${prefix}-vx`, `${velocityX()}`);
    target.style.setProperty(`${prefix}-vy`, `${velocityY()}`);
  };

  const requestApply = () => {
    if (rafId !== null) {
      return;
    }
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      applyCssVars();
    });
  };

  const reset = () => {
    setX(0);
    setY(0);
    setDeltaX(0);
    setDeltaY(0);
    setVelocityX(0);
    setVelocityY(0);
    origin = null;
    last = null;
    pointerId = null;
    requestApply();
  };

  const onPointerDown = (ev: PointerEvent) => {
    pointerId = ev.pointerId;
    const point = { x: ev.clientX, y: ev.clientY, t: performance.now() };
    origin = point;
    last = point;
    setIsActive(true);
  };

  const onPointerMove = (ev: PointerEvent) => {
    if (!isActive() || pointerId !== ev.pointerId || !origin) {
      return;
    }

    const now = performance.now();
    const nx = ev.clientX;
    const ny = ev.clientY;
    setX(nx);
    setY(ny);
    setDeltaX(nx - origin.x);
    setDeltaY(ny - origin.y);

    if (last) {
      const dt = Math.max(1, now - last.t);
      setVelocityX((nx - last.x) / dt);
      setVelocityY((ny - last.y) / dt);
    }

    last = { x: nx, y: ny, t: now };
    requestApply();
  };

  const settle = () => {
    if (!target) {
      reset();
      return;
    }

    animate(
      target,
      {
        [`${prefix}-dx` as "--gesture-dx"]: "0px",
        [`${prefix}-dy` as "--gesture-dy"]: "0px",
      },
      {
        duration: 0.28,
        easing: "ease-out",
        ...(options.spring ?? {}),
      }
    ).finished.finally(() => {
      reset();
    });
  };

  const onPointerUp = (ev: PointerEvent) => {
    if (!isActive() || pointerId !== ev.pointerId) {
      return;
    }
    setIsActive(false);
    settle();
  };

  const onPointerCancel = (ev: PointerEvent) => {
    if (pointerId !== ev.pointerId) {
      return;
    }
    setIsActive(false);
    reset();
  };

  const ref = (el: HTMLElement) => {
    target = el;
    applyCssVars();

    el.addEventListener("pointerdown", onPointerDown as EventListener, { passive });
    el.addEventListener("pointermove", onPointerMove as EventListener, { passive });
    el.addEventListener("pointerup", onPointerUp as EventListener, { passive });
    el.addEventListener("pointercancel", onPointerCancel as EventListener, { passive });
  };

  const cleanup = () => {
    if (!target) {
      return;
    }

    target.removeEventListener("pointerdown", onPointerDown as EventListener);
    target.removeEventListener("pointermove", onPointerMove as EventListener);
    target.removeEventListener("pointerup", onPointerUp as EventListener);
    target.removeEventListener("pointercancel", onPointerCancel as EventListener);

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  onCleanup(cleanup);

  const binding: NativeGestureBinding = {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    style: () =>
      `${prefix}-x: ${x()}px; ${prefix}-y: ${y()}px; ${prefix}-dx: ${deltaX()}px; ${prefix}-dy: ${deltaY()}px; transform: translate3d(var(${prefix}-dx), var(${prefix}-dy), 0); will-change: transform;`,
  };

  const state: NativeGestureState = {
    x,
    y,
    deltaX,
    deltaY,
    velocityX,
    velocityY,
    isActive,
  };

  return {
    bind: binding,
    state,
    cleanup,
  };
}
