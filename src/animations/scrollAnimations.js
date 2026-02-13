import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateTitle = (element) => {
    gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
            },
        }
    );
};

export const animateStagger = (elements, stagger = 0.1) => {
    gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: stagger,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: elements[0],
                start: 'top 85%',
            },
        }
    );
};
