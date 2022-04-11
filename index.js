#!/usr/bin/env node

/**
 * new-blog
 * Creates a new MDX file and frontmatter header for my blog
 *
 * @author Max Klammer <http://maxklammer.com>
 */

import init from './utils/init.js';
import { input as _input, flags as _flags, showHelp } from './utils/cli.js';
import log from './utils/log.js';

const input = _input;
const flags = _flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && showHelp(0);

	debug && log(flags);
})();
