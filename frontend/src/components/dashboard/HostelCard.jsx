import { motion } from 'framer-motion';


export default function HostelCard() {
return (
<motion.div whileHover={{ y: -8 }} className="bg-white rounded-2xl shadow-xl overflow-hidden">
<img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5" className="h-48 w-full object-cover" />
<div className="p-6">
<h3 className="text-xl font-bold">Sunrise Boys Hostel</h3>
<p className="text-sm opacity-60">Patna • ₹4,000 – ₹7,000</p>
<div className="flex gap-4 mt-6">
<button className="btn-outline">Contact Owner</button>
<button className="btn-primary">Book Now</button>
</div>
</div>
</motion.div>
);
}