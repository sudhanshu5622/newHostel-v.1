import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


export default function AuthCard({ mode, setMode }) {
const navigate = useNavigate();


const submit = e => {
e.preventDefault();
navigate('/owner-services/dashboard');
};


return (
<motion.div
key={mode}
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
className="w-[420px] p-8 shadow-2xl rounded-2xl"
>
<h2 className="text-2xl font-bold mb-6">{mode === 'login' ? 'Owner Login' : 'Create Owner Account'}</h2>
<form onSubmit={submit} className="space-y-4">
{mode === 'signup' && <input className="input" placeholder="Owner Name" />}
<input className="input" placeholder="Email" />
<input className="input" placeholder="Phone" />
<input className="input" placeholder="Password" type="password" />
<button className="btn-primary w-full">{mode === 'login' ? 'Login' : 'Create Account'}</button>
</form>
<p className="text-sm mt-4 text-center">
{mode === 'login' ? 'New owner?' : 'Already have an account?'}
<button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-indigo-600 ml-1 font-semibold">
{mode === 'login' ? 'Create Account' : 'Login'}
</button>
</p>
</motion.div>
);
}