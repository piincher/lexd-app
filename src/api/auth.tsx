import { userData, userType } from "../constants/types";
import axiosInstance from "./client";
const rootUrl = "/user";
const API_URL = {
   login: `${rootUrl}/login`,
   sendOtp: `${rootUrl}/send-otp`,
   verifyOtp: `${rootUrl}/verify-otp`,
   register: `${rootUrl}/register`,
   getCurrentUser: `${rootUrl}/currentUser`,
   sendPhoneOtp: `${rootUrl}/sendPhoneOtp`,
   verifyPhoneOtp: `${rootUrl}/verifyPhoneOtp`,
   fetchAllUsers: `${rootUrl}/allUsers`,

   // sendEmailOtp: `${rootUrl}/sendEmailOtp`,
   // verifyEmailOtp: `${rootUrl}/verifyEmailOtp`,
   // updateProfile: `${rootUrl}/updateProfile`,
   // adminUser: `${rootUrl}/adminUser`,
   // logout: `${rootUrl}/logout`,
   // forgotPassword: `${rootUrl}/forgotPassword`,
   // resetPassword: `${rootUrl}/resetPassword`,
   // deleteAccount: `${rootUrl}/deleteAccount`,
};
export interface userRegistrationType {
   firstName: string;
   lastName: string;
   phoneNumber?: string;
   role?: string;
}
export interface UserData {
   _id?: string;
   firstName: string;
   lastName: string;
   role: string;
   phoneNumber: string;
   avatar: {
      url: string;
      public_id: string;
   };
   referralCode: string;
   referredBy: string;
   balance: number;
   rewardPoints: number;
}
// export const login = async ({ identifier, password }: logincredential) => {
// 	// if (!Device.isDevice) {
// 	//   return;
// 	// }

// 	// const token = (
// 	//   await Notifications.getExpoPushTokenAsync({
// 	//     projectId: Constants?.expoConfig?.extra?.eas.projectId!,
// 	//   })
// 	// ).data;

// 	const response = await axiosInstance.post<userType>(API_URL.login, {
// 		identifier,
// 		password,
// 		// pushToken: token,
// 	});
// 	return response.data;
// };
export const register = async ({ firstName, lastName, phoneNumber }: userRegistrationType) => {
   const user = {
      firstName,
      lastName,
      phoneNumber,
   };
   const response = await axiosInstance.post<userType>(API_URL.register, user);
   return response.data;
};
export const sendPhoneOtp = async (phone: string) => {
   const response = await axiosInstance.post<{ ok: boolean }>(API_URL.sendPhoneOtp, { phone });
   return response.data;
};
export const verifyPhoneOtp = async (data: { phone: string; otp: string }) => {
   const response = await axiosInstance.post<{
      user: userRegistrationType;
      streamToken: string;
      token: string;
   }>(API_URL.verifyPhoneOtp, {
      phone: data.phone,
      otp: data.otp,
   });
   return response.data;
};

export const getCurrentUser = async () => {
   const response = await axiosInstance.get<UserData>(API_URL.getCurrentUser);
   return response.data;
};
export const fetchAllUsers = async () => {
   const response = await axiosInstance.get<userData[]>(API_URL.fetchAllUsers);
   return response.data;
};

// export const updateProfile = async (data: userData) => {
// 	const response = await axiosInstance.put<UserData>(API_URL.updateProfile, data);
// 	return response.data;
// };

// export const getAdminUSers = async (page: string) => {
// 	const response = await axiosInstance.get<UserData[]>(`${API_URL.adminUser}?page=${page}&limit=${LIMIT}`);

// 	return response.data;
// };

// export const deleteAccount = async ({ id }: { id: string }) => {
// 	const response = await axiosInstance.post<{ message: string }>(`${API_URL.deleteAccount}`, { id });

// 	return response.data;
// };

export const loginPhoneOtpApple = async (data: { phone: string }) => {
   const response = await axiosInstance.post<{
      user: userRegistrationType;
      streamToken: string;
      token: string;
   }>(API_URL.login, data);

   console.log("response", response.data);
   return response.data;
};
export const getBalance = async () => {
   console.log("getBalance");
   const response = await axiosInstance.get<{ balance: number }>(`topup/balance`);
   return response.data;
};
