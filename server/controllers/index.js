module.exports.Account = require('./Account.js');
module.exports.Domo = require('./Domo.js');

const ErrorPage = (req, res) => {
  res.render('notfound');
};

module.exports.ErrorPage = ErrorPage;

