// Profile Feature - Public API

// Screens
export { default as ProfileScreen } from "./screens/Profile";
export { default as AboutUsScreen } from "./screens/AboutUs";
export { default as PastOrdersScreen } from "./screens/PastOrders";

export { default as NotificationSettingsScreen } from "./screens/NotificationSettingsScreen";
export { default as CertificateDetailScreen } from "./screens/CertificateDetail";
export { default as BadgesScreen } from "./screens/BadgesScreen";
export { default as TrustProfileScreen } from "./screens/TrustProfileScreen";
export { default as MyReviewsScreen } from "../customer/reviews/screens/MyReviewsScreen";
export { ReviewsSection } from "./components/ReviewsSection";

// Hooks
export { useGetCurrentUser, useBalance, useInitiateTopUp } from "./hooks/useProfile";
export { useCertificateProgress } from "./hooks/useCertificate";
export { useMilestoneProgress } from "./hooks/useMilestones";
export { useMyBadges, useCheckBadges, useAllBadges } from "./hooks/useBadges";
export { useTrustProfile } from "./hooks/useTrustProfile";
export { useShareTrustProfile } from "./hooks/useShareTrustProfile";
