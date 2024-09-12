import { Switch } from '@headlessui/react';
import { useEffect } from 'react';
import { useDarkMode } from '../../context/DarkModeContext';

const Toggler: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const handleChange = (value: boolean) => {
        toggleDarkMode();
    };

    return (
        <Switch
            checked={darkMode}
            onChange={handleChange}
            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-blue-700/40 dark:bg-white dark:bg-blue-900/50 p-1 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-blue-700 shadow-lg ring-0 transition duration-200 ease-in-out ${
                    darkMode ? 'translate-x-7' : 'translate-x-0'
                }`}
            />
        </Switch>
    );
};

export default Toggler;
