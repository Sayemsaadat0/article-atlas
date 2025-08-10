"use client";

import { useState } from "react";
import useSidebarStore from "@/store/useSidebarStore";
import { User, ChevronDown, LogOut, Menu } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Header = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const { logout } = useAuthStore((state) => state)


    return (
        <header className="z-30 bg-gray-100 border-b">

            {/* Main container */}
            <div className="flex items-center justify-between h-full   p-3">

                {/* Left section */}
                <div className="flex items-center  space-x-4">
                    {/* Mobile menu toggle */}
                    <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="border border-black/40 p-3 rounded-xl">
                        <Menu />
                    </div>

                    {/* Page title with breadcrumb */}
                    <div className="hidden md:block">

                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">Welcome back</p>
                    </div>
                </div>
                {/* Right section */}
                <div className="flex items-center space-x-3">
                    {/* User profile */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center space-x-3 p-2 pr-3 rounded-xl    transition-all duration-300 group"

                        >
                            <div className="relative">
                                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <User size={16} className="text-white" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-semibold text-gray-900">John Smith</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <ChevronDown size={16} className="text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                        </button>

                        {/* Profile dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 top-full mt-2 w-64 bg-white backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                                <div className="p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-b border-gray-100/50">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                            <User size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">John Smith</p>
                                            <p className="text-sm text-gray-500">john.smith@company.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 border-t border-gray-100/50">
                                    <button onClick={() => logout()} className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50/80 transition-all duration-200 group text-red-600">
                                        <LogOut size={16} className="group-hover:text-red-700" />
                                        <span className="text-sm font-medium group-hover:text-red-700">Sign out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.03),rgba(255,255,255,0))] pointer-events-none"></div>
        </header>
    );
};

export default Header;