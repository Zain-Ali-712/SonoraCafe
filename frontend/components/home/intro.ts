"use client";

/** Tiny bridge so the hero can start its entrance exactly when the arch loader lifts. */
const KEY = "sonora-intro-seen";
let done = false;
const waiters = new Set<() => void>();

export function introAlreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return true;
  }
}

export function markIntroDone() {
  done = true;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {}
  waiters.forEach((w) => w());
  waiters.clear();
}

export function onIntroDone(fn: () => void) {
  if (done) {
    fn();
    return () => {};
  }
  waiters.add(fn);
  return () => waiters.delete(fn);
}
