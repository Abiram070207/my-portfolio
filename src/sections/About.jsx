import React, { useRef } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { motion, useInView } from 'framer-motion';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <SectionWrapper id="about" className="py-20 md:py-32">
            <div ref={ref} className="max-w-7xl mx-auto px-8 md:px-16">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Text Content */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-8"
                        >
                            About Me
                        </motion.h2>

                        <div className="space-y-6 text-lg md:text-xl leading-relaxed font-light text-gray-800 text-balance">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                I’m an Artificial Intelligence and Data Science undergraduate driven by curiosity about how intelligent systems learn, adapt, and evolve.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                What started as fascination with algorithms has grown into a deeper interest in building structured, scalable systems powered by machine learning. I enjoy designing end-to-end solutions — from understanding data to creating intelligent applications that deliver meaningful outcomes.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                I approach problems analytically, remain calm under pressure, and value collaboration. Whether leading or contributing within a team, I focus on clarity, structure, and long-term impact.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                My goal is to grow into an AI Engineer and eventually contribute to research that advances intelligent systems in practical, real-world ways.
                            </motion.p>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative hidden md:block"
                    >
                        <div
                            className="relative aspect-[3/4] overflow-hidden"

                        >
                            <img
                                src="/images/about.jpeg"
                                alt="Abiram"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
                            />
                        </div>
                    </motion.div>

                    {/* Mobile Image (Visible only on small screens, below text) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative block md:hidden mt-8"
                    >
                        <div
                            className="relative aspect-[3/4] overflow-hidden"

                        >
                            <img
                                src="/images/about.jpeg"
                                alt="Abiram"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </SectionWrapper>
    );
};

export default About;
