import React, { useRef } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { motion, useInView } from 'framer-motion';

const skills = [
    {
        category: "Machine Learning",
        items: ["Python", "Machine Learning", "TensorFlow", "Scikit-learn", "NumPy", "Pandas"]
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "Spring Boot", "REST APIs", "PostgreSQL", "MongoDB"]
    },
    {
        category: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "Flutter"]
    },
    {
        category: "Tools",
        items: ["Git", "Docker", "Postman", "VS Code"]
    }
];

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <SectionWrapper id="skills" className="py-20 md:py-32">
            <div ref={ref} className="max-w-7xl mx-auto px-8 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Tools & Technologies</h3>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 group hover:bg-black hover:scale-105"
                        >
                            <h3 className="text-lg font-bold mb-6 text-gray-900 group-hover:text-white transition-colors duration-300">
                                {category.category}
                            </h3>
                            <ul className="space-y-3">
                                {category.items.map((item, i) => (
                                    <li key={i} className="text-gray-600 group-hover:text-gray-300 font-medium text-sm flex items-center gap-2 transition-colors duration-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-white transition-colors duration-300" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Skills;
