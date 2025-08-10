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
                className={` h-screen z-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 transition-all duration-300 ease-in-out shadow-2xl border-r border-s-gray-dark overflow-hidden   ${isSidebarOpen ? 'w-72' : 'w-0'}`}
            >

                {/* Header with glassmorphism effect */}
                <div className="h-20 border-b border-gray-800/30 flex items-center px-4 bg-white/5 gap-2 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110">
                        <span className="text-s-white font-bold text-sm">AA</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Article Atlas
                        </h1>
                    </div>
                </div>

                {/* Navigation with modern styling */}
                <nav className="pt-2 space-y-2 px-2">
                    {navigationItems.map(({ icon: IconComponent, label, path }) => {
                        const isActive = pathname === path;
                        return (
                            <div key={label} className="relative">
                                <Link
                                    href={path}
                                    className={`group flex border border-transparent items-center px-2 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${isActive
                                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800/40 hover:border hover:border-gray-700/50"
                                        }`}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full"></div>
                                    )}

                                    {/* Icon container with modern styling */}
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl mr-4 transition-all duration-300 ${isActive
                                        ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30 shadow-lg"
                                        : "bg-gray-800/50 group-hover:bg-gray-700/60"
                                        }`}>
                                        <IconComponent
                                            size={20}
                                            className={`transition-all duration-300 ${isActive
                                                ? "text-blue-300 drop-shadow-sm"
                                                : "text-gray-400 group-hover:text-white group-hover:scale-110"
                                                }`}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <span className={`font-semibold text-sm tracking-wide transition-all duration-300 ${isActive
                                            ? "text-white"
                                            : "text-gray-300 group-hover:text-white"
                                            }`}>
                                            {label}
                                        </span>
                                    </div>

                                    {/* Subtle arrow for active state */}
                                    {isActive && (
                                        <div className="text-blue-300/60">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </nav>


                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),rgba(255,255,255,0))] pointer-events-none"></div>
            </div>
        </>
    );
};

export default Sidebar;