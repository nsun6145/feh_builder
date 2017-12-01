module.exports.Account = require('./Account.js');
module.exports.Domo = require('./Domo.js');
module.exports.Team = require('./Team.js');

const ErrorPage = (req, res) => {
  res.render('notfound');
};

module.exports.ErrorPage = ErrorPage;

