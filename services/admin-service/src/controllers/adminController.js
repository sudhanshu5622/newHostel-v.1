const User = require("../models/User");

/**
 * @route   GET /api/admin/stats
 * @desc    Dashboard statistics
 * @access  Admin
 */
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    const activeUsers = await User.countDocuments({
      lastActiveAt: {
        $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) // last 30 days
      }
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        blockedUsers
      }
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Admin
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get single user
 * @access  Admin
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @route   PATCH /api/admin/users/:id/block
 * @desc    Block user
 * @access  Admin
 */
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    ).select("-password");

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "User blocked successfully",
      data: user
    });
  } catch (error) {
    console.error("Block user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @route   PATCH /api/admin/users/:id/unblock
 * @desc    Unblock user
 * @access  Admin
 */
exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    ).select("-password");

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "User unblocked successfully",
      data: user
    });
  } catch (error) {
    console.error("Unblock user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user
 * @access  Admin
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

