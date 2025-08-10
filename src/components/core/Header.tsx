"use client";

import { useState, useEffect, useRef } from "react";
import useSidebarStore from "@/store/useSidebarStore";
import { User, ChevronDown, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Header = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { logout, user } = useAuthStore((state) => state);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsProfileOpen(false);
            }
        }
        if (isProfileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isProfileOpen]);

    return (
        <header className="relative z-30 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-16 px-5 ">
                {/* Left */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        aria-label="Toggle sidebar"
                        className="p-2 rounded-md border cursor-pointer border-gray-300 hover:bg-gray-100 transition"
                    >
                        {isSidebarOpen ?  <Menu size={20} /> :  <X size={20} />}
                    </button>

                    <div className="hidden md:block">
                        <h1 className="text-xl font-semibold text-gray-900 select-none">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-500 select-none">Welcome back</p>
                    </div>
                </div>

                {/* Right */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen((open) => !open)}
                        className="flex items-center cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
                        aria-haspopup="true"
                        aria-expanded={isProfileOpen}
                    >
                        <div className="relative">
                            <div className="w-9 h-9 bg-gray-300 rounded-md flex items-center justify-center text-gray-600 shadow-sm">
                                <User size={16} />
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white bg-green-500" />
                        </div>
                        <div className="hidden lg:flex flex-col text-left">
                            <p className="text-gray-900 font-medium leading-tight select-none">
                                {user?.email}
                            </p>
                            <p className="text-gray-500 text-xs select-none">{user?.role}</p>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : "rotate-0"
                                }`}
                        />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-300 rounded-md flex items-center justify-center text-gray-600 shadow-sm">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">                {user?.email}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => logout()}
                                className="w-full text-left px-4 py-3 cursor-pointer text-red-600 hover:bg-red-50 transition font-medium flex items-center space-x-2"
                            >
                                <LogOut size={16} />
                                <span>Sign out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
