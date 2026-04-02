import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocalizedPath } from "../../../../shared/hooks/useLocalizedPath";
import { UserPlus, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localizedPath = useLocalizedPath();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = t('auth.register.errors.usernameRequired', 'Username is required');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('auth.register.errors.emailRequired', 'Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s]+$/.test(formData.email)) {
      newErrors.email = t('auth.register.errors.emailInvalid', 'Email is invalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('auth.register.errors.passwordRequired', 'Password is required');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.register.errors.passwordMinLength', 'Password must be at least 6 characters');
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.register.errors.confirmPasswordRequired', 'Please confirm your password');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.register.errors.passwordsNotMatch', 'Passwords do not match');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // TODO: Implement registration API call
      console.log('Registration data:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(localizedPath('/login'));
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        general: t('auth.register.errors.general', 'Registration failed. Please try again.') 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-300">
          {t('auth.register.username', 'Username')}
        </label>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            placeholder={t('auth.register.usernamePlaceholder', 'Choose a username')}
            required
            autoComplete="username"
            className="block w-full rounded-lg bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent outline-none"
          />
          {errors.username && <p className="text-red-400 text-sm mt-2">{errors.username}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-300">
          {t('auth.register.email', 'Email address')}
        </label>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('auth.register.emailPlaceholder', 'Enter your email')}
            required
            autoComplete="email"
            className="block w-full rounded-lg bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent outline-none"
          />
          {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-300">
          {t('auth.register.password', 'Password')}
        </label>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t('auth.register.passwordPlaceholder', 'Create a password')}
            required
            autoComplete="new-password"
            className="block w-full rounded-lg bg-white/10 border border-white/20 pl-10 pr-12 py-3 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-300">
          {t('auth.register.confirmPassword', 'Confirm Password')}
        </label>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder={t('auth.register.confirmPasswordPlaceholder', 'Confirm your password')}
            required
            autoComplete="new-password"
            className="block w-full rounded-lg bg-white/10 border border-white/20 pl-10 pr-12 py-3 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>}
        </div>
      </div>

      {errors.general && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300">{errors.general}</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="flex w-full justify-center items-center rounded-lg bg-[#f5c518] text-black font-semibold py-3 px-4 text-sm/6 shadow-sm hover:bg-[#f5c518]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c518] transition-all"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {t('auth.register.createAccount', 'Create Account')}
        </button>
        <button
          type="button"
          onClick={() => navigate(localizedPath('/login'))}
          className="flex w-full justify-center rounded-lg bg-white/10 border border-white/20 font-semibold py-3 px-4 text-sm/6 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 transition-all"
        >
          {t('auth.register.signIn', 'Sign In')}
        </button>
      </div>
    </form>
  );
}
