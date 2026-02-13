import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';

const Hero = () => {
    return (
        <section id="hero" className="w-full h-screen relative overflow-hidden bg-white flex items-center">

            {/* Background Image Layer */}
            <div
                className="absolute inset-0 w-full h-full z-0 bg-cover bg-no-repeat opacity-90 transition-all duration-700"
                style={{
                    backgroundImage: "url('/images/hero.jpg')",
                    backgroundPosition: "right center"
                }}
            >
                {/* Note: Placeholder image used. Replace with local asset when available. */}
            </div>

            {/* Left Gradient Overlay - White to Transparent */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 w-full md:w-3/4 lg:w-2/3" />

            {/* Bottom Fade Blend - Transparent to White */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />

            {/* Content Layer */}
            <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 z-20 relative">
                <div className="w-full md:w-2/3 lg:w-1/2">

                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-6">
                            AI & Data Science Student
                        </h2>
                    </motion.div>

                    {/* Main Headline */}
                    <div className="mb-6">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-primary mb-2"
                        >
                            Abiram
                        </motion.h1>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-800 leading-tight"
                        >
                            Engineering intelligent systems <br />
                            <span className="font-normal text-gray-500">for the future.</span>
                        </motion.h2>
                    </div>

                    {/* Supporting Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-gray-500 text-lg md:text-xl max-w-lg mb-10 leading-relaxed text-balance"
                    >
                        I design and build machine learning systems and scalable data-driven solutions.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <MagneticButton
                            className="bg-primary text-white hover:bg-black/90 shadow-lg hover:shadow-xl transition-all duration-300 border-none px-10"
                            onClick={() => document.getElementById('explorations')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore My Work
                        </MagneticButton>

                        <a
                            href="/resume/Abiram_Resume.pdf"
                            download="Abiram_Resume.pdf"
                            className="px-8 py-4 rounded-full border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-black transition-all duration-300 backdrop-blur-sm flex items-center gap-2 group font-medium"
                        >
                            View Resume
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
