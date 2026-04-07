import { ApiError } from '../exeptions/api.error';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { userService } from '../services/user.service';

const validatePassword = (value) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

const updateProfile = async (req, res) => {
  const { name, email, oldPassword, newPassword } = req.body;
  const userId = req.user.id;
  const user = await User.findByPk(userId);

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) {
    throw ApiError.badRequest('Invalid current password');
  }

  const errors = {
    password: validatePassword(newPassword),
  };

  const updateData = {};

  if (name) {
    updateData.name = name;
  }

  if (email && email !== user.email) {
    updateData.email = email;
  }

  if (newPassword) {
    if (errors.password) {
      throw ApiError.badRequest('Bad request', errors);
    }

    updateData.password = await bcrypt.hash(newPassword, 10);
  }

  await User.update(updateData, { where: { id: userId } });

  const updatedUser = await User.findByPk(userId);

  res.send(userService.normalize(updatedUser));
};

export const userController = { updateProfile };
