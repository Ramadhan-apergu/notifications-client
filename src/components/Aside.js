"use client"

import { RxDashboard } from "react-icons/rx";
import { AiOutlineTeam } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";

export default function Aside() {    
    const pathname = usePathname()
    const router = useRouter()

    const classActive = 'text-white bg-privy-red-600'
    const classes = 'text-privy-red-600 hover:text-white border-privy-red-600 bg-white hover:bg-privy-red-600'

    return (
        <div className="w-full h-full bg-white p-8">
            <div className="w-full h-full flex flex-col gap-8">
                <div className="text-center text-xl font-semibold text-privy-red-600 flex flex-wrap gap-1 justify-center">
                    <p>Privy</p>
                    <p>Logging</p>
                </div>
                <div className="w-full h-full space-y-2">
                    <div onClick={() => {router.push('/')}} className={`${pathname == '/' ? classActive : classes} w-full h-10 px-3 gap-3 border flex items-center justify-start rounded-md box-border duration-100 cursor-pointer`}>
                        <RxDashboard className="text-xl"/>
                        <p>Dashboard</p>
                    </div>
                    <div onClick={() => {router.push('/crm')}} className={`${pathname == '/crm' ? classActive : classes} w-full h-10 px-3 gap-3 border flex items-center justify-start rounded-md box-border duration-100 cursor-pointer`}>
                        <AiOutlineTeam className="text-xl "/>
                        <p>CRM</p>
                    </div>
                    <div onClick={() => {router.push('/erp')}} className={`${pathname == '/erp' ? classActive : classes} w-full h-10 px-3 gap-3 border flex items-center justify-start rounded-md box-border duration-100 cursor-pointer`}>
                        <GoGear className="text-xl "/>
                        <p>ERP</p>
                    </div>
                </div>
            </div>
        </div>
    )
}