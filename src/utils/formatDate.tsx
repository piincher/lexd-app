export const formatDate = (dateToConvert: string) => {
	const date = dateToConvert ? new Date(dateToConvert) : new Date();
	const formattedDateTime = date.toISOString().replace('T', ' ').slice(0, -5);
	return formattedDateTime;
};
