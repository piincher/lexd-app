import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface Props {}

const ActiveOrderdetails: FC<Props> = () => {
	return (
		<View style={styles.container}>
			<Text>Active order details</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default ActiveOrderdetails;
