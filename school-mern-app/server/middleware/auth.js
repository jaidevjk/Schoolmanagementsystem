import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not set in environment.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) token = token.slice(7);
  if (!token) return res.status(401).json({ message: 'Access denied. No token.' });
  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded?.id ?? decoded?._id;
    if (!userId) return res.status(401).json({ message: 'Invalid token.' });
    const user = await User.findById(userId).select('-password').lean();
    if (!user) return res.status(401).json({ message: 'User not found.' });
    if (user.isActive === false) return res.status(401).json({ message: 'Account disabled.' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export const role = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Not allowed for your role.' });
  next();
};
