// Depending on the way in a module was exported, we have two wyas to import it.
//It's important specify the extension when we are working with node because node try to find the file in runtime.

// The first one is import a variable/function... specific by its name:
import { days } from './exportESModule.js'

const dayWeek = days;
console.log(dayWeek);

// The second one is import by default. It looks like:
/* 
###CODE:
import days from './exportESModule.js'

console.log(days); */