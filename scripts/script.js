const button = document.getElementById("button");
const notes = document.getElementById("notes");
const table = document.getElementById("table");
const archive = document.getElementById("archive");
const tablecategory = document.getElementById("categoryTable");

let notesArray = [
	{
		name: "asdasd",
		created: "1.1.1",
		category: "Task",
		content: "asdasdasd",
		dates: [],
		active: true,
	},
	{
		name: "asdasd",
		created: "1.1.1",
		category: "Task",
		content: "asdasdasd",
		dates: [],
		active: true,
	},
	{
		name: "asdasd",
		created: "1.1.1",
		category: "Task",
		content: "asdasdasd",
		dates: [],
		active: true,
	},
];

let archiveArray = [];

const typeCategoties = ["Task", "Random Thought", "Idea"];
const headerNames = ["Name", "Created", "Category", "Content", "Dates"];
const categortTableNames = ["Note Category", "Active", "Archived"];

button.addEventListener("click", () => {
	let note = {
		name: "",
		created: new Date(),
		category: "",
		content: "",
		dates: [],
		active: true,
	};
	note = generateNote(note);

	notesArray.push(note);
	createTableOfNotes();
	createTableofCategories();
});

const getDatesFromString = (content) => {
	if (content.length === 0) {
		return [];
	}
	return content.match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g);
};

const generateNote = (note) => {
	note.name = prompt("Enter name:", "");
	let tmpDate = new Date(Date.now());
	note.created = tmpDate.getMonth() + "." + tmpDate.getDay() + "." + tmpDate.getFullYear();
	let flag = false;
	do {
		if (flag) {
			note.category = prompt("Enter valid category(Task, Random Thought, Idea)", "");
		} else {
			note.category = prompt("Enter category(Task, Random Thought, Idea)", "");
			flag = true;
		}
	} while (!typeCategoties.includes(note.category));

	note.content = prompt("Enter content of note", "");

	note.dates = getDatesFromString(note.content);

	return note;
};

const createTableOfNotes = () => {
	clearTable();
	let tableBody = document.createElement("tbody");

	let rowHeader = document.createElement("tr");
	headerNames.forEach((one) => {
		var cell = document.createElement("th");
		cell.appendChild(document.createTextNode(one));
		rowHeader.appendChild(cell);
	});

	tableBody.appendChild(rowHeader);

	notesArray.forEach((note) => {
		let row = document.createElement("tr");

		for (const key in note) {
			if (key === "active") {
				continue;
			}
			const element = note[key];

			var cell = document.createElement("td");
			if (element == null) {
				cell.appendChild(document.createTextNode(""));
			} else cell.appendChild(document.createTextNode(element));
			row.appendChild(cell);
		}

		tableBody.appendChild(row);
	});

	table.appendChild(tableBody);
};

const createTableofCategories = () => {
	clearTableCategory();
	let tableBody = document.createElement("tbody");

	let rowHeader = document.createElement("tr");
	categortTableNames.forEach((one) => {
		var cell = document.createElement("th");
		cell.appendChild(document.createTextNode(one));
		rowHeader.appendChild(cell);
	});

	tableBody.appendChild(rowHeader);

	let activeIdea = 0;
	let archiveIdea = 0;

	let activeTask = 0;
	let archiveTask = 0;

	let activeRandom = 0;
	let acrhiveRandom = 0;

	notesArray.forEach((note) => {
		switch (note.category) {
			case "Idea":
				if (note.active) {
					activeIdea++;
				} else archiveIdea++;
				break;
			case "Task":
				if (note.active) {
					activeTask++;
				} else archiveTask++;
				break;
			case "Random Thought":
				if (note.active) {
					activeRandom++;
				} else acrhiveRandom++;
				break;
		}
	});

	typeCategoties.forEach((category) => {
		switch (category) {
			case "Idea":
				let rowIdea = document.createElement("tr");
				let cell1 = document.createElement("td");
				let cell2 = document.createElement("td");
				let cell3 = document.createElement("td");
				cell1.appendChild(document.createTextNode(category));
				cell2.appendChild(document.createTextNode(activeIdea));
				cell3.appendChild(document.createTextNode(archiveIdea));
				rowIdea.appendChild(cell1);
				rowIdea.appendChild(cell2);
				rowIdea.appendChild(cell3);

				tableBody.appendChild(rowIdea);
				break;
			case "Task":
				let rowTask = document.createElement("tr");

				let cell4 = document.createElement("td");
				let cell5 = document.createElement("td");
				let cell6 = document.createElement("td");
				cell4.appendChild(document.createTextNode(category));
				cell5.appendChild(document.createTextNode(activeTask));
				cell6.appendChild(document.createTextNode(archiveTask));
				rowTask.appendChild(cell4);
				rowTask.appendChild(cell5);
				rowTask.appendChild(cell6);

				tableBody.appendChild(rowTask);
				break;
			case "Random Thought":
				let rowRandom = document.createElement("tr");

				let cell7 = document.createElement("td");
				let cell8 = document.createElement("td");
				let cell9 = document.createElement("td");
				cell7.appendChild(document.createTextNode(category));
				cell8.appendChild(document.createTextNode(activeRandom));
				cell9.appendChild(document.createTextNode(acrhiveRandom));
				rowRandom.appendChild(cell7);
				rowRandom.appendChild(cell8);
				rowRandom.appendChild(cell9);

				tableBody.appendChild(rowRandom);
				break;
		}
	});

	tablecategory.appendChild(tableBody);
};

const clearTable = () => {
	while (table.children.length != 0) {
		table.removeChild(table.lastElementChild);
	}
};

const clearTableCategory = () => {
	while (tablecategory.children.length != 0) {
		tablecategory.removeChild(tablecategory.lastElementChild);
	}
};

createTableOfNotes();
createTableofCategories();
