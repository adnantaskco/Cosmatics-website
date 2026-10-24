"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Route to profile or dashboard after sign up
    router.push('/profile');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-end overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://plain-apac-prod-public.komododecks.com/202610/23/B5fHszmLfqHPoEIFdFfY/image.jpg')`,
        }}
      >
        {/* Soft white gradient mask matching the login page */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/60 to-slate-100/95" />
      </div>

      {/* Sign Up Card Container */}
      <div className="relative z-10 w-full max-w-md mr-12 lg:mr-24 p-8 flex flex-col items-center">
        {/* Logo / Brand Icon */}
        <div className="mb-4 flex flex-col items-center">
          <div className="border-2 border-slate-700 p-3 rounded-full mb-2">
            <svg
  className="w-8 h-8 stroke-slate-700 fill-none stroke-2"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Lipstick Body */}
  <path
    d="M8 10h7v11H8z"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {/* Lipstick Base */}
  <path
    d="M7 21h9"
    strokeLinecap="round"
  />

  {/* Lipstick Upper Section */}
  <path
    d="M8 10V6h7v4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {/* Lipstick Tip */}
  <path
    d="M8 6l2-3h3l2 3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {/* Small Beauty Sparkle */}
  <path
    d="M19 3v4M17 5h4"
    strokeLinecap="round"
  />

  {/* Small Sparkle */}
  <path
    d="M19 10v2M18 11h2"
    strokeLinecap="round"
  />
</svg>
          </div>
          <span className="tracking-widest text-xs font-semibold text-slate-600 uppercase">
            Create Account
          </span>
        </div>

        {/* Google Sign-Up Button */}
        <button
          type="button"
          className="w-full py-2.5 px-4 mb-3 flex items-center justify-center gap-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="w-full flex items-center my-2">
          <div className="flex-grow border-t border-slate-300"></div>
          <span className="px-3 text-xs text-slate-400 font-medium">OR</span>
          <div className="flex-grow border-t border-slate-300"></div>
        </div>

        {/* Registration Form */}
        <form className="w-full space-y-3 mt-1" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
            />
          </div>

          <div className="flex items-center text-xs text-slate-600 py-1">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" required className="rounded border-slate-300 text-slate-700 focus:ring-slate-400" />
              <span className="ml-2">I agree to the <a href="/terms" className="underline">Terms & Conditions</a></span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium text-sm rounded-lg shadow-sm transition duration-150"
          >
            Create Account
          </button>
        </form>

        <p className="mt-5 text-xs text-slate-500">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-slate-700 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}