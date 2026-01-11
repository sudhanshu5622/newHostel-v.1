import { motion } from 'framer-motion';


export default function Hero() {
return (
<section className="h-[60vh] bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center px-20 text-white">
<motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
<h1 className="text-5xl font-bold">Manage Your Hostel Like a Pro</h1>
<p className="mt-4 text-lg opacity-90">Upload hostel details, facilities & connect with students</p>
</motion.div>
</section>
);
}