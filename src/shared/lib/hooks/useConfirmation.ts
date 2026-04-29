import { useState } from 'react';

export const useConfirmationNotification = () => {
	const [visible, setVisible] = useState(false);
	const onDismissSnackBar = () => setVisible(false);

	return { visible, setVisible, onDismissSnackBar };
};
