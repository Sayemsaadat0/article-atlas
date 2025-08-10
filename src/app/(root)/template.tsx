
import PrivateRoute from "@/components/routes/PrivateRoute"
import Header from "@/components/ui/core/Header"
import Sidebar from "@/components/ui/core/Sidebar"
import React from "react"

const template = ({ children }: { children: React.ReactNode }) => {
    return (

        <div
            className={`flex relative h-screen    `}
        >
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden ">
                <Header />
                <main className="flex-1 overflow-y-auto p-5 bg-gray-100">
                    <div className="min-h-[calc(100vh-100px)]">
                        <PrivateRoute>
                            {children}
                        </PrivateRoute>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default template