import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Hardcoded authentication for development
      const validCredentials = [
        { 
          email: 'jasimjamilboat@gmail.com', 
          password: 'jasim@123', 
          role: 'admin',
          companyName: 'Appalo'
        }
      ];

      const user = validCredentials.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        // Set authentication token with role and company name
        const authData = {
          token: btoa(user.email),
          role: user.role,
          companyName: user.companyName,
          timestamp: Date.now()
        };

        localStorage.setItem('token', JSON.stringify(authData));
        
        toast.success('Login Successful!', {
          style: {
            background: '#1A1C22',
            color: '#A7ABB2',
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
            background: '#5A5C6A',
            color: '#A7ABB2',
          },
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred', {
        style: {
          background: '#5A5C6A',
          color: '#A7ABB2',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient p-4 relative">
      {/* Company Name Corner Branding */}
      <div className="absolute top-4 left-4 flex items-center">
        <div className="bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full p-2 mr-2 shadow-custom">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <span className="text-2xl font-bold text-accent tracking-tight">Appalo</span>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-primary-300 shadow-custom rounded-2xl p-8 space-y-6 border border-secondary-300">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-accent mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-secondary-50">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-accent mb-2">
                Work Email
              </label>
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                placeholder="name@company.com"
                required
                className="w-full px-3 py-2 bg-primary-200 text-accent border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-300"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-accent mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 bg-primary-200 text-accent border border-secondary-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-secondary-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-secondary-50 hover:text-accent"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-secondary-300 text-accent rounded-lg hover:bg-secondary-400 transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="text-center text-sm text-secondary-50">
            Need help? <a href="/support" className="text-accent hover:underline transition-colors">Contact support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;