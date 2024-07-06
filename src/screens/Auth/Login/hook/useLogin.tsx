import { loginPhoneOtpApple, sendPhoneOtp } from 'src/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@src/store/Auth';

export const useLogin = () => {
	return useMutation({
		mutationFn: sendPhoneOtp,
		onError: async (error) => {
			console.log('error from react query', error);
		},
		onSuccess: async (data) => {},
	});
};

export const useLoginApple = () => {
	const setAuth = useAuth((state) => state.setAuth);
	return useMutation({
		mutationFn: loginPhoneOtpApple,
		onError: async (error) => {
			console.log('error from react query', error);
		},
		onSuccess: async (data) => {
			console.log('data from react query', data);
			setAuth(data);
		},
	});
};
