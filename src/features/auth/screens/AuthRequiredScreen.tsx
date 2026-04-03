import React from "react";
import { AuthRequiredContent } from "../components/AuthRequiredContent";

interface AuthRequiredScreenProps {
   onLoginPress?: () => void;
}

/**
 * AuthRequiredScreen - Shown when user tries to access protected content
 *
 * This screen is a thin wrapper around AuthRequiredContent component.
 * All UI logic is extracted to the component for reusability and testability.
 *
 * Architecture:
 * - Screen: Navigation handling, route parameters
 * - Component: UI rendering, animations, user interactions
 */
export const AuthRequiredScreen: React.FC<AuthRequiredScreenProps> = ({ onLoginPress }) => {
   return <AuthRequiredContent onLoginPress={onLoginPress} />;
};

export default AuthRequiredScreen;
