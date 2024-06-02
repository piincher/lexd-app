import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
	HomeTab: NavigatorScreenParams<HomeTabParamList>;
	OnBoarding: undefined;
	CheckRoute: undefined;
	AddOrder: {
		userId: string;
		clientName: string;
		phoneNumber: string;
	};
	ActiveOrder: undefined;
	Login: undefined;
	Verification: { phoneNumber: string };
	OrderDetail: { id: string };
	ChatRoom: { id: string };
	SelectAdminToChatWith: undefined;
	SelectUser: undefined;
	PastOrders: undefined;
	AboutUs: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
	Home: undefined;
	Chat: undefined;
	Profile: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<HomeTabParamList, T>,
	RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
