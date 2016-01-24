var moment = require('moment');
var now = moment();
//console.log(now.format('x'));
var timestamp = 1453674521731;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.local().format('h:mm a'));
//console.log(now.format('MMM Do YYYY, h:mm:ss a'));