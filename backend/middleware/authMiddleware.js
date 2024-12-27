import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(409).json({ error: 'Please Login First' });
  } else {
    try {
      const decodedToken = await jwt.verify(accessToken, process.env.SECRET);
      req.role = decodedToken.role;
      req.id = decodedToken.id;
      next();
    } catch (error) {
      return res.status(409).json({ error: 'Please Login' });
    }
  }
};
