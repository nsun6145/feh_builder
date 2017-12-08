module.exports.Account = require('./Account.js');
module.exports.Domo = require('./Domo.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  level: {
    type: Number,
    min: 0,
    max: 40,
    required: true,
  },

  weapon: {
    type: String,
    required: false,
    trim: true,

  },

  assist: {
    type: String,
    required: false,
    trim: true,
  },

  special: {
    type: String,
    required: false,
    trim: true,
  },

  skillA: {
    type: String,
    required: false,
    trim: true,
  },
  skillB: {
    type: String,
    required: false,
    trim: true,
  },
  skillC: {
    type: String,
    required: false,
    trim: true,
  },
  seal: {
    type: String,
    required: false,
    trim: true,
  },

  note: {
    type: String,
    required: false,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = doc => ({
  name: doc.name,
  level: doc.level,
  weapon: doc.weapon,
  assist: doc.assist,
  special: doc.special,
  skillA: doc.skillA,
  skillB: doc.skillB,
  skillC: doc.skillC,
  seal: doc.seal,
  note: doc.note,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.find(search).select(
    'name level weapon assist special skillA skillB skillC seal note').exec(
    callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
