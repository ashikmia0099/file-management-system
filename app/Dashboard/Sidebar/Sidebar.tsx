'use client'
import { FcPackage } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import Link from 'next/link';
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/redux/features/Login/LoginSlice';
import { appDispatch, rootState } from "@/redux/store";

export default function Sidebar() {


    const dispatch = useDispatch<appDispatch>();
    const router = useRouter();
    const user = useSelector((state: rootState) => state.login.user)

    // logout handler

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("auth");
        router.push("/");
    };

    return (
        <div className=' p-2 pt-4 space-y-2'>
            {/* All User */}
            {
                user?.role === "ADMIN" && (
                    <div>
                        <Link href={"/Dashboard/Users"}>
                            <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                                <div>
                                    <FaUsers className=' text-3xl text-black' />
                                </div>
                                <div className=''>
                                    <h4 className=' text-[16px] text-black font-semibold'>Users</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }

            {/* user subscription package  */}

            {
                user?.role === "ADMIN" && (
                    <div>
                        <Link href={"/Dashboard/Package-Dashboard"}>
                            <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                                <div>
                                    <FcPackage className=' text-3xl text-black' />
                                </div>
                                <div className=''>
                                    <h4 className=' text-[16px] text-black font-semibold'>Subscription Package</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }
            {/* All Folders */}
            <div>
                <Link href={"/Dashboard"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>All Folder</h4>
                        </div>
                    </div>
                </Link>
            </div>
            {/* All Packages */}
            <div>
                <Link href={"/Dashboard/All-Packages"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>All Packages</h4>
                        </div>
                    </div>
                </Link>
            </div>
            {/* package */}
            <div>
                <Link href={"/Dashboard/Seleted-Package"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>Seleted Package</h4>
                        </div>
                    </div>
                </Link>
            </div>
            {/* logout */}
            <div>
                <div onClick={handleLogout} className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5 cursor-pointer'>
                    <div>
                        <AiOutlineLogout className=' text-3xl text-black' />
                    </div>
                    <div className=''>
                        <h4 className=' text-[16px] text-black font-semibold'>Logout</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
