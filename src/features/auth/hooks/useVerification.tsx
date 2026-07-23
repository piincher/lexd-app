import { useNavigation } from '@react-navigation/native';
import { verifyPhoneOtp } from '../api';
import { useAuth } from '@src/store/Auth';
import { useMutation } from '@tanstack/react-query';

export const useVerification = () => {
	const navigation = useNavigation();
	const setAuth = useAuth((state) => state.setAuth);
	
	return useMutation({
		mutationFn: verifyPhoneOtp,
		onSuccess: async (data) => {
			setAuth(data);
			console.log('data from react query', data);
		},
	});
};
