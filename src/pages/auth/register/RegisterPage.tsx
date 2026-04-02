import { RegisterForm } from "../../../features/auth";
import { useTranslation } from "react-i18next";
import { UserPlus, Calendar, Users, Star } from "lucide-react";

export function RegisterPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#f5c518]/20 p-4 rounded-full">
              <UserPlus className="w-12 h-12 text-[#f5c518]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('auth.register.title', 'Create Account')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('auth.register.subtitle', 'Join Eventra and start discovering amazing events')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Register Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f5c518]/20 rounded-full mb-4">
                <UserPlus className="w-8 h-8 text-[#f5c518]" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {t('auth.register.formTitle', 'Create Account')}
              </h2>
              <p className="text-gray-400">
                {t('auth.register.formSubtitle', 'Fill in your information to get started')}
              </p>
            </div>
            <RegisterForm />
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('auth.register.alreadyHaveAccount', 'Already have an account?')}
              </h3>
              <p className="text-gray-300 mb-6">
                {t('auth.register.alreadyHaveAccountDesc', 'Sign in to access your existing account and continue your event journey.')}
              </p>
              <a 
                href="#" 
                className="inline-flex items-center justify-center bg-[#f5c518] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#f5c518]/90 transition-all transform hover:scale-105"
              >
                {t('auth.register.signIn', 'Sign In')}
              </a>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                {t('auth.register.features.title', 'What You\'ll Get')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#f5c518]/20 p-2 rounded-lg flex-shrink-0">
                    <Calendar className="w-5 h-5 text-[#f5c518]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">
                      {t('auth.register.features.events.title', 'Event Discovery')}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {t('auth.register.features.events.desc', 'Find events that match your interests')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#f5c518]/20 p-2 rounded-lg flex-shrink-0">
                    <Users className="w-5 h-5 text-[#f5c518]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">
                      {t('auth.register.features.networking.title', 'Networking')}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {t('auth.register.features.networking.desc', 'Connect with like-minded people')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#f5c518]/20 p-2 rounded-lg flex-shrink-0">
                    <Star className="w-5 h-5 text-[#f5c518]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">
                      {t('auth.register.features.favorites.title', 'Favorites')}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {t('auth.register.features.favorites.desc', 'Save and track your favorite events')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
