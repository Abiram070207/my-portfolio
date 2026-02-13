import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedText from '../components/AnimatedText';
import MagneticButton from '../components/MagneticButton';

const Contact = () => {
    return (
        <SectionWrapper id="contact" className="min-h-[70vh]">
            <div className="text-center max-w-4xl mx-auto">
                <span className="text-accent-violet font-mono mb-4 block uppercase tracking-widest text-sm">Get in Touch</span>
                <AnimatedText
                    text="Let's build something unique together."
                    className="text-5xl md:text-7xl mb-8 leading-tight text-[var(--color-text)] mb-12"
                />

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <MagneticButton onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=abiram.r1010@gmail.com', '_blank')}>
                        Send an Email
                    </MagneticButton>
                    <a
                        href="/resume/Abiram_Resume.pdf"
                        download="Abiram_Resume.pdf"
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors underline underline-offset-4"
                    >
                        View Resume
                    </a>
                </div>

                <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[var(--color-text-muted)] text-sm">
                    <p>&copy; {new Date().getFullYear()} Developer Portfolio.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=abiram.r1010@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition-colors">Gmail</a>
                        <a href="https://www.linkedin.com/in/abiram070207/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition-colors">LinkedIn</a>
                        <a href="https://github.com/Abiram070207" target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Contact;
