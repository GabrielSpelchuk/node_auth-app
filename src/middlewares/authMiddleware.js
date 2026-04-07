import { jwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers['authorization'] || '';
  const [, token] = authorization.split(' ');

  if (!authorization || !token) {
    res.status(401);

    return;
  }

  const userData = jwtService.verify(token);

  if (!userData) {
    res.status(401);

    return;
  }

  req.user = userData;
  next();
};
