import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';
import Card from '../components/UI/Card';
import { getStats } from '../services/adminService';


export default function Dashboard() {
const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, blockedUsers: 0 });


useEffect(() => {
const fetchStats = async () => {
try {
const { data } = await getStats();
if (data.success) setStats(data.data);
} catch (err) {
console.error(err);
}
};
fetchStats();
}, []);


return (
<div className="flex h-screen bg-gray-100">
<Sidebar />
<div className="flex-1 flex flex-col">
<Topbar title="Dashboard" />
<main className="p-6">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<Card title="Total Users" value={stats.totalUsers} />
<Card title="Active Users (30d)" value={stats.activeUsers} />
<Card title="Blocked Users" value={stats.blockedUsers} />
</div>
</main>
</div>
</div>
);
}