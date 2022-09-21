import { archiveArray, clearArchiveArray, deleteArchiveNote, notesArray } from "./arrays.js";
import { MoveAllFromArchive, moveNoteFromArchive } from "./moving.js";
import { reRender } from "./script.js";
import { getDatesFromString } from "./string.js";

const archive = document.getElementById("archive");

export function renderArchiveTable(array, headerNames) {
	clearTable();
	let tableBody = document.createElement("tbody");

	let rowHeader = document.createElement("tr");

	headerNames.forEach((one) => {
		let cell = document.createElement("th");
		cell.appendChild(document.createTextNode(one));
		rowHeader.appendChild(cell);
	});

	createHeaderBtnActions(rowHeader);

	tableBody.appendChild(rowHeader);

	array.forEach((note) => {
		let row = document.createElement("tr");

		switch (note.category) {
			case "Task":
				let cell1 = document.createElement("td");
				let span1 = document.createElement("span");
				span1.innerHTML = `<img src="../icons/task.png" style="width:30px;height:30px;" />`;
				cell1.appendChild(span1);
				row.appendChild(cell1);
				break;
			case "Idea":
				let cell2 = document.createElement("td");
				let span2 = document.createElement("span");
				span2.innerHTML = `<img src="../icons/idea.png" style="width:30px;height:30px;" />`;
				cell2.appendChild(span2);
				row.appendChild(cell2);
				break;
			case "Random Thought":
				let cell3 = document.createElement("td");
				let span3 = document.createElement("span");
				span3.innerHTML = `<img src="../icons/RT.png" style="width:30px;height:30px;" />`;
				cell3.appendChild(span3);
				row.appendChild(cell3);
				break;
			default:
				break;
		}

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
		createBtnsActionOfNote(row, note);
		tableBody.appendChild(row);
	});

	archive.appendChild(tableBody);
}

const createHeaderBtnActions = (rowHeader) => {
	let cellBtn = document.createElement("th");

	let btnAllDeArchive = document.createElement("button");
	btnAllDeArchive.innerHTML = `<img src="../icons/archive.png" style="width:15px;height:15px;" />`;
	btnAllDeArchive.style.margin = "5px";
	btnAllDeArchive.addEventListener("click", () => {
		MoveAllFromArchive(notesArray, archiveArray, clearArchiveArray);
		reRender();
	});

	let btnDeleteAll = document.createElement("button");
	btnDeleteAll.innerHTML = `<img src="../icons/delete.png" style="width:15px;height:15px;" />`;
	btnDeleteAll.style.margin = "5px";
	btnDeleteAll.addEventListener("click", () => {
		clearArchiveArray();
		reRender();
	});

	cellBtn.appendChild(document.createElement("td").appendChild(btnAllDeArchive));
	cellBtn.appendChild(document.createElement("td").appendChild(btnDeleteAll));

	rowHeader.appendChild(cellBtn);
};

const createBtnsActionOfNote = (row, note) => {
	let cellBtn = document.createElement("td");

	let btnEdit = document.createElement("button");
	btnEdit.innerHTML = `<img src="../icons/edit.png" style="width:15px;height:15px;" />`;
	btnEdit.style.margin = "5px";

	btnEdit.setAttribute("data-bs-toggle", "modal");
	btnEdit.setAttribute("data-bs-target", "#EditModal");
	btnEdit.myParam = note;
	btnEdit.addEventListener("click", (e) => {
		let btnSave = document.getElementById("SaveNoteBtn");
		btnSave.myParam = note;

		let editName = document.getElementById("EditInputName");
		let editCategory = document.getElementById("EditSelectType");
		let editContent = document.getElementById("EditContent");

		btnSave.addEventListener("click", (e) => {
			console.log(e);
			console.log(e.currentTarget.myParam);
			let tmpNote = e.currentTarget.myParam;
			tmpNote.name = editName.value;
			tmpNote.category = editCategory.options[editCategory.selectedIndex].text;
			tmpNote.content = editContent.value;
			tmpNote.dates = getDatesFromString(editContent.value);
			reRender();
		});

		editName.value = note.name;
		switch (note.type) {
			case "Task":
				editCategory.selectedIndex = 0;
				break;
			case "Idea":
				editCategory.selectedIndex = 1;
				break;
			case "Random Thought":
				editCategory.selectedIndex = 2;
				break;
		}
		editContent.value = note.content;
	});

	let btnDeArchive = document.createElement("button");
	btnDeArchive.innerHTML = `<img src="../icons/archive.png" style="width:15px;height:15px;" />`;
	btnDeArchive.style.margin = "5px";

	btnDeArchive.addEventListener("click", () => {
		moveNoteFromArchive(notesArray, note);
		deleteArchiveNote(note);
		reRender();
	});

	let btnDelete = document.createElement("button");
	btnDelete.innerHTML = `<img src="../icons/delete.png" style="width:15px;height:15px;" />`;
	btnDelete.style.margin = "5px";

	btnDelete.addEventListener("click", () => {
		deleteArchiveNote(note);
		reRender();
	});

	cellBtn.appendChild(btnEdit);
	cellBtn.appendChild(btnDeArchive);
	cellBtn.appendChild(btnDelete);

	row.appendChild(cellBtn);
};

const clearTable = () => {
	while (archive.children.length != 0) {
		archive.removeChild(archive.lastElementChild);
	}
};
