// OnboardingSlide - individual slide data
export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: any; // Image source
}

// OnboardingState
export interface OnboardingState {
  currentIndex: number;
  isLastSlide: boolean;
}

// Onboarding Hook Return Type
export interface UseOnboardingReturn {
  currentIndex: number;
  scrollX: Animated.Value;
  isLastSlide: boolean;
  slides: OnboardingSlide[];
  goToNext: () => void;
  goToPrevious: () => void;
  goToSlide: (index: number) => void;
  completeOnboarding: () => void;
  handleScroll: any;
  onMomentumScrollEnd: (event: any) => void;
  flatListRef: React.RefObject<any>;
}

// Import Animated for type definition
import { Animated } from "react-native";
