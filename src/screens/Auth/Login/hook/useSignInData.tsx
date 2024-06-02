import { create } from 'zustand';
interface Codes {
	label: string;
	value: string;
} // country code object for picker type definition

const code: Array<Codes> = [
	{
		label: '+223',
		value: '+223',
	},
	{
		label: '+225',
		value: '+225',
	},
];

interface SignupState {
	errors: any;
	code: Array<Codes>;
	countryCode: string;
}

const initialSignupState: SignupState = {
	errors: {},
	code: code,
	countryCode: '223',
};

export const useSignupStore = create((set) => ({
	signupState: initialSignupState,
	updateCode: (countryCode: string) => {
		set(() => ({ signupState: { countryCode } }));
	},
}));
