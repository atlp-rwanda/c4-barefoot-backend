import { generateToken } from '../src/utils/auth';

// signup data

export const validUser = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestAdmin',
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

const payload = { user: validUser.email };

export const validToken = generateToken(payload);

export const invalidToken = `${validToken}234`;

// Login data

const loginUser = {
  email: 'habajeunes2@gmail.com',
  password: '1234567890'
};

export const userToken = generateToken(loginUser);
