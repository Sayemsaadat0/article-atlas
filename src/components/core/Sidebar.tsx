"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useSidebarStore from "@/store/useSidebarStore";
import { BarChart3, Home } from "lucide-react";

const Sidebar = () => {
    const { isSidebarOpen } = useSidebarStore();
    const pathname = usePathname();

    const navigationItems = [
        { icon: Home, label: "Dashboard", path: "/" },
        { icon: BarChart3, label: "Articles", path: "/articles" },
    ];

    return (
        <>
            <div
                className={`h-screen z-20 bg-white transition-all duration-300 ease-in-out shadow-lg border-r border-gray-200 overflow-hidden ${isSidebarOpen ? "w-72" : "w-0"
                    }`}
            >
                {/* Header */}
                <div className="h-20 border-b border-gray-200 flex items-center px-4 gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110">
                        <span className="text-white font-bold text-sm">AA</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">
                        Article Atlas
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="pt-3 space-y-2 px-2">
                    {navigationItems.map(({ icon: IconComponent, label, path }) => {
                        const isActive = pathname === path;
                        return (
                            <div key={label} className="relative">
                                <Link
                                    href={path}
                                    className={`group flex border border-transparent items-center px-2 py-2 rounded-xl transition-all duration-300 relative overflow-hidden ${isActive
                                            ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 hover:border hover:border-gray-200"
                                        }`}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 rounded-xl mr-4 transition-all duration-300 ${isActive
                                                ? "bg-blue-100 text-blue-600 shadow-inner"
                                                : "bg-gray-100 text-gray-400 group-hover:text-blue-600"
                                            }`}
                                    >
                                        <IconComponent size={20} />
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={`font-medium text-sm tracking-wide transition-all duration-300 ${isActive
                                                ? "text-blue-700"
                                                : "text-gray-700 group-hover:text-blue-600"
                                            }`}
                                    >
                                        {label}
                                    </span>

                                    {/* Arrow */}
                                    {isActive && (
                                        <svg
                                            className="w-4 h-4 text-blue-500/70 ml-auto"
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
                            </div>
                        );
                    })}
                </nav>
            </div>
        </>

    );
};

export default Sidebar;