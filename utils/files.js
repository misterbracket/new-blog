import fs from 'fs';
import path from 'path';

export const delDirPromise = dirPath =>
	new Promise((resolve, reject) => {
		fs.rmdir(dirPath, err => {
			err ? reject(err) : resolve();
		});
	});

export const mkDirPromise = dirPath =>
	new Promise((resolve, reject) => {
		fs.mkdir(dirPath, err => {
			err ? reject(err) : resolve();
		});
	});

// Simple promise wrappers for read/write files.
// utf-8 is assumed.
export const readFilePromise = fileLocation =>
	new Promise((resolve, reject) => {
		fs.readFile(fileLocation, 'utf-8', (err, text) => {
			err ? reject(err) : resolve(text);
		});
	});

export const writeFilePromise = (fileLocation, fileContent) =>
	new Promise((resolve, reject) => {
		fs.writeFile(fileLocation, fileContent, 'utf-8', err => {
			err ? reject(err) : resolve();
		});
	});

// Somewhat counter-intuitively, `fs.readFile` works relative to the current
// working directory (if the user is in their own project, it's relative to
// their project). This is unlike `require()` calls, which are always relative
// to the code's directory.
export const readFilePromiseRelative = fileLocation =>
	readFilePromise(path.resolve(fileLocation));
