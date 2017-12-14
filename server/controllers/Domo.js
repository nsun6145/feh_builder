const models = require('../models');
// const stats = require('fire-emblem-heroes-stats');

const Domo = models.Domo;
/*
const getNames = (req, res) => {

  const obj = stats.getReleasedHeroes();

  const unitNames = {};

  for (let i = 0; i < obj.length; i++) {
    unitNames[i] = obj[i].name;
  }

  return unitNames;
};
*/


// gets the unit builder page
const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Whoops. Somethin\' happend.' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

// gets data for making unit
const makeDomo = (req, res) => {
  // checks to see if name and level fields are filled in
  if (!req.body.name || !req.body.level) {
    return res.status(400).json({ error: 'Ya need a name and a level bud.' });
  }

  const domoData = {
    name: req.body.name,
    level: req.body.level,
    weapon: req.body.weapon,
    assist: req.body.assist,
    special: req.body.special,
    skillA: req.body.skillA,
    skillB: req.body.skillB,
    skillC: req.body.skillC,
    seal: req.body.seal,
    note: req.body.note,
    owner: req.session.account._id,
  };
  const newDomo = new Domo.DomoModel(domoData);
  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.stats(400).json({ error: 'Unit already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });
  return domoPromise;
};

// Deletes a unit
/*
const deleteUnit = (req,res) =>{
  const search ={
    id: req
  };


  //unit.remove();

};
*/

// fetches the units
const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ domos: docs });
  });
};

/*
const deleteDomos = (req, res) => {
  req.remove();
};
*/

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.getDomos = getDomos;
// module.exports.getNames = getNames;
