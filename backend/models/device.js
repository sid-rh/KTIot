const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  alloted_to_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default:null,
  },
  state: {
    light: {
      type: Boolean,
      default: false, 
    },
    fan: {
      type: Boolean,
      default: false,
    },
    mis: {
      type: Boolean,
      default: false,
    },
  },
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;