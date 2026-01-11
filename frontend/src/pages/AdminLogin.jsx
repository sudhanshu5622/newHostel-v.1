import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/adminService';


export default function AdminLogin() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
setLoading(true);
try {
const { data } = await adminLogin({ email, password });
if (data && data.data && data.data.token) {
localStorage.setItem('admin_token', data.data.token);
navigate('/admin');
} else {
alert(data.message || 'Login failed');
}
} catch (err) {
alert(err?.response?.data?.message || 'Login error');
} finally {
setLoading(false);
}
};


return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
<form onSubmit={submit} className="w-full max-w-md bg-white p-8 rounded shadow">
<h2 className="text-2xl mb-4">Admin Login</h2>
<label className="block mb-2">Email</label>
<input className="w-full p-2 border rounded mb-4" value={email} onChange={(e) => setEmail(e.target.value)} />
<label className="block mb-2">Password</label>
<input type="password" className="w-full p-2 border rounded mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
<button className="w-full py-2 bg-blue-600 text-white rounded">{loading ? '...' : 'Login'}</button>
</form>
</div>
);
}