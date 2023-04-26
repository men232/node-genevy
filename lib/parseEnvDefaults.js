const patterns = [
	// e.g. process.env.REACT_APP_API_SERVER || 'api.example.com'
	/process\.env\.(\w*)\s?\|\|\s?'(.*)'/i,

	// e.g. process.env.REACT_APP_API_SERVER || "api.example.com"
	/process\.env\.(\w*)\s?\|\|\s?"(.*)"/i,

	// special cases
	/env\.string\(\s*['|"](\w*)['|"]\s*\,\s*['|"](.*)['|"]/i,
	/env\.bool\(\s*['|"](\w*)['|"]\s*\,\s*(true|false)\s*\)/i,
	/env\.int\(\s*['|"](\w*)['|"]\s*\,\s*(.*)\s*\)/i,
	/env\.list\(\s*['|"](\w*)['|"]\s*\,.*\,\s*\[\s*(.*)\s*\]/i
];

module.exports = function parseEnvDefaults(sourceText) {
	const map = new Map();

	for (const regexp of patterns) {
		let text = sourceText;

		while (text) {
			const match = text.match(regexp);
			if (!match) break;

			let [fullMatch, variableName, defaultValue] = match;

			if (!variableName) break;

			if (fullMatch.startsWith('env.list')) {
				try {
					defaultValue = JSON.parse(`[${defaultValue.replace(/'/g, '"')}]`).join(',');
				} catch(_) {
					defaultValue = '';
				}
			}

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
};
