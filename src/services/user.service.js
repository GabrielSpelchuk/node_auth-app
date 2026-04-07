import { ApiError } from '../exeptions/api.error.js';
import { User } from '../models/user';
import { emailService } from '../services/email.service.js';
import { v4 as uuidv4 } from 'uuid';

function normalize({ name, id, email }) {
  return { name, id, email };
}

function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function register(name, email, password) {
  const activationToken = uuidv4();

  const existUser = await findByEmail(email);

  if (existUser) {
    throw ApiError.badRequest('User already exist', {
      email: 'User already exist',
    });
  }

  await User.create({
    name,
    email,
    password,
    activationToken,
  });

  await emailService.sendActivationEmail(email, activationToken);
}

const updateResetToken = async (userId, resetToken) => {
  const user = await User.update({ resetToken }, { where: { id: userId } });

  return user;
};

const findByResetToken = async (resetToken) => {
  const user = await User.findOne({ where: { resetToken } });

  return user;
};

export const userService = {
  normalize,
  findByEmail,
  register,
  updateResetToken,
  findByResetToken,
};
