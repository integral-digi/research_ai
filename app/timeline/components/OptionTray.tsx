const OptionTray = ({ options }: any) => {
    return (
        <div className="w-full max-w-sm shadow-3xl dark:bg-neutral-800 bg-white rounded-lg">
            <div className="w-full p-6 space-y-6">
                {options.map((option: any, index: any)=> (
                    <section key={index} className="w-full space-y-4">
                        <p className="hover:text-blue-500 text-nowrap text-base md:text-sm text-gray-700 dark:text-white font-medium">
                            {option.name}
                        </p>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default OptionTray;