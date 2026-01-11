import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';
import { getUser, blockUser, unblockUser, deleteUser } from '../services/adminService';


export default function UserProfile() {
const { id } = useParams();
const navigate = useNavigate();
const [user, setUser] = useState(null);


const fetch = async () => {
try {
const { data } = await getUser(id);
if (data.success) setUser(data.data.user);
} catch (err) {
console.error(err);
}
};


useEffect(() => { fetch(); }, [id]);


if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;


const onBlock = async () => { if (confirm('Block this user?')) { await blockUser(id); fetch(); } };
const onUnblock = async () => { if (confirm('Unblock?')) { await unblockUser(id); fetch(); } };
const onDelete = async () => { if (confirm('Delete this user?')) { await deleteUser(id); navigate('/admin/users'); } };


return (
<div className="flex h-screen bg-gray-100">
<Sidebar />
<div className="flex-1 flex flex-col">
<Topbar title={`User - ${user.name}`} />
<main className="p-6">
<div className="bg-white p-6 rounded shadow max-w-xl">
<h2 className="text-xl font-semibold mb-2">{user.name}</h2>
<p className="mb-1"><strong>Email:</strong> {user.email}</p>
<p className="mb-1"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}</p>
<p className="mb-4"><strong>Status:</strong> {user.isBlocked ? 'Blocked' : 'Active'}</p>


<div className="flex gap-2">
{user.isBlocked ? (
<button onClick={onUnblock} className="px-3 py-1 border rounded">Unblock</button>
) : (
<button onClick={onBlock} className="px-3 py-1 border rounded">Block</button>
)}
<button onClick={onDelete} className="px-3 py-1 border rounded text-red-600">Delete</button>
</div>
</div>
</main>
</div>
</div>
);
}