import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./type";

/**
 * Shared navigation ref for use outside of React components.
 * Pass this as the `ref` prop to NavigationContainer.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
