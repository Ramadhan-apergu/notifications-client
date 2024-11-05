import { HiOutlineBell } from "react-icons/hi";

export default function Aside() {
    return (
        <div className="w-full h-full bg-white p-8">
            <div className="w-full h-full flex flex-col gap-8">
                <div className="text-center text-2xl font-semibold text-privy-red-600">
                    <p>Privy Logging</p>
                </div>
                <div className="w-full h-full">
                    <div className="w-full h-12 px-3 gap-3 border text-white flex items-center justify-start rounded-md bg-privy-red-600 cursor-pointer">
                        <HiOutlineBell className="text-2xl"/>
                        <p>Notifications</p>
                    </div>
                </div>
            </div>
        </div>
    )
}