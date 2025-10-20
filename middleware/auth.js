// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  let token = null;

  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    token = req.header('x-auth-token');
  }

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // payload from jwt.sign
    next();
  } catch (err) {
    return res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
