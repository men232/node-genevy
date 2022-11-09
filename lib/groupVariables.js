const _startCase = require('lodash/startCase');
const _groupBy = require('lodash/groupBy');

module.exports = function groupVariables(
	list,
	{ prefixDepth = 2, prefixGroups = [] },
) {
	prefixGroups = prefixGroups.map(v => v.toLowerCase());

	const obj = _groupBy(list, (variableName) => {
		const groupPrefix = prefixGroups.find((groupName) =>
			variableName.toLowerCase().startsWith(groupName),
		);

		if (groupPrefix) {
			return _startCase(groupPrefix);
		}

		const prefix = variableName.split('_').slice(0, prefixDepth).join('_');

		return _startCase(prefix.toLowerCase());
	});

	return Object.keys(obj)
		.sort()
		.map((groupName) => ({
			groupName,
			variables: obj[groupName].sort(),
		}));
};
