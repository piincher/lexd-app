import { addBreadcrumb, captureException, captureMessage } from '@src/shared/lib/sentry';

export const logVersionCheckStart = () => {
  addBreadcrumb({
    message: 'Version check started',
  });
};

export const logVersionCheckSuccess = (data: { shouldUpdate: boolean; forceUpdate: boolean }) => {
  addBreadcrumb({
    message: 'Version check success',
    data,
  });
};

export const logVersionCheckFailure = (error: Error) => {
  captureException(error, {
    contexts: {
      version_check: { source: 'version_check' },
    },
  });
};

export const logForceUpdateShown = () => {
  captureMessage('Force update screen shown', 'warning');
};

export const logOptionalUpdateShown = () => {
  addBreadcrumb({
    message: 'Optional update shown',
  });
};

export const logUpdateClicked = (storeUrl: string) => {
  addBreadcrumb({
    message: 'User clicked update',
    data: { storeUrl },
  });
};

export const logUpdateDismissed = () => {
  addBreadcrumb({
    message: 'User dismissed update',
  });
};
