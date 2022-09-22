import { generateNote } from "./generateNote.js";
import { renderArchiveTable } from "./renderArchiveTable.js";
import { renderCategoryTable } from "./renderCategoryTable.js";
import { renderNotesTable } from "./renderNotesTable.js";

import { notesArray, archiveArray, headerNames, categoryTableNames } from "./arrays.js";
const createNote = document.getElementById("createNoteBtn");

createNote.onclick = () => {
	if (generateNote() !== undefined) {
		notesArray.push(generateNote());
	}
	renderNotesTable(notesArray, headerNames);
	renderCategoryTable(notesArray, archiveArray, categoryTableNames);
};

export const reRender = () => {
	renderNotesTable(notesArray, headerNames);
	renderArchiveTable(archiveArray, headerNames);
	renderCategoryTable(notesArray, archiveArray, categoryTableNames);
};

reRender();
