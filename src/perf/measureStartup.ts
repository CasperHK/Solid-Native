export interface StartupMetrics {
  domContentLoadedMs: number;
  firstPaintMs: number | null;
  firstContentfulPaintMs: number | null;
  measuredAt: string;
}

export function measureStartupMetrics(): void {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return;
  }

  const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

  const metrics: StartupMetrics = {
    domContentLoadedMs: navEntry?.domContentLoadedEventEnd ?? -1,
    firstPaintMs: null,
    firstContentfulPaintMs: null,
    measuredAt: new Date().toISOString(),
  };

  const paintObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-paint") {
        metrics.firstPaintMs = entry.startTime;
      }
      if (entry.name === "first-contentful-paint") {
        metrics.firstContentfulPaintMs = entry.startTime;
      }
    }
  });

  try {
    paintObserver.observe({ type: "paint", buffered: true });
  } catch {
    return;
  }

  window.setTimeout(() => {
    const payload = {
      type: "startup-metrics",
      ...metrics,
    };

    // Easy to capture from devtools or automated harness.
    console.info("[perf]", payload);
    (window as Window & { __startupMetrics?: StartupMetrics }).__startupMetrics = metrics;

    paintObserver.disconnect();
  }, 0);
}
