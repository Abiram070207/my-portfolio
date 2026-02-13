import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedText from '../components/AnimatedText';
import explorationsData from '../data/explorations.json';

const Explorations = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <SectionWrapper id="explorations">
            <div className="mb-16">
                <span className="text-accent-violet font-mono mb-4 block uppercase tracking-widest text-sm">Work</span>
                <AnimatedText text="Hands-on Projects" className="text-4xl md:text-5xl text-[var(--color-text)]" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {explorationsData.map((project) => (
                    <motion.div
                        key={project.id}
                        layoutId={`card-container-${project.id}`}
                        onClick={() => setSelectedId(project.id)}
                        className="group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 border border-white/10"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <motion.h3 className="text-2xl font-bold text-white mb-2">{project.title}</motion.h3>
                            <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            layoutId={`card-container-${selectedId}`}
                            className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden relative z-10"
                        >
                            {(() => {
                                const project = explorationsData.find(p => p.id === selectedId);
                                return (
                                    <>
                                        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
                                        <div className="p-8">
                                            <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
                                            <p className="text-gray-300 mb-6">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-3 py-1 bg-white rounded-full text-xs text-black font-semibold">{t}</span>
                                                ))}
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                className="mt-6 px-8 py-3 bg-white text-black rounded-full font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-lg cursor-pointer z-50 relative"
                                                style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                            >
                                                Close Project
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
};

export default Explorations;
