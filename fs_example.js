const fs = require('fs');
const path = require('path');
const dir_path = path.join(__dirname, 'crud_file');
const file_path = `${dir_path}/data.txt`;

// for (let i = 0; i < 5; i++) {
//     fs.writeFileSync(dir_path + `/data${i}.txt`, `This is file number ${i}`);
// }

// fs.readdir(dir_path, (err, file) => {
//     file.forEach(item => {
//         console.log(item);
//     });
// });

// fs.writeFileSync(`${file_path}`, "this is new data.");
// fs.readFile(file_path, 'utf8', (err, data) => {
//     console.log(data);
// });

// fs.appendFile(file_path, "\nthis is appended data", (err) => {
//     console.log("file is appended.");
// });

// fs.rename(file_path, `${dir_path}/new_data.txt`, (err) => {
//     console.log("file is renamed.");
// });

// fs.unlinkSync(`${dir_path}/new_data.txt`);
// console.log("file is deleted.");