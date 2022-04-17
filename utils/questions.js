export default [
	{
		type: 'input',
		name: 'title',
		message: "What's the title of the new post?",
		default: 'My new post',
		filter(val) {
			return `"${val}"`;
		}
	},
	{
		type: 'input',
		name: 'description',
		message: 'What is the new post about?',
		default: 'This is about life and all the beautiful things.',
		filter(val) {
			return `"${val}"`;
		}
	},
	{
		type: 'input',
		name: 'date',
		default: '2020-12-31',
		message: 'What will be the publishing date?',
		validate(value) {
			const pass = value.match(/^\d\d\d\d-\d\d-\d\d$/i);
			if (pass) {
				return true;
			}
			return 'Please enter a valid date (dd/mm/yyyy)';
		}
	},
	{
		type: 'list',
		name: 'blogType',
		message: 'What type of post will this be?',
		choices: ['Essay', 'Note'],
		filter(val) {
			return `"${val.toLowerCase()}"`;
		}
	}
];
