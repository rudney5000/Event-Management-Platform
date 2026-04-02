import { useNavigate } from "react-router"
import { useLocalizedPath } from "../../../../shared/hooks/useLocalizedPath"
import { useLoginForm } from "../../hooks/useLoginForm"
import { useLoginMutation } from "../../api"
import { initialLoginForm } from "../../model/constants/loginConstants"
import { useState } from "react"
import { useAppDispatch } from '../../../../shared/hooks';
import { errors } from "../../../../shared/config/i18n/errors.ts"
import {setCredentials} from "../../slice";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, LogIn } from "lucide-react";

export function LoginForm(){
    const navigate = useNavigate()
    const localizedPath = useLocalizedPath()
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const [login, { isLoading }] = useLoginMutation();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const { 
      values, 
      errors: formErrors,
      validate, 
      handleChange 
    } = useLoginForm(initialLoginForm)

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
      
      if(!validate()) return
      try{
        setErrorMsg(null)
          
        const data = await login(values).unwrap()
        dispatch(setCredentials(data));
          
        navigate(localizedPath("/"))
      } catch(error) {
        console.error(errors.login.failed, error)
        let msg = errors.login.invalidCredentials.en;

          if (
              typeof error === "object" &&
              error !== null &&
              "data" in error &&
              typeof (error as { data: unknown }).data === "object" &&
              (error as { data: Record<string, unknown> }).data !== null &&
              "message" in (error as { data: Record<string, unknown> }).data
          ) {
              msg = String((error as { data: { message: unknown } }).data.message);
          }

        setErrorMsg(msg)
      }
    }

    return(
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-300">
            {t('auth.login.email', 'Email address')}
          </label>
          <div className="mt-2 relative">
            <input
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange("email")}
              type="email"
              placeholder={t('auth.login.emailPlaceholder', 'Enter your email')}
              required
              autoComplete="email"
              className="block w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent outline-none"
            />
            {formErrors.email && <p className="text-red-400 text-sm mt-2">{formErrors.email}</p>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-300">
              {t('auth.login.password', 'Password')}
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-[#f5c518] hover:text-[#f5c518]/80">
                {t('auth.login.forgotPassword', 'Forgot password?')}
              </a>
            </div>
          </div>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              placeholder={t('auth.login.passwordPlaceholder', 'Enter your password')}
              value={values.password}
              onChange={handleChange("password")}
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              className="block w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 pr-12 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {formErrors.password && <p className="text-red-400 text-sm mt-2">{formErrors.password}</p>}
            {errorMsg && <p className="text-red-400 text-sm mt-2">{errorMsg}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center items-center rounded-lg bg-[#f5c518] text-black font-semibold py-3 px-4 text-sm/6 shadow-sm hover:bg-[#f5c518]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c518] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                {t('auth.login.signingIn', 'Signing in...')}
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                {t('auth.login.signIn', 'Sign in')}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(localizedPath('/register'))}
            className="flex w-full justify-center rounded-lg bg-white/10 border border-white/20 font-semibold py-3 px-4 text-sm/6 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 transition-all"
          >
            {t('auth.login.register', 'Register')}
          </button>
        </div>
      </form>
    )
}