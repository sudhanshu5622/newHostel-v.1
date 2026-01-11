import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';
import Table from '../components/UI/Table';
import { getUsers, blockUser, unblockUser, deleteUser } from '../services/adminService';
import { useNavigate } from 'react-router-dom';


export default function Users() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();


const fetch = async () => {
setLoading(true);
try {
const { data } = await getUsers();
if (data.success) setUsers(data.data.users);
} catch (err) {
console.error(err);
} finally {
setLoading(false);
}
};


useEffect(() => { fetch(); }, []);


const onBlock = async (u) => {
if (!confirm('Block this user?')) return;
await blockUser(u._id);
fetch();
};
const onUnblock = async (u) => {
if (!confirm('Unblock this user?')) return;
await unblockUser(u._id);
fetch();
};
const onDelete = async (u) => {
if (!confirm('Delete this user? This cannot be undone.')) return;
await deleteUser(u._id);
fetch();
};


const cols = [
{ key: 'name', title: 'Name' },
{ key: 'email', title: 'Email' },
{ key: 'status', title: 'Status', render: (r) => (r.isBlocked ? 'Blocked' : 'Active') },
];


return (
<div className="flex h-screen bg-gray-100">
<Sidebar />
<div className="flex-1 flex flex-col">
<Topbar title="Users" />
<main className="p-6">
{loading ? (
<div>Loading...</div>
) : (
<Table
columns={cols}
data={users}
renderRowActions={(row) => (
<div className="flex gap-2">
<button onClick={() => navigate(`/admin/users/${row._id}`)} className="px-2 py-1 border rounded">View</button>
{row.isBlocked ? (
<button onClick={() => onUnblock(row)} className="px-2 py-1 border rounded">Unblock</button>
) : (
<button onClick={() => onBlock(row)} className="px-2 py-1 border rounded">Block</button>
)}
<button onClick={() => onDelete(row)} className="px-2 py-1 border rounded text-red-600">Delete</button>
</div>
)}
/>
)}
</main>
</div>
</div>
);
}