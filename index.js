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
import log from './utils/log.js';
import questions from './utils/questions.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const kebabCase = str =>
	str
		.match(
			/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
		)
		.join('-')
		.toLowerCase();

init({ clear });
input.includes(`help`) && cli.howHelp(0);

inquirer
	.prompt(questions)
	.then(answers => {
		console.log(answers);
	})
	.catch(error => {
		if (error.isTtyError) {
			// Prompt couldn't be rendered in the current environment
			console.error(`Could not render the prompt`);
		}
		console.error(error);
	});

debug && log(flags);
