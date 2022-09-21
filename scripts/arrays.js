export let notesArray = [
	{
		name: "asdasd",
		dateCreated: "1.1.1",
		category: "Idea",
		content: "asdasdasd",
		dates: [],
		active: true,
	},
	{
		name: "asdasd",
		dateCreated: "1.1.1",
		category: "Task",
		content: "asdasdasd",
		dates: [],
		active: true,
	},
	{
		name: "asdasd",
		dateCreated: "1.1.1",
		category: "Task",
		content: "asdasdasd",
		dates: [],
		active: true,
	},
];

export let archiveArray = [];

export const headerNames = ["", "Name", "Created", "Category", "Content", "Dates"];
export const categoryTableNames = ["Note Category", "Active", "Archived"];

export const clearNotesArray = () => {
	notesArray = [];
};

export const deleteNote = (note) => {
	notesArray = arrayRemove(notesArray, note);
};

export const clearArchiveArray = () => {
	archiveArray = [];
};

export const deleteArchiveNote = (note) => {
	archiveArray = arrayRemove(archiveArray, note);
};

function arrayRemove(arr, value) {
	return arr.filter(function (ele) {
		return ele != value;
	});
}
