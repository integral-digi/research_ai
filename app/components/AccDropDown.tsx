"use client"
import Link from "next/link";
import Toggler from "./Toggler";
import { ArrowLeftStartOnRectangleIcon, QuestionMarkCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const menuItems = [
  { id: 1, name: "Help", icon: <QuestionMarkCircleIcon className="w-5 h-5 text-gray-700 dark:text-white" />, href: "#" },
  { id: 2, name: "Logout", icon: <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-gray-700 dark:text-white" />, href: "/login" },
];

const darkItem = {
  name: "Dark mode",
  switch: <Toggler />
};

const AccDropdown = () => {
  return (
    <div className="w-72 h-fit relative bg-white dark:bg-neutral-800  rounded-xl drop-shadow-lg">
      <div className="space-y-6 p-8">
        <div className="space-y-6">
            {menuItems.map((item) => (
                <section key={item.id}>
                    <Link className="flex items-center justify-between" href={item.href} passHref>
                        <p className="text-gray-700 dark:text-white text-base font-medium">
                            {item.name}
                        </p>
                        {item.icon}
                    </Link>
                </section>
            ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-700 dark:text-white text-base font-medium">
            {darkItem.name}
          </p>
          <div className="w-fit">
            {darkItem.switch}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccDropdown;
