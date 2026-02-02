// Note.js has several native modules with different methods that allow us interact with the system.
// When we import native modules in node, it's important use 'node' to especify that it is a native module, for example: 'node:fs'.

// The module 'fs' works with file system (read, write, create files, for instance):
import { mkdir, readFile, writeFile } from 'node:fs/promises'
// The module 'path' works with the path of our directory (path, name and extension of a file, for instance):
import { basename, dirname, extname, join } from 'node:path'

// Considering it, this is a brief script to create a folder and a file with some content, displaying the content on console.
// We use 'join' to avoid use '/' or '\' because this prevent errors due to OS reading the path.
const directory = join('./NativeModules', 'firstFolder', 'secondFolder');
// With 'recursive' as second parameter, we can create recursively a sequence of folders.
await mkdir(directory, { recursive: true });

const dirFile = join(directory, 'nodeText.txt');
await writeFile(dirFile, "This is a text written using the node's file system native module.");

const contentFile = await readFile(dirFile, { encoding: 'utf8'});
console.log(contentFile);

// We can extract the name of a file.
const filename = basename(dirFile, '.txt');
console.log(filename);

// We can extract the path of a directory.
const fileDirname = dirname(dirFile);
console.log(fileDirname);

// We can extract the file's extension.
const fileExtension = extname(dirFile);
console.log(fileExtension);