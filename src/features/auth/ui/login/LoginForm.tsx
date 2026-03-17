import { useNavigate } from "react-router"
import { useLoginForm } from "../../hooks/useLoginForm"
import { useLoginMutation } from "../../api/authApi"
import { initialLoginForm } from "../../model/constants/loginConstants"
import { useState } from "react"
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { setUser } from '../../model/authSlice.ts';

export function LoginForm(){
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [_error, setError] = useState<boolean>(false);
    const { 
      values, 
      errors, 
      validate, 
      handleChange 
    } = useLoginForm(initialLoginForm)

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
      
      if(!validate()) return
      try{
        setError(false)
        const user = await login(values).unwrap()
        dispatch(setUser({ 
          id: user.id?.toString(), 
          email: user.email.toString() 
        }));
        navigate("/admin")
      } catch(error) {
        console.error("Login Failed", error)
        setError(true)
      }
    }

    return(
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange("email")}
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange("password")}
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>
    )
}