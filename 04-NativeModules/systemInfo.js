// Node.js has a native module that allows us get information about our system, this is what 'os' is.
import os from 'node:os'

console.log("Your system architecture is: ", os.arch());
console.log("Your CPUs: ", os.cpus());
console.log("Your system uptime is: ", os.uptime());
console.log("Your free memory is (BYTES): ", os.freemem());
console.log("Your total memory is (BYTES): ", os.totalmem());
console.log("The path of your home directory is: ", os.homedir())
console.log("Your directory for temporary files is: ", os.tmpdir());
console.log("Your hostname is: ", os.hostname());
console.log("Your network information: ", os.networkInterfaces());
console.log("Your operating system is: ", os.platform());
console.log("Your platform type is: ", os.type());
console.log("Kernel version: ", os.version());
console.log("Information about the current user: ", os.userInfo());