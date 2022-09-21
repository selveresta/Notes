export function MoveAllToArchive(notesArray, archiveArray, cb) {
	for (let i = 0; i < notesArray.length; i++) {
		archiveArray.push(notesArray[i]);
		archiveArray[i].active = false;
	}
	cb();
}

export function MoveAllFromArchive(notesArray, archiveArray, cb) {
	for (let i = 0; i < archiveArray.length; i++) {
		archiveArray[i].active = true;
		notesArray.push(archiveArray[i]);
	}
	cb();
}

export const moveNoteToArchive = (note, archiveArray) => {
	note.active = false;
	archiveArray.push(note);
};

export const moveNoteFromArchive = (notesArray, note) => {
	note.active = true;
	notesArray.push(note);
};
