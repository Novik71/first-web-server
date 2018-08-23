let currentDate = new Date();

let date = currentDate.getDate();
let month = currentDate.getMonth(); //Be careful! January is 0 not 1
let year = currentDate.getFullYear();

let dateString = date + "-" +(month + 1) + "-" + year;

module.exports = dateString;