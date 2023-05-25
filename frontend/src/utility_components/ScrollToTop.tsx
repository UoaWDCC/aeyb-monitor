import React from 'react';
import Button from './Button';
import IonIcon from '@reacticons/ionicons';

export default function ScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Button
            size="custom"
            color="#262a6c"
            extraStyles="fixed z-90 bottom-10 right-9 
            md:w-16 md:h-16 md:rounded-full md:text-3xl
            sm:w-12 sm:h-12 sm:text-xl sm:rounded-full
            xs:w-10 xs:h-10 xs:text-lg xs:rounded-full
            drop-shadow-lg flex justify-center items-center hover:drop-shadow-2xl duration-100"
            onClick={scrollToTop}
        >
            <IonIcon name="arrow-up-outline" />
        </Button>
    );
}
