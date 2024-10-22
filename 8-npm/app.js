console.log('Hello World!');

const validator = require('validator');
const chalk = require('chalk');

console.log(validator.isEmail('rayhansyah817@gmail.com'));
console.log(validator.isMobilePhone('089646464963', 'id-ID'));
console.log(validator.isNumeric('089646464963a'));

const nama = 'Rafly Rayhansyah';
const pesan = chalk`Hello {bgGreen.italic.strikethrough World}! {bold Nama saya} : ${nama}`;
console.log(pesan);
console.log(chalk.italic.bgBlue.black(pesan));