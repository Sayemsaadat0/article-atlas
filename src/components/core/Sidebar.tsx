"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useSidebarStore from "@/store/useSidebarStore";
import { Home, Text } from "lucide-react";

const Sidebar = () => {
    const { isSidebarOpen } = useSidebarStore();
    const pathname = usePathname();

    const navigationItems = [
        { icon: Home, label: "Dashboard", path: "/" },
        { icon: Text, label: "Articles", path: "/articles" },
    ];

    return (
        <>
            <div
                className={`h-screen z-20 bg-white transition-all duration-300 ease-in-out shadow-lg border-r border-gray-200 overflow-hidden ${isSidebarOpen ? "w-72" : "w-0"
                    } flex flex-col`}
            >
                {/* Header */}
                <div className="h-16 border-b border-gray-200 flex items-center px-6 gap-3 flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer select-none">
                        <span className="text-white font-bold text-lg">AA</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 select-none">
                        Article Atlas
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 pt-6 px-2 space-y-2 overflow-y-auto">
                    {navigationItems.map(({ icon: IconComponent, label, path }) => {
                        const isActive = pathname === path;
                        return (
                            <Link
                                key={label}
                                href={path}
                                className={`group flex items-center gap-5 rounded-xl px-5 py-3 relative transition-all duration-300 cursor-pointer
              ${isActive
                                        ? "bg-indigo-50 text-indigo-700 shadow-sm font-semibold"
                                        : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                                    }
            `}
                            >
                                {/* Left active bar */}
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-lg"></span>
                                )}

                                {/* Icon container */}
                                <div
                                    className={`flex items-center justify-center w-9 h-9 rounded-lg transition-transform duration-300 ${isActive
                                            ? "bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-400 group-hover:bg-indigo-200 group-hover:text-indigo-700"
                                        } group-hover:scale-110`}
                                >
                                    <IconComponent size={22} />
                                </div>

                                {/* Label */}
                                <span
                                    className={`text-base tracking-wide transition-colors duration-300 ${isActive ? "text-indigo-700" : "group-hover:text-indigo-700"
                                        }`}
                                >
                                    {label}
                                </span>

                                {/* Arrow */}
                                {isActive && (
                                    <svg
                                        className="w-5 h-5 text-indigo-400 ml-auto"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>


    );
};

export default Sidebar;