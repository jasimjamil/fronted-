import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [lampIntensity, setLampIntensity] = useState(0.7);
  const navigate = useNavigate();

  // Company Branding
  const companyInfo = {
    name: 'Appalo',
    fullName: 'Appalo Technologies',
    tagline: 'Intelligent Workforce Management',
    primaryColor: '#1A1C22',
    secondaryColor: '#5A5C6A',
    accentColor: '#A7ABB2'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    
    // Hardcoded credentials for development
    const validCredentials = [
      { 
        username: 'jasimjamilboat@gmail.com', 
        password: 'jasim@123', 
        role: 'admin'
      },
      { 
        username: 'manager@appalo.com', 
        password: 'manager@123', 
        role: 'manager'
      },
      { 
        username: 'employee@appalo.com', 
        password: 'employee@123', 
        role: 'employee'
      }
    ];

    const user = validCredentials.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    setTimeout(() => {
      if (user) {
        // Store authentication data
        localStorage.setItem('token', JSON.stringify({
          token: btoa(user.username),
          role: user.role,
          timestamp: Date.now()
        }));

        toast.success('Login Successful!', {
          style: {
            background: companyInfo.primaryColor,
            color: companyInfo.accentColor,
          },
        });

        // Navigate based on role
        switch(user.role) {
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'manager':
            navigate('/dashboard/manager');
            break;
          case 'employee':
            navigate('/dashboard/employee');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        toast.error('Invalid credentials', {
          style: {
            background: companyInfo.secondaryColor,
            color: companyInfo.accentColor,
          },
        });
        setIsAnimating(false);
      }
    }, 1500);
  };

  const toggleLampIntensity = () => {
    setLampIntensity(prev => prev === 0 ? 0.7 : 0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background with Company Colors */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1A1C22] via-[#5A5C6A] to-[#A7ABB2] animate-gradient-x"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      >
        {/* Animated Particles Effect */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full opacity-50 animate-float"
              style={{
                width: `${Math.random() * 5}px`,
                height: `${Math.random() * 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Lamp Fixture */}
      <div 
        className="absolute top-0 left-0 w-full z-10 cursor-pointer"
        onClick={toggleLampIntensity}
      >
        <div className="relative w-full h-16 bg-black">
          {/* Lamp Body */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gray-800"></div>
          
          {/* Lamp Light */}
          <div 
            className="absolute top-8 left-0 w-full h-8 bg-gradient-to-b from-[rgba(255,165,0,0.7)] to-transparent transition-opacity duration-500" 
            style={{ 
              opacity: lampIntensity,
            }}
          ></div>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div 
          className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mx-4 transform transition-all duration-500 hover:scale-105"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Company Logo and Branding */}
          <div className="flex flex-col items-center mb-8">
            {/* Animated Logo */}
            <div 
              className="w-24 h-24 bg-gradient-to-br from-[#1A1C22] to-[#5A5C6A] rounded-full flex items-center justify-center mb-4 transform transition-all duration-500 hover:rotate-6 hover:scale-110"
            >
              <span className="text-4xl font-bold text-white tracking-tighter">
                {companyInfo.name[0]}
              </span>
            </div>

            {/* Company Name with Modern Typography */}
            <div className="text-center">
              <h1 className="text-4xl font-black text-[#1A1C22] tracking-tighter mb-2 transform transition-all duration-300 hover:tracking-wide">
                {companyInfo.fullName}
              </h1>
              <p className="text-sm text-[#5A5C6A] uppercase tracking-widest font-medium">
                {companyInfo.tagline}
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
                className="w-full px-4 py-3 bg-gray-100 text-[#1A1C22] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#5A5C6A] transition-all duration-300 group-hover:border-[#A7ABB2]"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-[#1A1C22] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
                className="w-full px-4 py-3 bg-gray-100 text-[#1A1C22] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#5A5C6A] transition-all duration-300 group-hover:border-[#A7ABB2]"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-[#1A1C22] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={credentials.rememberMe}
                  onChange={() => setCredentials({...credentials, rememberMe: !credentials.rememberMe})}
                  className="h-4 w-4 text-[#5A5C6A] focus:ring-[#1A1C22] border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a 
                href="/forgot-password" 
                className="text-sm text-[#5A5C6A] hover:text-[#1A1C22] hover:underline transition-all"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              disabled={isAnimating}
              className="w-full py-3 bg-grahttps://github.com/jasimjamil/fronted-dient-to-r from-[#1A1C22] to-[#5A5C6A] text-white rounded-lg hover:from-[#5A5C6A] hover:to-[#1A1C22] transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {isAnimating ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? {' '}
              <a 
                href="/register" 
                className="text-[#5A5C6A] hover:text-[#1A1C22] hover:underline transition-all"
              >
                Register
              </a>
            </p>
          </div>

          {/* Swipe for Code */}
          <div className="mt-4 text-center text-sm text-gray-500 animate-pulse">
            Swipe for Code
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;