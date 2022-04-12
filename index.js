#!/usr/bin/env node

/**
 * new-blog
 * Creates a new MDX file and frontmatter header for my blog
 *
 * @author Max Klammer <http://maxklammer.com>
 */

import inquirer from 'inquirer';
import init from './utils/init.js';
import cli from './utils/cli.js';
import questions from './utils/questions.js';
import createPost from './utils/createPost.js';

const input = cli.input;
const flags = cli.flags;
const { clear } = flags;

init({ clear });
input.includes(`help`) && cli.howHelp(0);

inquirer
	.prompt(questions)
	.then(answers => {
		createPost(answers);
	})
	.catch(error => {
		if (error.isTtyError) {
			// Prompt couldn't be rendered in the current environment
			console.error(`Could not render the prompt`);
		}
		console.error(error);
	});
