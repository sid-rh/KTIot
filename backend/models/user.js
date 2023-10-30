const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin:{
        type:Boolean,
        required:true,
        default:false,
      },
      alloted_devices:
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',    
      }],
      rooms:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Room',
        }
      ],

      token: { type: String },
      lastLogout: { type: Date },
},
{
  timestamps: true,
},



);

const User = mongoose.model('User', userSchema);
module.exports = User;