import { LoginForm } from "../../../features/auth";
import { useTranslation } from "react-i18next";
import { LogIn } from "lucide-react";

export function LoginPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#f5c518]/20 p-4 rounded-full">
              <LogIn className="w-12 h-12 text-[#f5c518]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('auth.login.title', 'Sign In')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('auth.login.subtitle', 'Welcome back to Eventra')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Login Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f5c518]/20 rounded-full mb-4">
                <LogIn className="w-8 h-8 text-[#f5c518]" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {t('auth.login.formTitle', 'Sign In')}
              </h2>
              <p className="text-gray-400">
                {t('auth.login.formSubtitle', 'Enter your credentials to access your account')}
              </p>
            </div>
            <LoginForm />
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('auth.login.newHere', 'New to Eventra?')}
              </h3>
              <p className="text-gray-300 mb-6">
                {t('auth.login.newHereDesc', 'Join thousands of event organizers and participants discovering amazing events.')}
              </p>
              <a 
                href="#" 
                className="inline-flex items-center justify-center bg-[#f5c518] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#f5c518]/90 transition-all transform hover:scale-105"
              >
                {t('auth.login.signUp', 'Sign Up')}
              </a>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('auth.login.benefits.title', 'Why Choose Eventra?')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#f5c518] rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{t('auth.login.benefits.discover', 'Discover amazing events')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#f5c518] rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{t('auth.login.benefits.connect', 'Connect with organizers')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#f5c518] rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{t('auth.login.benefits.manage', 'Manage your bookings')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
