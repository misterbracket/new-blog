import fs from 'fs';
import path from 'path';
import {
	delDirPromise,
	mkDirPromise,
	readFilePromiseRelative,
	writeFilePromise
} from './files.js';
import { logError, logSuccess } from './log.js';

const kebabCase = str =>
	str
		.match(
			/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
		)
		.join('-')
		.toLowerCase();

export default ({ description, title, blogType, date }) => {
	// Find the path to the selected template file.
	const templatePath = `./templates/index.mdx`;

	const directory = 'src/posts';

	// Get all of our file paths worked out, for the user's project.
	const blogDir = `${directory}/${kebabCase(title)}`;
	const filePath = `${blogDir}/index.mdx`;

	// Check to see if a directory at the given path exists
	const fullPathToParentDir = path.resolve(directory);
	if (!fs.existsSync(fullPathToParentDir)) {
		logError(
			`Sorry, you need to create the directory first.\n(@maxklammer/new-blog is looking for a directory at ${directory}).`
		);
		return;
	}

	// Check to see if this component has already been created
	const fullPathToBlogDir = path.resolve(blogDir);
	if (fs.existsSync(fullPathToBlogDir)) {
		logError(
			`Looks like this component already exists! There's already a component at ${blogDir}.\nPlease delete this directory and try again.`
		);
		return;
	}

	const blogAssetsDir = `${blogDir}/assets`;

	// Start by creating the directory that our blog will live in.
	mkDirPromise(blogDir)
		.then(() => readFilePromiseRelative(templatePath))
		.then(template => {
			logSuccess('Directory created.');
			return template;
		})
		.then(template =>
			// Replace our placeholders with real data
			template.replace(/TITLE/g, title)
		)
		.then(template =>
			// Replace our placeholders with real data
			template.replace(/DESCRIPTION/g, description)
		)
		.then(template =>
			// Replace our placeholders with real data
			template.replace(/TYPE/g, blogType)
		)
		.then(template =>
			// Replace our placeholders with real data
			template.replace(/DATE/g, date)
		)
		.then(template =>
			// Format it using prettier, to ensure style consistency, and write to file.
			writeFilePromise(filePath, template)
		)

		.then(template => {
			logSuccess('Created blog postand saved to disk.');
			return template;
		})

		.then(() =>
			// We also need a asset folder.
			mkDirPromise(`${blogAssetsDir}`)
		)
		.then(() => {
			logSuccess('Asset Directory created.');
		})
		.then(() => {
			logSuccess('All done!\n\n');
		})
		.catch(err => {
			console.error(err);
			delDirPromise(blogDir);
		});
};
