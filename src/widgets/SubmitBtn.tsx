import AppButton from '@src/shared/ui/AppButton';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { View, StyleSheet, Button } from 'react-native';

interface Props {
	title: string;
	busy?: boolean;
	disabled?: boolean;
}

const SubmitBtn: FC<Props> = (props: Props) => {
	const { handleSubmit, isValid } = useFormikContext();
	return <AppButton disabled={!isValid} title={props.title} onPress={handleSubmit} busy={props.busy} />;
};

const styles = StyleSheet.create({
	container: {},
});

export default SubmitBtn;
