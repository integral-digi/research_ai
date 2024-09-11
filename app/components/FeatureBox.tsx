"use client";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { data } from "@/utils/data";
import { useRouter } from "next/navigation";
import { SquaresPlusIcon } from "@heroicons/react/16/solid";

const featureInfo = {
  title: "Welcome to Research AI",
  subtitle: "Explore these Quick Actions to get started",
};

const FeatureCard = () => {
  const router = useRouter();
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 p-8 md:p-12">
      {/* Title Section */}
      <section className="space-y-6 text-center">
        <h2 className="text-3xl font-black text-gray-700 dark:text-white">
          {featureInfo.title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-white font-medium">
          {featureInfo.subtitle}
        </p>
      </section>

      {/* Features Section */}
      <section className="space-y-8 px-24">
        {data.features.map((feature) => (
          <div
            key={feature.id}
            className="w-full p-4 md:p-6 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-zinc-900 flex items-center hover:shadow-xl cursor-pointer transition-shadow"
            onClick={() => router.push(feature.href)}
          >
            {/* Feature Icon and Title */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-neutral-800 rounded-md">
                {/* {feature.image} */}
                <SquaresPlusIcon className="text-gray-700 dark:text-white w-6 h-6" />
              </div>
              <p className="text-lg text-gray-700 dark:text-white font-medium">
                {feature.title}
              </p>
            </div>
            {/* Arrow Icon */}
            <ArrowRightIcon className="ml-auto w-6 h-6 text-gray-500" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default FeatureCard;
