import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedText from '../components/AnimatedText';
import timelineData from '../data/timeline.json';

const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <SectionWrapper id="timeline">
            <div className="mb-16 text-center">
                <span className="text-accent-violet font-mono mb-4 block uppercase tracking-widest text-sm">Career</span>
                <AnimatedText text="Experience & Education" className="text-4xl md:text-5xl text-[var(--color-text)]" />
            </div>

            <div ref={containerRef} className="relative max-w-3xl mx-auto pl-8 md:pl-0">
                {/* Central Line */}
                <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-0.5 bg-white/10 -translate-x-1/2" />
                <motion.div
                    style={{ height }}
                    className="absolute top-0 left-8 md:left-1/2 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-cyan -translate-x-1/2 origin-top"
                />

                <div className="space-y-12">
                    {timelineData.map((item, index) => (
                        <div key={index} className={`relative flex items-center justify-between md:flex-row flex-col md:text-right ${index % 2 === 0 ? 'md:flex-row-reverse text-left' : 'text-left'}`}>

                            {/* Spacer for alternating layout */}
                            <div className="hidden md:block w-1/2" />

                            {/* Dot on the line */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-accent-cyan z-10" />

                            {/* Content Card */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className={`w-full md:w-[45%] pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
                            >
                                <span className="text-accent-cyan font-mono text-sm block mb-1">{item.year}</span>
                                <h3 className="text-xl font-bold text-[var(--color-text)] mb-1">{item.title}</h3>
                                <h4 className="text-[var(--color-text-muted)] text-sm mb-3">{item.company}</h4>
                                <p className="text-[var(--color-text-muted)] text-sm">{item.description}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Timeline;
