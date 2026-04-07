import { ApiError } from '../exeptions/api.error';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { userService } from '../services/user.service';
import { emailService } from '../services/email.service';

const updateProfile = async (req, res) => {
  const { name, email, password, confirmation, oldPassword } = req.body;
  const user = await User.findByPk(req.user.id);

  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordCorrect) {
    throw ApiError.badRequest('Incorrect old password');
  }

  if (password) {
    if (password !== confirmation) {
      throw ApiError.badRequest('Passwords do not match');
    }
    user.password = await bcrypt.hash(password, 10);
  }

  if (email && email !== user.email) {
    const oldEmail = user.email;

    user.email = email;

    await emailService.send(
      oldEmail,
      'Security Alert',
      'Your email has been changed.',
    );
  }

  user.name = name || user.name;
  await user.save();

  res.send(userService.normalize(user));
};

export const userController = { updateProfile };
