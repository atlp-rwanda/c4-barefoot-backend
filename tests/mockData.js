import { generateToken } from '../src/utils/auth';

export const verifiedUser = {
  email: 'manager_id@gmail.com',
  role: '7254a9e7-2e1b-4f83-ad73-78b90dd3df77'
};
export const notManagerVerifiedUser = {
  email: 'sequester@gmail.com',
  role: '45429837-ed2c-435d-bc22-ad9c5dbe3782'
};

export const subscribedManager = {
  email: 'mj@gmail.com',
  role: '7254a9e7-2e1b-4f83-ad73-78b90dd3df77'
};

const sequesterForTest = {
  role: '45429837-ed2c-435d-bc22-ad9c5dbe3782',
  username: 'requesterOne',
};
export const testToken = generateToken(sequesterForTest);
export const subscribedManagerToken = generateToken(subscribedManager);

export const verifiedUserToken = generateToken(verifiedUser);
export const notManagerVerifiedUserToken = generateToken(notManagerVerifiedUser);
