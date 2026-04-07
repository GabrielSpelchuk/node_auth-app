import { User } from '../models/user';
import bcrypt from 'bcrypt';

const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id;

  const updateData = { name, email };

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  await User.update(updateData, { where: { id: userId } });

  res.send({ message: 'Updated' });
};

export const userController = { updateProfile };
