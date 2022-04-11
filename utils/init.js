import welcome from 'cli-welcome';
import unhandled from 'cli-handle-unhandled';

export default ({ clear = true }) => {
	unhandled();
	welcome({
		title: `new-blog`,
		tagLine: `by Max Klammer`,
		description:
			'Creates a new MDX file and frontmatter header for my blog',
		version: `0.0.1`,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear
	});
};
