import * as Sentry from '@sentry/react-native';

export const routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
	enableTimeToInitialDisplay: true,
});
export const initSentry = () => {
	Sentry.init({
		dsn: 'https://c94705caef41cca8dd2739debd894d68@o4504673761296384.ingest.us.sentry.io/4507324627353600',
		debug: false,
		integrations: [new Sentry.ReactNativeTracing(),

			
		],
		tracesSampleRate: 1,
		_experiments: {
			// The sampling rate for profiling is relative to TracesSampleRate.
			// In this case, we'll capture profiles for 100% of transactions.
			profilesSampleRate: 0.4,

		},
		
	});

	Sentry.configureScope(function (scope) {
		scope.setUser({
			// id: user?.phoneNumber,
			// email: user?.email,
			// username: user?.firstName,
		});
	});
};
