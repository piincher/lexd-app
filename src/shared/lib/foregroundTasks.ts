const lastRunAtByKey = new Map<string, number>();

export const shouldRunForegroundTask = (
  key: string,
  cooldownMs: number,
  now = Date.now(),
): boolean => {
  const lastRunAt = lastRunAtByKey.get(key) ?? 0;
  return now - lastRunAt >= cooldownMs;
};

export const markForegroundTaskRun = (key: string, now = Date.now()): void => {
  lastRunAtByKey.set(key, now);
};

export const runForegroundTask = async (
  key: string,
  cooldownMs: number,
  task: () => Promise<void> | void,
): Promise<boolean> => {
  if (!shouldRunForegroundTask(key, cooldownMs)) return false;

  markForegroundTaskRun(key);
  await task();
  return true;
};

export const clearForegroundTaskCooldowns = (): void => {
  lastRunAtByKey.clear();
};
