import bcrypt from 'bcryptjs'
const hashPass = async (password) => {
  return await bcrypt.hash(password,8)
}

const pass1 = await hashPass('123456')

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    passowrd: pass1,
    isAdmin: true,
  },
  {
    name: 'John doe',
    email: 'john@example.com',
    passowrd: pass1,
  },
  {
    name: 'James doe',
    email: 'james@example.com',
    passowrd: pass1,
  },
  {
    name: 'Jane doe',
    email: 'jane@example.com',
    passowrd: pass1,
  },
]

export default users