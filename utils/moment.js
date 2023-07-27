const moment = require('moment');

// Utility function to beautify timestamps
const beautifyTimestamp = (timestamp) => {
  return moment(timestamp).format('MMMM DD, YYYY, HH:mm:ss');
};

module.exports = { beautifyTimestamp };
