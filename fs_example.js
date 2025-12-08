const fs = require('fs');
const path = require('path');
const dir_path = path.join(__dirname, 'jatin');

// for (let i = 0; i < 5; i++) {
//     fs.writeFileSync(dir_path + `/data${i}.txt`, `This is file number ${i}`);
// }

fs.readdir(dir_path, (err, file) => {
    file.forEach(item => {
        console.log(item);
    });
});