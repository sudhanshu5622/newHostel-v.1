// Standardized API response helper
const success = (res, data = {}, message = 'Success', code = 200) => {
return res.status(code).json({ success: true, message, data });
};


const error = (res, message = 'Error', code = 500, details = null) => {
return res.status(code).json({ success: false, message, details });
};


module.exports = { success, error };