const tablecategory = document.getElementById("categoryTable");

export function renderCategoryTable(notesArray, archiveArray, headerNames) {
	clearTableCategory();

	const typeCategoties = ["Task", "Random Thought", "Idea"];
	let tableBody = document.createElement("tbody");

	let rowHeader = document.createElement("tr");
	rowHeader.appendChild(document.createElement("th"));

	headerNames.forEach((one) => {
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

	notesArray.forEach((note) => {
		switch (note.category) {
			case "Idea":
				if (note.active) activeIdea++;
				break;
			case "Task":
				if (note.active) activeTask++;
				break;
			case "Random Thought":
				if (note.active) activeRandom++;
				break;
		}
	});

	archiveArray.forEach((note) => {
		switch (note.category) {
			case "Idea":
				if (!note.active) archiveIdea++;
				break;
			case "Task":
				if (!note.active) archiveTask++;
				break;
			case "Random Thought":
				if (!note.active) acrhiveRandom++;
				break;
		}
	});

	typeCategoties.forEach((category) => {
		switch (category) {
			case "Idea":
				let rowIdea = document.createElement("tr");

				let cellImg1 = document.createElement("td");
				let span1 = document.createElement("span");
				span1.innerHTML = `<img src="../icons/idea.png" style="width:30px;height:30px;" />`;
				cellImg1.appendChild(span1);
				rowIdea.appendChild(cellImg1);

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

				let cellImg2 = document.createElement("td");
				let span2 = document.createElement("span");
				span2.innerHTML = `<img src="../icons/task.png" style="width:30px;height:30px;" />`;
				cellImg2.appendChild(span2);
				rowTask.appendChild(cellImg2);

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

				let cellImg3 = document.createElement("td");
				let span3 = document.createElement("span");
				span3.innerHTML = `<img src="../icons/RT.png" style="width:30px;height:30px;" />`;
				cellImg3.appendChild(span3);
				rowRandom.appendChild(cellImg3);

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
}

const clearTableCategory = () => {
	while (tablecategory.children.length != 0) {
		tablecategory.removeChild(tablecategory.lastElementChild);
	}
};
