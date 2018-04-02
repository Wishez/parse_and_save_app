const fs = require("fs");
const path = require("path");
// https://github.com/cheeriojs/cheerio
const cheerio = require('cheerio');


function resolve(dir) {
    return path.resolve(__dirname, dir);
}

const sourceDir = resolve('files');
const distDir = resolve('dist');
// Поддиректории, из которых будут
// браться табличные данные.
const subDirs = ['1', '2', '3', '4', '5'];

function openAndParseFile({
	callback,
	filepath
}) {
	fs.open(filepath, 'r+', (err, data) => {
	    if (err) {
	        return console.error(err);
	    }
	    // Вызываю callback, если нужно.
	    if (callback) {
	    	callback();
	    }


	});
};

// Каррирую функцию, чтобы передать DOM контекст. 
function formateRow($) {

	return function(index, row) {
		const $row = $(row);
		// Проходимся по ячейкам строки.
		let finalHtml = '';

		$row
			.children()
			.each(function(index, element) {
				// Форматирование ячейки.
				const $ceil = $(this);
				let text = $ceil.text().trim();

				if (/(\d+\.\d+)/g.test(text)) {
					text = text.replace('.', ',');
				}

				finalHtml += `${text};`
			});

		return finalHtml;
	}
}


// Итерерирую каждую директорию.
subDirs.forEach((directory) => {
	const currentDir = `${sourceDir}/${directory}/`;

	// Прочитывю директорию.
	fs.readdir(currentDir, ( err, files ) => {
		console.log(err, files);
		// Перебираю каждый файл в директории.
		files.forEach(( file ) => {
			// Асинхроно читаю, форматирую и выкидываю в нужную директорию файл.
			fs.readFile(`${currentDir}/${file}`, ( error, data ) => {
				if (error) {
					return console.error(error);
				}
				const DOM = data.toString();
				// console.log(DOM);
				const $ = cheerio.load(DOM);
				// Decode.
				// https://github.com/cheeriojs/cheerio/issues/711
				
				const strings = $('thead')
					.siblings('tbody')
					.find('tr')
					// Проход по строкам таблицы.
					// https://github.com/cheeriojs/cheerio#map-functionindex-element-
					.map(formateRow($))
					.get()
					.join('\n');

				console.log(strings);

			});
		});
			
	})
	
})