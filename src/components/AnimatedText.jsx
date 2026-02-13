import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedText = ({ text, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 }); // Trigger when 50% visible

    return (
        <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`font-bold tracking-tight ${className}`}
        >
            {text}
        </motion.h2>
    );
};

export default AnimatedText;
