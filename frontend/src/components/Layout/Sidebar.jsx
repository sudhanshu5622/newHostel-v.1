import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const items = [
{ to: '/admin', label: 'Dashboard' },
{ to: '/admin/users', label: 'Users' },
];


export default function Sidebar() {
const loc = useLocation();
return (
<aside className="w-64 bg-white border-r h-screen p-4">
<div className="mb-6">
<h2 className="text-xl font-bold">Admin Panel</h2>
</div>
<nav>
{items.map((i) => (
<Link
key={i.to}
to={i.to}
className={`block py-2 px-3 rounded ${loc.pathname === i.to ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
>
{i.label}
</Link>
))}
</nav>
</aside>
);
}