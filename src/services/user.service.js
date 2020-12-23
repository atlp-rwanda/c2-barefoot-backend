import models from '../models';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';

const { User } = models;
/**
 * different methods on User method
 */
class UserService {
  /**
   * @param {int} user contains model properties
   */
  constructor() {
    this.user = User;
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
  * @param {string} username add username.
  * @return {object} get user with provided Id
  */
  async getUserByUserName(username) {
    const query = {
      attributes: ["id", "first_name", "last_name", "username", "bio", "occupation", "email", "address", "language", "profile_picture", "user_role_id", "manager_id", "verified", "refreshtoken"],
      where: { username: username }
    }
    return this.user.findOne(query);
  }

  /**
  * @param {string} email add email.
  * @return {object} get user with provided email
  */
  async getUserByEmail(email) {
    return this.user.findOne({ where: { email } });
  }

  /**
   * @param {object} data include different rows properties
   * @param {string} username add username.
   * @return {string} success message
   */
  async updateUserByUsername(data, username) {
    return this.user.update(data, { where: { username } });
  }

  /**
   * @param {string} password include password
   * @param {string} username add username.
   * @return {string} success message
   */
  async changePasswordByUsername(currentPassword, newPassword, username) {
    const user = this.user.findOne({ where: { currentPassword } });
    if (!user) throw new NotFoundRequestError('user not found', 404);
    return this.user.update(newPassword, { where: { username } });
  }
}

export default new UserService();
