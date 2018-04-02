
// https://stackoverflow.com/questions/18586921/how-to-launch-html-using-chrome-at-allow-file-access-from-files-mode
// Запуск
// 
// https://github.com/ebidel/filer.js/blob/master/dist/filer.min.js
// 

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
} else {
    alert('The File APIs are not fully supported in this browser.');
}
const sourceDir = 'files';
const distDir = './dist';
// const subDirs = ['1', '2', '3', '4', '5'];

// window.webkitRequestFileSystem(
// 	window.PERSISTENT, 
// 	20 * 1024 * 1024 /*20MB*/ , 
// 	onInitFs, 
// 	errorHandler
// );

/**
 * writeTextFile write data to file on hard drive
 * @param  string  filepath   Path to file on hard drive
 * @param  sring   output     Data to be written
 */
function writeTextFile(filepath, output) {
    var txtFile = new File(filepath);
    txtFile.open("w"); //
    txtFile.writeln(output);
    txtFile.close();
}

/**
 * readTextFile read data from file
 * @param  string   filepath   Path to file on hard drive
 * @return string              String with file data
 */
function readTextFile(filepath) {
    var str = "";
    var txtFile = new File(filepath);
    txtFile.open("r");
    while (!txtFile.eof) {
        // read each line of text
        str += txtFile.readln() + "\n";
    }
    return str;
}

var filer = new Filer();

filer.init({persistent: false, size: 20* 1024 * 1024}, function(fs) {
	console.log('Opened file system: ' + fs.name);
	filer.ls('/', function(entries) {
			console.log(entries);
	});
}, errorHandler);
function onInitFs(fs) {
    console.log('Opened file system: ' + fs.name);


// Перебираю каждый файл в директории.
// files.forEach((file) => {
//     // Асинхроно читаю, форматирую и выкидываю в нужную директорию файл.
//     fs.readFile(`${currentDir}/${file}`, (error, data) => {
//         if (error) {
//             return console.error(error);
//         }
//         const DOM = data.toString();
//         // console.log(DOM);
//         const $ = cheerio.load(DOM);
//         // Decode.
//         // https://github.com/cheeriojs/cheerio/issues/711
//         const strings = $('thead').siblings('tbody').find('tr')
//             // Проход по строкам таблицы.
//             // https://github.com/cheeriojs/cheerio#map-functionindex-element-
//             .map(formateRow($)).get().join('\n');
//         console.log(strings);
//     });
// });
// fs.root.getDirectory(sourceDir, {}, );
}

function errorHandler(e) {
    var msg = '';
    console.log(e.code)
    switch (e.code) {
        case 10:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case 1:
            msg = 'NOT_FOUND_ERR';
            break;
        case 2:
            msg = 'SECURITY_ERR';
            break;
        case 9:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case 7:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };
    console.log('Error: ' + msg);
}


// Каррирую функцию, чтобы передать DOM контекст. 
function formateRow(index, row) {
    const $row = $(row);
    // Проходимся по ячейкам строки.
    let finalHtml = '';
    $row.children().each(function(index, element) {
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
// // Итерерирую каждую директорию.
// subDirs.forEach((directory) => {