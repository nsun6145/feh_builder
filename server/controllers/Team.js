const models = require('../models');

const Team = models.Team;

// creates the team view
const teamPage = (req, res) => {
  Team.TeamModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Whoops. Somethin\' happend.' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), teams: docs });
  });
};

// handles building of team
const buildTeam = (req, res) => {
  if (!req.body.unit1 && !req.body.unit2 && !req.body.unit3 && !req.body.unit4) {
    return res.status(400).json({ error: 'Ya need at least one unit.' });
  }

  const teamData = {
    unit1: req.body.unit1,
    unit2: req.body.unit2,
    unit3: req.body.unit3,
    unit4: req.body.unit4,

    owner: req.session.account._id,
  };

  const newTeam = new Team.TeamModel(teamData);
  const teamPromise = newTeam.save();

  teamPromise.then(() => res.json({ redirect: '/teamMaker' }));

  teamPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.stats(400).json({ error: 'Team already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });
  return teamPromise;
};

// fetches the teams
const getTeams = (req, res) => Team.TeamModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred' });
  }

  return res.json({ teams: docs });
});


module.exports.teamPage = teamPage;
module.exports.build = buildTeam;
module.exports.getTeams = getTeams;
