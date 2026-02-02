// Node.js has a permission system. This indicate what a user can do, for example, what kind of files can read o write.
// By default, node.js has these permissions desactivated, so we need to activate it to be sure that our program is safety and avoid virus injection or something else.

// The permissions are provided as argv on the command line using the flag '--permission' and '--allow-fs-read' (for instance) and the file or folder with access.
// Beside, we can manage our program to be sure that the user has permissions before execute the code.

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

let outputPath = join('NativeModules', 'permissions');
// We check write permissions
if (process.permission.has('fs.write', outputPath)) {
    await mkdir(outputPath, { recursive: true });
    
    const outputFilePath = join(outputPath, 'permissionFile.txt');
    await writeFile(outputFilePath, "This file was created handling permissions with node.");
    console.log("File created successfully! ✅");
} else {
    console.log("You don't have permissions to write in this directory.🕵️‍♂️");
}
// We check read permissions
if (process.permission.has('fs.read', outputPath)) {
    const content = await readFile(join(outputPath, 'permissionFile.txt'), { encoding: 'utf-8' });
    console.log(content);
} else {
    console.log("You don't have permissions to read in this directory.🕵️‍♂️");
}