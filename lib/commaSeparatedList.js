module.exports = function commaSeparatedList(value) {
	return value
		.split(',')
		.map((v) => v.trim())
		.filter((v) => !!v);
}
