import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Topbar({ title = '' }) {
const navigate = useNavigate();


const logout = () => {
localStorage.removeItem('admin_token');
navigate('/admin/login');
};


return (
<header className="flex justify-between items-center p-4 border-b bg-white">
<h3 className="text-lg font-semibold">{title}</h3>
<div>
<button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
</div>
</header>
);
}