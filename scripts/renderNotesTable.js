const table = document.getElementById("table");

export function renderNotesTable(array, headerNames) {
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
		createBtnsActionOfNote(row);
		tableBody.appendChild(row);
	});

	table.appendChild(tableBody);
}

const createHeaderBtnActions = (rowHeader) => {
	let cellBtn = document.createElement("th");

	let btnAllArchive = document.createElement("button");
	btnAllArchive.innerHTML = `<img src="../icons/archive.png" style="width:15px;height:15px;" />`;
	btnAllArchive.style.margin = "5px";
	btnAllArchive.addEventListener("click", () => {});

	let btnDeleteAll = document.createElement("button");
	btnDeleteAll.innerHTML = `<img src="../icons/delete.png" style="width:15px;height:15px;" />`;
	btnDeleteAll.style.margin = "5px";
	btnDeleteAll.addEventListener("click", () => {});

	cellBtn.appendChild(document.createElement("td").appendChild(btnAllArchive));
	cellBtn.appendChild(document.createElement("td").appendChild(btnDeleteAll));

	rowHeader.appendChild(cellBtn);
};

const createBtnsActionOfNote = (row) => {
	let cellBtn = document.createElement("td");

	let btnEdit = document.createElement("button");
	btnEdit.innerHTML = `<img src="../icons/edit.png" style="width:15px;height:15px;" />`;
	btnEdit.style.margin = "5px";

	btnEdit.addEventListener("click", () => {});

	let btnArchive = document.createElement("button");
	btnArchive.innerHTML = `<img src="../icons/archive.png" style="width:15px;height:15px;" />`;
	btnArchive.style.margin = "5px";

	btnArchive.addEventListener("click", () => {});

	let btnDelete = document.createElement("button");
	btnDelete.innerHTML = `<img src="../icons/delete.png" style="width:15px;height:15px;" />`;
	btnDelete.style.margin = "5px";

	btnDelete.addEventListener("click", () => {});

	cellBtn.appendChild(btnEdit);
	cellBtn.appendChild(btnArchive);
	cellBtn.appendChild(btnDelete);

	row.appendChild(cellBtn);
};

const clearTable = () => {
	while (table.children.length != 0) {
		table.removeChild(table.lastElementChild);
	}
};
