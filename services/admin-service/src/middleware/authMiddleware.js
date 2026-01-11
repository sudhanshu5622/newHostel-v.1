const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const Admin = require('../models/Admin');
const User = require('../models/User');


// Extract token from Authorization header
const getTokenFromHeader = (req) => {
const authHeader = req.headers.authorization;
if (!authHeader) return null;
const parts = authHeader.split(' ');
if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
return null;
};


// Middleware to verify JWT and attach user/admin to req
const authenticate = async (req, res, next) => {
try {
const token = getTokenFromHeader(req);
if (!token) return res.status(401).json({ success: false, message: 'No token provided' });


const decoded = jwt.verify(token, secret);


// find either admin or user depending on role
if (decoded.role === 'admin') {
const admin = await Admin.findById(decoded.id).select('-password');
if (!admin) return res.status(401).json({ success: false, message: 'Admin not found' });
req.user = admin; // keep name user for simplicity
} else {
const user = await User.findById(decoded.id).select('-password');
if (!user) return res.status(401).json({ success: false, message: 'User not found' });
req.user = user;
}


next();
} catch (err) {
console.error(err);
return res.status(401).json({ success: false, message: 'Token invalid or expired' });
}
};


// admin-only guard
const adminOnly = (req, res, next) => {
if (!req.user) return res.status(403).json({ success: false, message: 'Not authenticated' });
// model Admin will have role 'admin'
// we used role on token; defend again
if (req.user.role && req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Requires admin role' });
// if admin model lacks role field, simply proceed assuming it's admin route (we attached admin earlier)
next();
};


module.exports = { authenticate, adminOnly };