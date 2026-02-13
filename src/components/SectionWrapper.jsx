import React from 'react';

const SectionWrapper = ({ children, id, className = "" }) => {
    return (
        <section id={id} className={`min-h-screen flex flex-col justify-center items-center p-8 md:p-20 relative overflow-hidden ${className}`}>
            <div className="max-w-7xl w-full z-10">
                {children}
            </div>
        </section>
    );
};

export default SectionWrapper;
