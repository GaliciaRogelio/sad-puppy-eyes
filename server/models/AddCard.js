const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const addcardSchema = new Schema(
  {
    cardNumber: {
      type: String,
      required: false,
      unique: true,
      trim: true
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
// userSchema.pre('save', async function(next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// compare the incoming password with the hashed password
// userSchema.methods.isCorrectPassword = async function(password) {
//   return bcrypt.compare(password, this.password);
// };

// userSchema.virtual('friendCount').get(function() {
//   return this.friends.length;
// });

const AddCard = model('AddCard', addcardSchema);

module.exports = AddCard;
