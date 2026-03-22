// OnboardingSlide - individual slide data
export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: any; // Image source
  bgColor: string;
}

// OnboardingState
export interface OnboardingState {
  currentIndex: number;
  isLastSlide: boolean;
}
