"use client"
import { Fragment, useState } from 'react';
import { Checkbox } from '@headlessui/react';

const TagBar = () => {
  const [globalTagsChecked, setGlobalTagsChecked] = useState(false);
  const [documentTagsChecked, setDocumentTagsChecked] = useState(false);

  return (
    <div className="w-full h-16 flex items-center bg-white dark:bg-neutral-800 shadow-3xl">
        <div className="ml-8 flex items-center space-x-8">
            {/* Global Tags Checkbox */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    as={Fragment}
                    checked={globalTagsChecked}
                    onChange={setGlobalTagsChecked}
                >
                {({ checked }) => (
                    <div
                        className={`w-5 h-5 rounded-lg border-2 ${
                            checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300'
                        } flex items-center justify-center`}
                    >
                    {checked && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.586 4.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z"
                            clipRule="evenodd"
                        />
                        </svg>
                    )}
                    </div>
                )}
                </Checkbox>
                <span className="text-sm font-medium text-gray-700 dark:text-white">
                    Global Tags
                </span>
            </div>

            {/* Document Tags Checkbox */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    as={Fragment}
                    checked={documentTagsChecked}
                    onChange={setDocumentTagsChecked}
                >
                {({ checked }) => (
                    <div
                        className={`w-5 h-5 rounded-lg border-2 ${
                            checked ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'
                        } flex items-center justify-center`}
                    >
                    {checked && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.586 4.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z"
                            clipRule="evenodd"
                        />
                        </svg>
                    )}
                    </div>
                )}
                </Checkbox>
                <span className="text-sm font-medium text-gray-700 dark:text-white">Document Tags</span>
            </div>
        </div>
    </div>
  );
};

export default TagBar;
