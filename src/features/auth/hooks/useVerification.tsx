import { useNavigation } from '@react-navigation/native';
import { verifyPhoneOtp } from '../api';
import { useAuth } from '@src/store/Auth';
import { useMutation } from '@tanstack/react-query';
import { useNotificationContext } from '@src/app/providers/NotificationProvider';

export const useVerification = () => {
	const navigation = useNavigation();
	const setAuth = useAuth((state) => state.setAuth);
	const { registerDevice, isRegistered } = useNotificationContext();
	
	return useMutation({
		mutationFn: verifyPhoneOtp,
		onSuccess: async (data) => {
			setAuth(data);
			console.log('data from react query', data);
			
			// Register push token after successful login
			console.log('[useVerification] Login successful, registering push token...');
			if (!isRegistered) {
				// Small delay to ensure auth state is propagated
				setTimeout(() => {
					registerDevice()
						.then((success) => {
							if (success) {
								console.log('[useVerification] Push token registered successfully');
							} else {
								console.log('[useVerification] Push token registration failed or skipped');
							}
						})
						.catch((error) => {
							console.log('[useVerification] Push token registration failed', error);
						});
				}, 500);
			}
		},
	});
};
