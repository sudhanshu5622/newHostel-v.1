const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, adminOnly } = require('../middleware/authMiddleware');


// all admin routes require authenticate + adminOnly
router.get('/stats', authenticate, adminOnly, adminController.getStats);
router.get('/users', authenticate, adminOnly, adminController.getUsers);
router.get('/users/:id', authenticate, adminOnly, adminController.getUser);
router.patch('/users/:id/block', authenticate, adminOnly, adminController.blockUser);
router.patch('/users/:id/unblock', authenticate, adminOnly, adminController.unblockUser);
router.delete('/users/:id', authenticate, adminOnly, adminController.deleteUser);


module.exports = router;