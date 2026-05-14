import * as Sentry from '@sentry/react-native';

const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN || '';

export const initSentry = () => {
	if (!SENTRY_DSN) {
		// Skip Sentry initialization when DSN is not configured
		return;
	}

	Sentry.init({
		dsn: SENTRY_DSN,
		debug: false,
		integrations: [Sentry.mobileReplayIntegration()],
		tracesSampleRate: 1,
		_experiments: {
			profilesSampleRate: 1,
			replaysSessionSampleRate: 1,
			replaysOnErrorSampleRate: 1,
		},
	});
};
