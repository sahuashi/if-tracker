import mongoose from 'mongoose';
import passportlocalmongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

UserSchema.plugin(passportlocalmongoose);
const User = mongoose.model('User', UserSchema);
export default User;
