import { valid } from 'joi';
import { generateToken } from '../src/utils/auth';
import roles from '../src/utils/roles';
// signup data

export const validUser = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestAdmin',
  occupation: 'software development',
  email: 'renedeolynda@gmail.com',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

export const invalidUser = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestAdmin',
  email: '123',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

export const validData = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestName1212',
  occupation: 'software development',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

export const invalidData = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestName1212',
  occupation: 'm',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};
const payload = { username: validUser.username, user_role_id: roles.REQUESTER };

export const validToken = generateToken(payload);

export const invalidToken = `${validToken}234`;
export const validDataToken = generateToken({ username: 'With_LineManager', user_role_id: roles.MANAGER });
export const invalidDataToken = generateToken({ username: 'fakeUser' });
export const { email, password } = validUser;
// Login data

const loginUser = {
  email: 'habajeunes2@gmail.com',
  password: '1234567890'
};

export const userToken = generateToken(loginUser);
