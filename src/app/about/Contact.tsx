import { useState, useRef } from "react"; 
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { slideIn } from "../components/Motion";
import emailjs from '@emailjs/browser'; 
import Link from "next/link";

const Contact: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState({
        name: "", 
        email: "", 
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target; 
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setLoading(true);
        setError(null);

        if (!form.name || !form.email || !form.message) {
            setLoading(false);
            setError("Please fill in all fields.");
            return;
        }

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

        if (serviceId && templateId && userId) {
            emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: form.name, 
                    to_name: 'Ivan',
                    from_email: form.email, 
                    to_email: 'ivanrazo745@gmail.com',
                    message: form.message,
                },   
                userId
            )
            .then((result) => {
                setLoading(false);
                alert('Thank you. I will get back to you as soon as possible.');

                setForm({
                    name: "", 
                    email: "", 
                    message: "",
                });
            }, (error) => {
                setLoading(false);
                console.log(error);
                alert('Something went wrong.');
            });
        } else {
            setLoading(false);
            console.error("EmailJS environment variables are not properly set.");
            alert('Something went wrong.');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen xl:mt-12 xl:flex-row flex-col-reverse gap-10 ">
            <motion.div
                variants={slideIn('left', 'tween', 0.2, 1)}
                className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
            >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="sm:text-[18px] text-[14px] text-[#aaa6c3] uppercase tracking-wider">Reach me Out!</p>
                    <h3 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Contact</h3>
                </div>
            </div>
 
            <form 
                ref={formRef} 
                onSubmit={handleSubmit}
                className="mt-12 flex flex-col gap-8"
            >
                {error && <p className="text-red-500">{error}</p>}
                
                <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">Name</span>
                    <input 
                    type="text" 
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    className="bg-[#151030] py-4 px-6 placeholder:text-[#aaa6c3] text-white rounded-lg outlined-none border-none font-medium"
                    />
                </label>
              
                <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">Email</span>
                    <input 
                    type="email" 
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email?"
                    className="bg-[#151030] py-4 px-6 placeholder:text-[#aaa6c3] text-white rounded-lg outlined-none border-none font-medium"
                    />
                </label>
              
                <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">Message</span>
                    <textarea
                    rows={7}      
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What do you want to say?"
                    className="bg-[#151030] py-4 px-6 placeholder:text-[#aaa6c3] text-white rounded-lg outlined-none border-none font-medium"
                    />
                </label>
    
                <button
                    type='submit'
                    className="bg-[#151030] py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-[#050816] rounded-xl"
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
                </form>
            </motion.div>
        </div>
    );
}

export default SectionWrapper(Contact, "contact");
