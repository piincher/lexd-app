export const formatDate = (dateToConvert: string) => {
	const date = dateToConvert ? new Date(dateToConvert) : new Date();
	const formattedDateTime = date.toISOString().replace('T', ' ').slice(0, -5);
	return formattedDateTime;
};

export const getSafeDate = (inputDate) => {
	if (!inputDate) {
		return null; // Default date if undefined
	}

	const year = inputDate.getFullYear();
	const month = inputDate.getMonth();
	const day = inputDate.getDate();

	// Create a new date and add 1 day
	const newDate = new Date(year, month, day + 1);

	// Return the adjusted date
	return newDate;
};
