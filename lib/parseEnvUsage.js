const commaSeparatedList = require('./commaSeparatedList');

const patterns = [
	// e.g. process.env['REACT_APP_API_SERVER']
	/process\.env\['(\w*)']/i,
	// e.g. process.env["REACT_APP_API_SERVER"]
	/process\.env\["(\w*)"]/i,
	// e.g. process.env.REACT_APP_API_SERVER
	/process\.env\.(\w*)/i,
	// e.g. const { REACT_APP_API_SERVER, NODE_ENV } = process.env
	/{(.*)}\s*=\s*process\.env/i,
	// some gulp files like to shortcut with `const env = process.env`
	// /{(.*)}\s*=\s*env/i,

	// special cases
	/env\.string\(\s*['|"](\w*)['|"]/i,
	/env\.bool\(\s*['|"](\w*)['|"]/i,
	/env\.int\(\s*['|"](\w*)['|"]/i,
	/env\.list\(\s*['|"](\w*)['|"]/i,
	/env\.json\(\s*['|"](\w*)['|"]/i,
];

module.exports = function parseEnvUsage(sourceText) {
	const map = new Map();

	for (const regexp of patterns) {
		let text = sourceText;

		while(text) {
			const match = text.match(regexp);
			if (!match) break;

			const [fullMatch, matchedString] = match;
			if (!fullMatch) break;

			const list = commaSeparatedList(matchedString);

			for (const envVariable of list) {
				map.set(envVariable, true);
			}

			text = text.slice(match.index + fullMatch.length);
		}
	}

	return Array.from(map.keys());
}
