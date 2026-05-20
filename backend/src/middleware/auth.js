import jwt from 'jsonwebtoken';
import { findUserById } from '../lib/store.js';

const extractToken = (request) => {
  const header = request.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    return header.slice(7);
  }
  return null;
};

export const authRequired = async (request, response, next) => {
  try {
    const token = extractToken(request);
    if (!token) {
      return response.status(401).json({ message: 'Authentication token is required' });
    }

    const secret = process.env.JWT_SECRET || 'derp-dev-secret';
    const decoded = jwt.verify(token, secret);
    const user = await findUserById(decoded.sub);

    if (!user) {
      return response.status(401).json({ message: 'Session is no longer valid' });
    }

    request.user = user;
    request.auth = decoded;
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const requireRole = (...roles) => (request, response, next) => {
  if (!request.user) {
    return response.status(401).json({ message: 'Authentication required' });
  }

  if (roles.length > 0 && !roles.includes(request.user.role)) {
    return response.status(403).json({ message: 'Insufficient permissions' });
  }

  return next();
};
