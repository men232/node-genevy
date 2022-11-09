const patterns = [
	// e.g. process.env.REACT_APP_API_SERVER || 'api.example.com'
	/process\.env\.(\w*)\s?\|\|\s?'(.*)'/i,

	// e.g. process.env.REACT_APP_API_SERVER || "api.example.com"
	/process\.env\.(\w*)\s?\|\|\s?"(.*)"/i,
];

module.exports = function parseEnvDefaults(sourceText) {
	const map = new Map();

	for (const regexp of patterns) {
		let text = sourceText;

		while(text) {
			const match = text.match(regexp);
			if (!match) break;

			const [fullMatch, variableName, defaultValue] = match;
			if (!variableName) break;

			if (map.has(variableName)) {
				if (!map.get(variableName).includes(defaultValue)) {
					map.get(variableName).push(defaultValue);
				}
			} else {
				map.set(variableName, [defaultValue]);
			}

			text = text.slice(match.index + fullMatch.length);
		}
	}

	return map;
}
