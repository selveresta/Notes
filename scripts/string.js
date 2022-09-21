export const getDatesFromString = (content) => {
	console.log(content);
	if (content.length === 0) {
		return [];
	}
	return content.match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g);
};
