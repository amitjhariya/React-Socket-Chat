import {Schema, model} from "mongoose"
import crypto from 'crypto'

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    max: 32,
    unique: true,
    index: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  hashed_password: {
    type: String,
    required: true,
    select: false,
  },
  salt: {
    type: String,
    select: false,
  },
  about: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
    select: false,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  resetPasswordLink: {
    data: String,
    default: "",
  },
  socket: { type: String }
})

userSchema
  .virtual("password")
  .set(function (password) {
    // create a temporarity variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encryptPassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainText) {
      return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
      if (!password) return '';
      try {
          return crypto
              .createHmac('sha1', this.salt)
              .update(password)
              .digest('hex');
      } catch (err) {
          return '';
      }
  },

  makeSalt: function() {
      return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

export default model('Users', userSchema, 'users');