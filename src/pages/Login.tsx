
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);

      // Determine user role based on email (for demo purposes)
      let userRole = "admin";
      let userName = "Sarah Johnson";

      if (email.includes("agent")) {
        userRole = "agent";
        userName = "Mike Wilson";
      } else if (email.includes("sales")) {
        userRole = "sales";
        userName = "Alex Thompson";
      }

      // Store user data in localStorage
      const userData = {
        name: userName,
        role: userRole,
        email: email,
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));

      toast({
        title: "Login Successful",
        description: `Welcome back to PestGuard CRM, ${userName}!`,
      });

      // Navigate based on role
      if (userRole === "agent") {
        navigate("/agent/profile");
      } else if (userRole === "sales") {
        navigate("/sales/profile");
      } else {
        navigate("/dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-left">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Don't have an account? <span className="text-blue-600 cursor-pointer hover:underline">Register</span></p>
            </div>
            
            {/* User Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
              Login to your account
            </h1>
            <p className="text-gray-600 text-center text-sm">
              Enter your details to login.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@mimicdesign.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="• • • • • • • • •"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-white border-gray-300 text-gray-900"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 p-0 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Keep me logged in
                </Label>
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-gray-600 hover:text-gray-500 underline"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium transition-colors rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Demo Credentials:
            </h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p>
                <strong>Admin:</strong> admin@pestguard.com / password123
              </p>
              <p>
                <strong>Agent:</strong> agent@pestguard.com / password123
              </p>
              <p>
                <strong>Sales:</strong> sales@pestguard.com / password123
              </p>
              <p className="italic">
                Note: Any email/password combination will work for demo purposes
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center space-x-2">
              <span>© 2025 PestGuard CRM</span>
              <select className="bg-transparent text-sm text-gray-500 border-none outline-none">
                <option>ENG</option>
              </select>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Testimonial */}
      <div className="hidden lg:flex lg:flex-1 bg-gray-100 items-center justify-center p-12">
        <div className="max-w-md text-center space-y-6">
          {/* User Avatar */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🐛</span>
            </div>
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-xl text-gray-800 leading-relaxed">
            "The Pest Control Management app has revolutionized our operations. It's efficient and user-friendly, streamlining everything from lead generation to quotation tracking."
          </blockquote>

          {/* Author */}
          <div className="space-y-1">
            <p className="font-semibold text-gray-900">Marcus Rodriguez</p>
            <p className="text-gray-600 text-sm">CEO / PestControl Pro</p>
          </div>

          {/* Rating */}
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-black rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
