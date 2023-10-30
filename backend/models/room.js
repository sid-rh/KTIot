const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  device_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    default:null,
  },
  room_name: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
