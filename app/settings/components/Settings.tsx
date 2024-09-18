"use client";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels
} from '@headlessui/react';
import { useModal } from '@/context/ModalProvider';
import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import EditProfile from './Profile';

const SettingsModal = () => {
    const { isOpen, toggleModal } = useModal();
    const tabItems = [
        { name: 'Edit Profile' },
        { name: 'Notifications' },
        { name: 'Security' },
        { name: 'Vault' },
        { name: 'Plugins' },
        { name: 'Team' },
        { name: 'Appearance' },
        { name: 'Delete Account' },
    ];

    return (
        <>
            <Dialog
                as="div"
                className="relative z-50"
                open={isOpen}
                onClose={() => toggleModal(false)} 
            >
                <div className="fixed inset-0 bg-black bg-opacity-30" />
                
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg w-full max-w-4xl z-30">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <DialogTitle className="text-lg font-medium text-gray-900">
                                Settings
                            </DialogTitle>
                            <button
                                onClick={() => toggleModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <TabGroup>
                            <div className="flex">
                                {/* Tab List (Vertical Navigation) */}
                                <TabList className="w-1/4 border-r border-gray-200">
                                    {tabItems.map((item, idx) => (
                                        <Tab
                                            key={idx}
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full py-2 px-4 text-left text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 focus:outline-none',
                                                    selected
                                                        ? 'bg-gray-100 text-blue-600'
                                                        : 'text-gray-700 dark:text-white'
                                                )
                                            }
                                        >
                                            {item.name}
                                        </Tab>
                                    ))}
                                </TabList>

                                {/* Tab Panels */}
                                <TabPanels className="w-3/4 p-6">
                                    <TabPanel className="space-y-12">
                                        <h3 className="text-lg font-medium text-gray-900">Edit Profile</h3>
                                        <EditProfile />
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Notification settings.
                                        </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="text-lg font-medium text-gray-900">Security</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Security settings.
                                        </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="text-lg font-medium text-gray-900">Files</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Vault.
                                        </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="text-lg font-medium text-gray-900">Plugins</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Plugins.
                                        </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="text-lg font-medium text-gray-900">Team</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Team.
                                        </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Appearance.
                                        </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="text-lg font-medium text-gray-900">Delete Account</h3>
                                        <p className="mt-2 text-sm text-red-600">
                                            Warning: This action is irreversible. Proceed with caution.
                                        </p>
                                        <button className="mt-4 px-4 py-2 text-white bg-red-600 rounded-md">
                                            Delete Account
                                        </button>
                                    </TabPanel>
                                </TabPanels>
                            </div>
                        </TabGroup>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default SettingsModal;
