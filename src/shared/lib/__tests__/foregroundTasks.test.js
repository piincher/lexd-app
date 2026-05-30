import {
  clearForegroundTaskCooldowns,
  markForegroundTaskRun,
  runForegroundTask,
  shouldRunForegroundTask,
} from '../foregroundTasks';

describe('foregroundTasks', () => {
  beforeEach(() => {
    clearForegroundTaskCooldowns();
  });

  it('blocks repeated foreground work inside the cooldown window', () => {
    expect(shouldRunForegroundTask('notifications:unread', 30000, 100000)).toBe(true);

    markForegroundTaskRun('notifications:unread', 100000);

    expect(shouldRunForegroundTask('notifications:unread', 30000, 120000)).toBe(false);
    expect(shouldRunForegroundTask('notifications:unread', 30000, 130000)).toBe(true);
  });

  it('runs a task once and skips immediate duplicates', async () => {
    const task = jest.fn();

    await expect(runForegroundTask('activity:app-open', 300000, task)).resolves.toBe(true);
    await expect(runForegroundTask('activity:app-open', 300000, task)).resolves.toBe(false);

    expect(task).toHaveBeenCalledTimes(1);
  });
});
