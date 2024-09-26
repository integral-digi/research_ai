import Logo from "@/public/assets/Logo";

const appInfo = {
    name: "Research AI",
    currentVersion: "0.0.1",
    aboutText: "Research AI is the premier text analysis platform",
    copyright: "© 2024 Research AI, All Rights Reserved."
}

const About = () => {
    return (
        <div className="space-y-20">
            <section className="flex flex-col items-center justify-center space-y-12">
                <Logo />
                <p className="font-medium text-gray-700 dark:text-white text-center text-sm">
                    Version {appInfo.currentVersion}
                </p>
                <p className="font-medium text-gray-700 dark:text-white text-center text-base">
                    {appInfo.aboutText}
                </p>
            </section>
            <hr className="border border-slate-300 w-full dark:border-gray-700" />
            <section className="w-full">
                <p className="font-medium text-sm text-gray-700/70 dark:text-white/70 text-center">
                    {appInfo.copyright}
                </p>
            </section>
        </div>
    )
}

export default About;