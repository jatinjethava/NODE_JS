const fs = require('fs');

// fs.readFile('node_js.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });

// fs.writeFile('extra_data.txt', 'hii jatin!', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File written successfully');
// });

// fs.appendFile('extra_data.txt', '\nHow Are You.', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Text appended successfully');
// });

// fs.rename('extra_data1.txt', 'extra_data.txt', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File renamed successfully');
// });

// fs.unlink('extra_data.txt', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File deleted successfully');
// });

// fs.mkdir('jatin', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Directory created successfully');
// });

// fs.rmdir('jatin', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Directory removed successfully');
// });

// fs.readdir('.', (err, files) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Files in directory:', files);
// });

// fs.stat('extra_data.txt', (err, stats) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File stats:', stats);
// });
module.exports = fs;