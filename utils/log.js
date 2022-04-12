import alert from 'cli-alerts';

export const logError = msg => {
	alert({
		type: `error`,
		name: `ERROR`,
		msg: msg
	});
};
export const logSuccess = msg => {
	alert({
		type: `success`,
		name: `Success`,
		msg: msg
	});
};
