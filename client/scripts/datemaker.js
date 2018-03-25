const moment = require('moment');

let lastMonday = moment().day('Monday').format('YYYY-MM-DD');

for (let i = 1; i < 10; i++) {
  let theMondayBefore = moment(lastMonday).subtract(i, 'weeks').format('YYYY-MM-DD');
  console.log(theMondayBefore);
}
