import { motion } from 'framer-motion';
const facilities = ['Wi‑Fi', 'Mess', 'Laundry', 'Power Backup', 'Parking', 'Security', 'Water', 'Study Room', 'AC'];


export default function Facilities() {
return (
<div className="px-12">
<h2 className="text-2xl font-bold mb-6">Facilities</h2>
<div className="grid grid-cols-5 gap-6">
{facilities.map(f => (
<motion.div whileHover={{ scale: 1.05 }} key={f} className="p-6 bg-white rounded-xl shadow cursor-pointer text-center">
<p className="font-semibold">{f}</p>
</motion.div>
))}
</div>
</div>
);
}