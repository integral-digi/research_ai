"use client"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import classNames from 'classnames';
import EditProfile from './Profile';
import { UserIcon, BoltIcon, ShieldExclamationIcon, ArchiveBoxIcon, CubeIcon, CreditCardIcon, AdjustmentsHorizontalIcon, TrashIcon } from '@heroicons/react/24/solid';
import { createElement } from 'react';
import Security from './Security';
import ChooseModel from '@/app/chat/components/ModelSelection';
import DeleteAcct from './DeleteAcct';
import Appearance from './Appearance';

const tabItems = [
    { name: 'Edit Profile', icon: UserIcon },
    { name: 'Notifications', icon: BoltIcon },
    { name: 'Security', icon: ShieldExclamationIcon },
    { name: 'Vault', icon: ArchiveBoxIcon },
    { name: 'Plugins', icon: CubeIcon },
    { name: 'Subscription', icon: CreditCardIcon },
    { name: 'Appearance', icon: AdjustmentsHorizontalIcon },
    { name: 'Delete Account', icon: TrashIcon }
];

const SettingsTab = () => {
    return (
        <TabGroup>
            <div className="flex items-start">
                {/* Tab List (Vertical Navigation) */}
                <TabList className="w-1/3 space-y-2">
                    {tabItems.map((item, idx) => (
                        <Tab
                            key={idx}
                            className={({ selected }) =>
                                classNames(
                                    'flex items-center space-x-3 w-full py-2 px-4 text-left text-base font-medium text-gray-700 dark:text-white hover:bg-zinc-900/20  focus:outline-none',
                                    selected
                                        ? 'bg-slate-100 dark:bg-zinc-900 text-blue-600'
                                        : 'text-gray-700 dark:text-white'
                                )
                            }
                        >
                            <section className="text-gray-700 dark:text-white w-4 h-4">
                                {createElement(item.icon)}
                            </section>
                            <p>
                                {item.name}
                            </p> 
                        </Tab>
                    ))}
                </TabList>
                {/* Tab Panels */}
                <TabPanels className="w-2/3 pl-10">
                    <TabPanel className="space-y-12">
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            Edit Profile
                        </h3>
                        <EditProfile />
                    </TabPanel>
                    <TabPanel className="space-y-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Notifications
                        </h3>
                    </TabPanel>
                    <TabPanel className="space-y-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Security
                        </h3>
                        <Security />
                    </TabPanel>
                    <TabPanel className="space-y-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Vault
                        </h3>
                        <ChooseModel />
                    </TabPanel>
                    <TabPanel className="space-y-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Manage Plugins
                        </h3>
                    </TabPanel>
                    <TabPanel className="space-y-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Subscription
                        </h3>
                    </TabPanel>
                    <TabPanel className="space-y-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Appearance
                        </h3>
                        <Appearance />
                    </TabPanel>
                    <TabPanel className="space-y-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Delete Account
                        </h3>
                        <DeleteAcct />
                    </TabPanel>
                </TabPanels>
            </div>
        </TabGroup>
    )
}

export default SettingsTab;