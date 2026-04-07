import { useCountUp } from 'react-countup';
import CounterItem from './CounterItem';

const AboutCounter = () => {
    // reflects your journey starting in 2016 [cite: 70]
    useCountUp({ ref: 'experienceCounter', end: 9, duration: 2 });
    // based on the 50+ projects developed for clients [cite: 74]
    useCountUp({ ref: 'projectsCounter', end: 50, duration: 2 });
    // based on the hundreds of students taught at fnde/ifpa [cite: 88]
    useCountUp({ ref: 'studentsCounter', end: 500, duration: 2 });
    // reflects your two major research fellowships (cnpq & capes) [cite: 90, 95]
    useCountUp({ ref: 'researchCounter', end: 2, duration: 2 });

    return (
        <div className="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
            <div className="font-general-medium container mx-auto py-20 block sm:flex sm:justify-between items-center">
                <CounterItem
                    title="years of experience"
                    counter={<span id="experienceCounter" />}
                    measurement="+"
                />

                <CounterItem
                    title="projects completed"
                    counter={<span id="projectsCounter" />}
                    measurement="+"
                />

                <CounterItem
                    title="students mentored"
                    counter={<span id="studentsCounter" />}
                    measurement="+"
                />

                <CounterItem
                    title="scientific honors"
                    counter={<span id="researchCounter" />}
                    measurement=""
                />
            </div>
        </div>
    );
};

export default AboutCounter;