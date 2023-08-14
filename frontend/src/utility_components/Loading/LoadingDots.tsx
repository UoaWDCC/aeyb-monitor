export default function LoadingSpinner() {
    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full overflow-hidden bg-gray-800 opacity-50 flex items-center justify-center">
            <div className="bg-white border py-2 px-5 rounded-lg flex flex-col items-center">
                <div className="loader-dots grid grid-cols-3 gap-2">
                    <div className="bg-[#7d6ca3] rounded-full w-2 h-2"></div>
                    <div className="bg-[#7d6ca3] rounded-full w-2 h-2"></div>
                    <div className="bg-[#7d6ca3] rounded-full w-2 h-2"></div>
                </div>
                <div className="text-gray-500 text-xs font-light mt-2 text-center">Please wait...</div>
            </div>
        </div>
    );
}
