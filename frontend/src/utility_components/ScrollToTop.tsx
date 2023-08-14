import React from 'react';
import Button from './Button';
import { useEffect, useState } from 'react';
import IonIcon from '@reacticons/ionicons';

export default function ScrollToTop() {
    const [ShowScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        ShowScrollButton && (
            <Button
                size="custom"
                color="#262a6c"
                extraStyles="fixed z-90 bottom-10 right-9 
            md:w-16 md:h-16 md:rounded-lg md:text-3xl
            sm:w-12 sm:h-12 sm:text-xl sm:rounded-lg
            xs:w-10 xs:h-10 xs:text-lg xs:rounded-lg
            drop-shadow-lg flex justify-center items-center hover:drop-shadow-2xl duration-100"
                onClick={scrollToTop}
            >
                <IonIcon name="arrow-up-outline" />
            </Button>
        )
    );
}
