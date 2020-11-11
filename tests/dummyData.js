import { valid } from 'joi';
import { generateToken, hashPassword } from '../src/utils/auth';
// signup data

export const validUser = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestAdmin',
  occupation: 'software development',
  email: 'renedeolynda@gmail.com',
  password: hashPassword('pa13332335'),
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
const payload = { user: validUser.email };

export const validToken = generateToken(payload);

export const invalidToken = `${validToken}234`;

export const invalidDataToken = generateToken({ user: 'notFound@gmail.com' });
export const { email, password } = validUser;
// Login data

const loginUser = {
  email: 'habajeunes2@gmail.com',
  password: '1234567890'
};

export const userToken = generateToken(loginUser);
