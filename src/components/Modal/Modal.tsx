import { Fonts } from '@src/constants/Fonts';
import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CustomModalProps {
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	message?: string;
	confirmText?: string;
	cancelText?: string;
	styles?: {
		centeredView?: StyleProp<ViewStyle>;
		modalView?: StyleProp<ViewStyle>;
		modalText?: StyleProp<TextStyle>;
		messageText?: StyleProp<TextStyle>;
		buttonContainer?: StyleProp<ViewStyle>;
		cancelText?: StyleProp<TextStyle>;
		confirmText?: StyleProp<TextStyle>;
	};
}

export const CustomModal = ({
	visible,
	onClose,
	onConfirm,
	title = 'Colis recu?',
	message = 'Êtes-vous sûr(e) de vouloir confirmer la reception du colis?',
	confirmText = 'Confirmer',
	cancelText = 'Annuler',
	styles: customStyles = {},
}: CustomModalProps) => {
	return (
		<Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onClose}>
			<View style={[styles.centeredView, customStyles.centeredView]}>
				<View style={[styles.modalView, customStyles.modalView]}>
					<Text style={[styles.modalText, customStyles.modalText]}>{title}</Text>
					<Text style={[styles.messageText, customStyles.messageText]}>{message}</Text>
					<View style={[styles.buttonContainer, customStyles.buttonContainer]}>
						<Pressable onPress={onClose}>
							<Text style={[styles.cancelText, customStyles.cancelText]}>{cancelText}</Text>
						</Pressable>
						<Pressable onPress={onConfirm}>
							<Text style={[styles.confirmText, customStyles.confirmText]}>{confirmText}</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontSize: 20,
		fontFamily: Fonts.bold,
	},
	messageText: {
		fontFamily: Fonts.regular,
		textAlign: 'center',
		fontSize: 26,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 16,
		width: '100%',
	},
	cancelText: {
		color: 'red',
		textAlign: 'center',
		marginRight: 10,
		fontFamily: Fonts.black,
		fontSize: 20,
	},
	confirmText: {
		color: 'green',
		textAlign: 'center',
		fontFamily: Fonts.black,
		fontSize: 20,
	},
});
