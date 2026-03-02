import { useNavigation } from '@react-navigation/native';
import { verifyPhoneOtp } from '@src/api/auth';
import { useAuth } from '@src/store/Auth';
import { useMutation } from '@tanstack/react-query';

export const useVerification = () => {
	const navigation = useNavigation();
	const setAuth = useAuth((state) => state.setAuth);
	return useMutation({
		mutationFn: verifyPhoneOtp,
		onError: async (error) => {
			console.log('error from react query', error);
		},
		onSuccess: async (data) => {
			setAuth(data);
			console.log('data from react query', data);
		},
	});
};
