"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader } from "lucide-react";
import Button from "@/components/ui/button";
import { generateToken } from "@/lib/auth";
import { useAuthStore } from "@/store/useAuthStore";

type User = {
    email: string;
    password: string;
    role: "admin" | "user";
};

const USERS: User[] = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "user@example.com", password: "user123", role: "user" },
];

const LoginForm = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const { user, setUser } = useAuthStore((state) => state);
    console.log(user)

    async function handleSubmit(e?: React.FormEvent) {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate loading for better UX
        await new Promise(resolve => setTimeout(resolve, 800));

        const user = USERS.find(
            (u) => u.email === email.trim() && u.password === password
        );

        if (user) {
            const token = generateToken();
            setUser({
                name: "", // you can set name later or add name field in USERS
                email: user.email,
                token,
                role: user.role,
            });
            router.push("/");
        } else {
            setError("Invalid email or password");
        }
        setIsLoading(false);
    }

    return (
        <main className="min-h-screen  flex items-center justify-center p-4">


            <div className="relative w-full max-w-md ">
                {/* Main form */}
                <div className="bg-white/70 backdrop-blur-sm border rounded-2xl shadow-xl shadow-slate-900/5 p-8">
                    {/* Logo/Brand area */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
                        <p className="text-slate-600">Sign in to your account</p>
                    </div>
                    <div className="space-y-6">
                        {/* Email field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="username"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                                <p className="text-red-800 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Submit button */}
                        <Button
                            label={isLoading ? 'Signing in..' : 'Sign in'}
                            icon={isLoading ? <Loader /> : <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />}
                            onClick={handleSubmit}
                            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center group cursor-pointer"
                        >
                        </Button>
                    </div>

                    {/* Test credentials */}
                    <div className="mt-8 bg-slate-900/10 backdrop-blur-sm border border-slate-200/50 rounded-xl p-2">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3 text-center">Demo Credentials</h3>
                        <div className="space-y-2 text-xs">
                            <div className="bg-white/50 rounded-lg p-3">
                                <p className="font-semibold text-slate-800 mb-1">Administrator</p>
                                <p className="text-slate-600">admin@example.com / admin123</p>
                            </div>
                            <div className="bg-white/50 rounded-lg p-3">
                                <p className="font-semibold text-slate-800 mb-1">Standard User</p>
                                <p className="text-slate-600">user@example.com / user123</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginForm
