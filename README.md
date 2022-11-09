## Intro

Genevy is a tool to generate `.env` file from your source code.

### Install
```bash
npm i genevy -D
```

### Usage
Most users use npx to run Genevy on the command line like this:
```bash
# Run on project
npx genevy "**/*{.js,.cjs,.ts}" -o .env --merge

# Run on file
npx genevy "config/production.js" -o .env.production --merge
```

### Options
The command line utility has several options. You can view the options by running `npx genevy --help`

```
Usage: genevy [options] <pattern>

CLI to generate .env file from source code.

Arguments:
  pattern                           pattern

Options:
  -V, --version                     output the version number
  -o, --output <string>             generate output file
  -i, --ignore <list>               ignore patterns (comma separated list) (default: "node_modules, .git, .svn, .hg")
  -m, --merge                       merge result with output file (default: false)
  --ignoreMismatch <list>           ignore patterns when duplicate defaults usage detected (comma separated list) (default: "config/*.*")
  --ignoreMismatchVariables <list>  ignore specific variables when duplicate defaults usage detected (comma separated list) (default: "NODE_ENV")
  --groupPrefixDepth <int>          group variables by prefix depth (default: 2)
  --groupList <list>                group variables by prefixes list (default: "")
  -h, --help                        display help for command

```
Options that accept array values can be specified with a comma-delimited list.

Example:
```bash
# This example group GOOGLE_ variables in single section.
npx genevy "**/*{.js,.cjs,.ts}" -o .env --merge --groupList "GOOGLE"
```
### --merge
This option makes only appends new variables that are not defined in your `.env` file. 
