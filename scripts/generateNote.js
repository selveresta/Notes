import { getDatesFromString } from "./string.js";

export const generateNote = () => {
	const name = document.getElementById("inputName");
	const type = document.getElementById("selectType");
	const content = document.getElementById("content");
	const dateCreated = new Date(Date.now());
	if (name.value != "" && type.options[type.selectedIndex].text != "" && content.value != "") {
		return {
			name: name.value,
			dateCreated: dateCreated.getMonth() + "." + dateCreated.getDay() + "." + dateCreated.getFullYear(),
			category: type.options[type.selectedIndex].text,
			content: content.value,
			dates: getDatesFromString(content.value),
			active: true,
		};
	}
};
