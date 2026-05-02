import { create } from 'zustand';

interface Codes {
  label: string;
  value: string;
}

const code: Codes[] = [
  { label: '🇲🇱  +223', value: '🇲🇱  +223' },
  { label: "🇨🇮  +225", value: "🇨🇮  +225" },
  { label: '🇸🇳  +221', value: '🇸🇳  +221' },
  { label: '🇧🇫  +226', value: '🇧🇫  +226' },
  { label: '🇬🇳  +224', value: '🇬🇳  +224' },
  { label: '🇹🇬  +228', value: '🇹🇬  +228' },
  { label: '🇧🇯  +229', value: '🇧🇯  +229' },
  { label: '🇬🇭  +233', value: '🇬🇭  +233' },
  { label: '🇨🇳  +86', value: '🇨🇳  +86' },
  { label: '🇫🇷  +33', value: '🇫🇷  +33' },
];

interface SignupState {
  errors: Record<string, string>;
  code: Codes[];
  countryCode: string;
}

interface SignupStore {
  signupState: SignupState;
  updateCode: (countryCode: string) => void;
}

const initialSignupState: SignupState = {
  errors: {},
  code: code,
  countryCode: '223',
};

export const useSignupStore = create<SignupStore>((set) => ({
  signupState: initialSignupState,
  updateCode: (countryCode: string) => {
    set((state) => ({
      signupState: { ...state.signupState, countryCode },
    }));
  },
}));
