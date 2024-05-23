import { Formik, FormikHelpers } from 'formik';
import React, { FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface Props<T> {
	initialValues: any;
	children: ReactNode;
	validationSchema: any;
	onSubmit: ((values: T, formikHelpers: FormikHelpers<any>) => void | Promise<any>) & ((values: any) => void);
}

const Form = <T extends object>(props: Props<T>) => {
	return (
		<Formik initialValues={props.initialValues} onSubmit={props.onSubmit} validationSchema={props.validationSchema}>
			{props.children}
		</Formik>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default Form;
