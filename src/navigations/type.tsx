import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
	Home: NavigatorScreenParams<HomeTabParamList>;
	OnBoarding: undefined;
	Appartment: undefined;
	CheckRoute: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
	Home: undefined;
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
