import { motion } from 'framer-motion';


export default function UploadSection() {
return (
<motion.div className="p-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
<div className="border-2 border-dashed rounded-xl p-10 text-center bg-white shadow">
<p className="font-semibold">Drag & Drop Hostel Images / Videos</p>
<p className="text-sm opacity-60">or click to upload</p>
</div>
</motion.div>
);
}