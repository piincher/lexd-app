import AppButton from '@src/components/AppButton/AppButton';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { View, StyleSheet, Button } from 'react-native';

interface Props {
	title: string;
	busy?: boolean;
}

const SubmitBtn: FC<Props> = (props: Props) => {
	const { handleSubmit } = useFormikContext();
	return <AppButton title={props.title} onPress={handleSubmit} busy={props.busy} />;
};

const styles = StyleSheet.create({
	container: {},
});

export default SubmitBtn;
