import {
    FiGithub,
    FiTwitter,
    FiLinkedin,
    FiGlobe,
    FiYoutube,
} from 'react-icons/fi';
import AppFooterCopyright from './AppFooterCopyright';
import ChatAI from '../reusable/ChatAI';

const socialLinks = [
    { id: 1, icon: <FiGlobe />, url: '#' },
    { id: 2, icon: <FiGithub />, url: '#' },
    { id: 3, icon: <FiTwitter />, url: '#' },
    { id: 4, icon: <FiLinkedin />, url: '#' },
    { id: 5, icon: <FiYoutube />, url: '#' },
];

const AppFooter = () => {
    return (
        <div className="container mx-auto">
            {/* Mantido o padding inferior de 100px que você pediu antes */}
            <div className="pt-20 sm:pt-30 pb-[100px] mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
                
                {/* AI Chat Section - ADICIONADO MARGIN BOTTOM PARA DESGRUDAR */}
                <div className="mb-20">
                    <ChatAI />
                </div>

                {/* Footer social links */}
                <div className="font-general-regular flex flex-col justify-center items-center mb-12 sm:mb-28">
                    <p className="text-3xl sm:text-4xl text-primary-dark dark:text-primary-light mb-5">
                        Follow me
                    </p>
                    <ul className="flex gap-4 sm:gap-8">
                        {socialLinks.map((link) => (
                            <a
                                href={link.url}
                                key={link.id}
                                className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-4 duration-300"
                            >
                                <i className="text-xl sm:text-2xl md:text-3xl">
                                    {link.icon}
                                </i>
                            </a>
                        ))}
                    </ul>
                </div>

                <AppFooterCopyright />
            </div>
        </div>
    );
};

export default AppFooter;