const os = require('os');
const platform = os.platform();
console.log(`Operating System Platform: ${platform}`);
console.log(`CPU Architecture: ${os.arch()}`);

const cpus = os.cpus();
console.log(`Number of CPU Cores: ${cpus.length}`);
// console.log('CPU Details:', cpus);

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log(`Total Memory: ${(totalMemory / (1024 ** 3)).toFixed(2)} GB`);
console.log(`Free Memory: ${(freeMemory / (1024 ** 3)).toFixed(2)} GB`);
const uptime = os.uptime();
console.log(`System Uptime: ${(uptime / 3600).toFixed(2)} hours`);
const userInfo = os.userInfo();
console.log(`User Info: ${JSON.stringify(userInfo)}`);
console.log(`Home Directory: ${os.homedir()}`);

// const networkInterfaces = os.networkInterfaces();
// console.log('Network Interfaces:', networkInterfaces);
// for (const [name, interfaces] of Object.entries(networkInterfaces)) {
//     interfaces.forEach((iface) => {
//         if (iface.family === 'IPv4') {
//             console.log(`Interface: ${name}, IP Address: ${iface.address}`);
//         }
//     });
// }
const hostname = os.hostname();
console.log(`Hostname: ${hostname}`);
const tempDir = os.tmpdir();
console.log(`Temporary Directory: ${tempDir}`);

const loadAvg = os.loadavg();
console.log(`Load Average (1, 5, 15 mins): ${loadAvg.map(avg => avg.toFixed(2)).join(', ')}`);
console.log(`Endianness: ${os.endianness()}`);
console.log(`OS Release: ${os.release()}`);

console.log(`OS Type: ${os.type()}`);
console.log(`OS Version: ${os.version()}`);
console.log(`CPU Model: ${cpus[0].model}`);
console.log(`CPU Speed: ${cpus[0].speed} MHz`);
console.log(`Is System Idle: ${os.uptime() > 3600 ? 'No' : 'Yes'}`);




