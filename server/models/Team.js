module.exports.Account = require('./Account.js');
module.exports.Team = require('./Team.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// const _ = require('underscore');

let TeamModel = {};

const convertId = mongoose.Types.ObjectId;
// const setName = name => _.escape(name).trim();

const TeamSchema = new mongoose.Schema({
  unit1: {
    type: String,
    required: true,
    trim: true,
  },

  unit2: {
    type: String,
    required: false,
    trim: true,

  },

  unit3: {
    type: String,
    required: false,
    trim: true,

  },

  unit4: {
    type: String,
    required: false,
    trim: true,

  },

});

TeamSchema.statics.toAPI = doc => ({
  unit1: doc.unit1,
  unit2: doc.unit2,
  unit3: doc.unit3,
  unit4: doc.unit4,
});

TeamSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return TeamModel.find(search).select('unit1 unit2 unit3 unit4').exec(callback);
};

TeamModel = mongoose.model('Team', TeamSchema);

module.exports.DomoModel = TeamModel;
module.exports.DomoSchema = TeamSchema;
