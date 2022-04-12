import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

export const readFilePromiseRelative = fileLocation => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	return readFilePromise(path.join(__dirname, fileLocation));
};
