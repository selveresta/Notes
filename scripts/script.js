const button = document.getElementById("button");
const notes = document.getElementById("notes");
const table = document.getElementById("table");
const archive = document.getElementById("archive");
const tablecategory = document.getElementById("categoryTable");

let notesArray = [
	{
		name: "asdasd",
		created: "1.1.1",
		category: "Idea",
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
		let cell = document.createElement("th");
		cell.appendChild(document.createTextNode(one));
		rowHeader.appendChild(cell);
	});

	let cellBtn = document.createElement("th");
	let btnAllArchive = document.createElement("button");
	btnAllArchive.innerText = "A";
	btnAllArchive.addEventListener("click", () => {
		changeStatusAllNotes();
		createTableofCategories();
		moveAllToArchive();
		createArchiveOfNotes();
		createTableOfNotes();
	});
	let btnDeleteAll = document.createElement("button");
	btnDeleteAll.innerText = "D";
	btnDeleteAll.addEventListener("click", () => {
		notesArray = [];
		createTableOfNotes();
		createTableofCategories();
	});

	cellBtn.appendChild(document.createElement("td").appendChild(btnAllArchive));
	cellBtn.appendChild(document.createElement("td").appendChild(btnDeleteAll));

	rowHeader.appendChild(cellBtn);

	tableBody.appendChild(rowHeader);

	notesArray.forEach((note) => {
		let row = document.createElement("tr");

		for (const key in note) {
			if (key === "active") {
				continue;
			}
			const element = note[key];

			let cell = document.createElement("td");
			if (element == null) {
				cell.appendChild(document.createTextNode(""));
			} else cell.appendChild(document.createTextNode(element));
			row.appendChild(cell);
		}

		let cellBtn = document.createElement("td");
		let btnEdit = document.createElement("button");
		btnEdit.innerText = "E";
		btnEdit.addEventListener("click", () => {
			EditNote(note);
			createTableOfNotes();
		});
		let btnArchive = document.createElement("button");
		btnArchive.innerText = "A";
		btnArchive.addEventListener("click", () => {
			moveNoteToArchive(note);
			createTableofCategories();
			createTableOfNotes();
			createArchiveOfNotes();
		});
		let btnDelete = document.createElement("button");
		btnDelete.innerText = "D";
		btnDelete.addEventListener("click", () => {
			notesArray = arrayRemove(notesArray, note);
			createTableOfNotes();
			createTableofCategories();
		});

		cellBtn.appendChild(btnEdit);
		cellBtn.appendChild(btnArchive);
		cellBtn.appendChild(btnDelete);

		row.appendChild(cellBtn);

		tableBody.appendChild(row);
	});

	table.appendChild(tableBody);
};

const createArchiveOfNotes = () => {
	clearArchive();
	let tableBody = document.createElement("tbody");

	let rowHeader = document.createElement("tr");
	headerNames.forEach((one) => {
		let cell = document.createElement("th");
		cell.appendChild(document.createTextNode(one));
		rowHeader.appendChild(cell);
	});

	let cellBtn = document.createElement("th");
	let btnAllDeArchive = document.createElement("button");
	btnAllDeArchive.innerText = "A";
	btnAllDeArchive.addEventListener("click", () => {
		changeStatusAllNotes();
		createTableofCategories();
		moveAllFromArchive();
		createArchiveOfNotes();
		createTableOfNotes();
	});
	let btnDeleteAllArchive = document.createElement("button");
	btnDeleteAllArchive.innerText = "D";
	btnDeleteAllArchive.addEventListener("click", () => {
		archiveArray = [];
		createArchiveOfNotes();
		createTableofCategories();
	});
	cellBtn.appendChild(document.createElement("td").appendChild(btnAllDeArchive));
	cellBtn.appendChild(document.createElement("td").appendChild(btnDeleteAllArchive));

	rowHeader.appendChild(cellBtn);

	tableBody.appendChild(rowHeader);

	archiveArray.forEach((note) => {
		let row = document.createElement("tr");

		for (const key in note) {
			if (key === "active") {
				continue;
			}
			const element = note[key];

			let cell = document.createElement("td");
			if (element == null) {
				cell.appendChild(document.createTextNode(""));
			} else cell.appendChild(document.createTextNode(element));
			row.appendChild(cell);
		}

		let cellBtn = document.createElement("td");
		let btnEdit = document.createElement("button");
		btnEdit.innerText = "E";
		btnEdit.addEventListener("click", () => {
			EditNote(note);
			createArchiveOfNotes();
		});
		let btnDeArchive = document.createElement("button");
		btnDeArchive.innerText = "A";
		btnDeArchive.addEventListener("click", () => {
			moveNoteFromArchive(note);
			createTableOfNotes();
			createArchiveOfNotes();
			createTableofCategories();
		});
		let btnDelete = document.createElement("button");
		btnDelete.innerText = "D";
		btnDelete.addEventListener("click", () => {
			archiveArray = arrayRemove(archiveArray, note);
			createArchiveOfNotes();
			createTableofCategories();
		});

		cellBtn.appendChild(btnEdit);
		cellBtn.appendChild(btnDeArchive);
		cellBtn.appendChild(btnDelete);

		row.appendChild(cellBtn);

		tableBody.appendChild(row);
	});

	archive.appendChild(tableBody);
};

const createTableofCategories = () => {
	clearTableCategory();
	let tableBody = document.createElement("tbody");

	let rowHeader = document.createElement("tr");
	categortTableNames.forEach((one) => {
		let cell = document.createElement("th");
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

	console.log(notesArray.length);
	console.log(archiveArray.length);

	if (notesArray.length == 0) {
		archiveArray.forEach((note) => {
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
	} else if (archiveArray.length == 0) {
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
	} else {
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
	}

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

function changeStatusAllNotes() {
	if (notesArray.length == 0) {
		archiveArray.forEach((note) => {
			note.active = !note.active;
		});
	} else if (archiveArray.length == 0) {
		notesArray.forEach((note) => {
			note.active = !note.active;
		});
	}
}

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

const clearArchive = () => {
	while (archive.children.length != 0) {
		archive.removeChild(archive.lastElementChild);
	}
};

const moveAllToArchive = () => {
	for (let i = 0; i < notesArray.length; i++) {
		archiveArray.push(notesArray[i]);
	}
	notesArray = [];
};

function arrayRemove(arr, value) {
	return arr.filter(function (ele) {
		return ele != value;
	});
}

const moveNoteToArchive = (note) => {
	note.active = false;
	archiveArray.push(note);
	notesArray = arrayRemove(notesArray, note);
};

const moveNoteFromArchive = (note) => {
	note.active = true;
	notesArray.push(note);
	archiveArray = arrayRemove(archiveArray, note);
};

const moveAllFromArchive = () => {
	for (let i = 0; i < archiveArray.length; i++) {
		notesArray.push(archiveArray[i]);
	}
	archiveArray = [];
};

const EditNote = (note) => {
	note.content = prompt("Enter new content", "");
};

createTableOfNotes();
createTableofCategories();
createArchiveOfNotes();
