// Node.js is useful to create command line interfaces (CLI). Beside, we can create a command line program using node.js.
// We're going to create our own ls program.

// We need import 'readdir' to read the directory, 'stat' to get metadata about our directory, and 'join' to build a path safety.
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

// When we work with CLI, one of the most important thigs are the arguments because they allow us type flags to control out program.

// 1. Identify the argument with our folder:
// By default, process.argv in node return an array with two principal arguments: the first one is the path with the node executed, and the second one is the path where we are.
// Any other flag (argv) we type on the command line will be added to this array.
const dir = process.argv[2] ?? '.';

// 2. Read the folders/files inside of directory
const files = await readdir(dir);

// 3. Format size
const formatSize = (size) => {
    if(size < 1024) return `${size} B`;
    return `${(size / 1024).toFixed(2)} KB`;
}

// 4. Get files info (size formatted)
const entries = await Promise.all(
    files.map(async (name) => {
        const fullPath = join(dir, name);
        const fileInfo = await stat(fullPath);

        return {
            name,
            isDir: fileInfo.isDirectory(),
            rawSize: fileInfo.size,
            size: formatSize(fileInfo.size)
        }
    })
);

// Sort files by their size
/* entries.sort((a, b) => {
    return b.rawSize - a.rawSize;
}); */

// Sort in alphabetical order
entries.sort((a, b) => a.name.localeCompare(b.name));

// 5. Render on console every file
for (const entry of entries) {
    const icon = entry.isDir ? '📁' : '📄'; 
    const size = entry.isDir ? '-' : `${entry.size}`;
    console.log(`${icon} ${entry.name.padEnd(30)} ${size}`);
}