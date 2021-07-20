import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
    timestamps: true,
})

userSchema.methods.matchPassword = async function(enteredPassword){
  const user = this
  return await bcrypt.compare(enteredPassword,user.password)
}
// a function to define what goes back to the user from the user data
userSchema.methods.toJSON = function (){
  const user = this;
  const userObject = user.toObject()
  delete userObject.password
  return userObject
}

const user = mongoose.model('User',userSchema)

export default user