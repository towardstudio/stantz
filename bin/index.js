#!/usr/bin/env node

fs = require('fs')
const yargs = require("yargs");
const crypto = require('crypto')
const hash = generateHash();

const options = yargs
	.usage("Usage: -t <target> -f <file>")
	.option("t", { 
		alias: "target", 
		describe: "The file(s) to check for links to cachebust", 
		type: "array", 
		demandOption: true 
	})
	.option("f", { 
		alias: "file", 
		describe: "The file name(s) (e.g. style.css, app.js, etc", 
		type: "array", 
		demandOption: true 
	})
	.argv;

const targets = options.target
const files = options.file

function generateHash() {
	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	
	return crypto.createHash('md5').update(current_date + random).digest('hex');
}

targets.forEach((target) => {

	let result;

	fs.readFile(target, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}

		result = data
		
		files.forEach((file) => {

			let fileTest = file.replace('.', '\\.')
			let regex = new RegExp('(' + fileTest + ')(\\?v=)?([a-zA-Z0-9]+?(?=\\"|\'))?', 'g')
			let match = regex.exec(data);
			let fileName = match ? match[1] : null
			let query = match ? match[2] : null
			let oldhash = match ? match[3] : null

			result = result.replace(regex, `$1?v=${hash}`)
			
			if(result) {
				fs.writeFile(target, result, function (err) {
					if (err) {
						return console.log(err);
					}

				});
			}
		});

	});

	
});