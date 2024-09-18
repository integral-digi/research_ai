"use client";
import { useState } from "react";
import { Checkbox } from "@headlessui/react";
import CheckboxOne from "@/public/assets/CheckBox";
import CheckBoxTwo from "@/public/assets/CheckBoxTwo";

const TagBar: React.FC = () => {
  const [globalTagsChecked, setGlobalTagsChecked] = useState(false);
  const [documentTagsChecked, setDocumentTagsChecked] = useState(false);

  return (
    <div className="w-full h-16 flex items-center bg-white dark:bg-neutral-800 shadow-3xl">
      <div className="ml-8 flex items-center space-x-8">
        {/* Global Tags Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={globalTagsChecked}
            onChange={setGlobalTagsChecked}
            className="w-5 h-5 rounded-lg border-2 flex items-center justify-center"
          >
            {({ checked }) => (
              <div
                className={`w-5 h-5 rounded-lg border-2 ${
                  checked ? "bg-blue-500 border-blue-500" : "bg-white border-slate-300"
                } flex items-center justify-center`}
              >
                {checked && (
                    <CheckboxOne />
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
            checked={documentTagsChecked}
            onChange={setDocumentTagsChecked}
            className="w-5 h-5 rounded-lg border-2 flex items-center justify-center"
          >
            {({ checked }) => (
              <div
                className={`w-5 h-5 rounded-lg border-2 ${
                  checked ? "bg-green-500 border-green-500" : "bg-white border-slate-300"
                } flex items-center justify-center`}
              >
                {checked && (
                    <CheckBoxTwo />
                )}
              </div>
            )}
          </Checkbox>
          <span className="text-sm font-medium text-gray-700 dark:text-white">
            Document Tags
          </span>
        </div>
      </div>
    </div>
  );
};

export default TagBar;
