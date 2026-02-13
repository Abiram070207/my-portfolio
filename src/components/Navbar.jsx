import React from 'react';
import { motion } from 'framer-motion';



const Navbar = () => {
    const links = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Work', href: '#explorations' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
        >
            <div className="glass px-8 py-4 rounded-full flex gap-8 items-center">
                <a href="#" className="font-bold text-xl tracking-tighter text-[var(--color-text)] hover:text-accent-cyan transition-colors">Ram</a>
                <div className="hidden md:flex gap-6 items-center">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all group-hover:w-full" />
                        </a>
                    ))}

                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
