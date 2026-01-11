import api from '../api/axios';


export const adminLogin = (payload) => api.post('/auth/admin/login', payload);
export const getStats = () => api.get('/admin/stats');
export const getUsers = (page = 1, limit = 20) => api.get(`/admin/users?page=${page}&limit=${limit}`);
export const getUser = (id) => api.get(`/admin/users/${id}`);
export const blockUser = (id) => api.patch(`/admin/users/${id}/block`);
export const unblockUser = (id) => api.patch(`/admin/users/${id}/unblock`);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);