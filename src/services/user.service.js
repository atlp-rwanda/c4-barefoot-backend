import models from '../models';

const { user } = models;
/**
 * different methods on User method
 */
class UserService {
  /**
   * @param {int} user contains model properties
   */
  constructor() {
    this.user = user;
  }

  /**
  * @param {object} options include total pages, total records,etc ... for pagination
  * @return {object} list of all users
  */
  async getAllUsers(options) {
    return this.user.paginate(options);
  }

  /**
  * @param {int} userId add user first name.
  * @return {object} get user with provided Id
  */
  async getUserById(userId) {
    return this.user.findOne({ where: { id: userId } });
  }

  /**
  * @param {string} email add user email.
  * @return {object} get user with provided Id
  */
  async getUserByEmail(email) {
    return this.user.findOne({ where: { email } });
  }

  /**
  * @param {string} username add username.
  * @return {object} get user with provided Id
  */
  async getUserByUserName(username) {
    return this.user.findOne({ where: { username } });
  }

  /**
   * @param {object} data include different rows properties
   * @param {string} userId add userId.
   * @return {string} success message
   */
  async updateUser(data, userId) {
    return this.user.update(data, { where: { id: userId } });
  }
}

export default new UserService();
