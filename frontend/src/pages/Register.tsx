import '../index.css'
import { useForm } from "react-hook-form"
import { MoonLogo } from "../components/MoonLogo"
import { registerSchema, type RegisterData } from "../schemas/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../lib/axios"
import { useMutation } from "@tanstack/react-query"
import { AuthTabs } from '../components/AuthTabs'

export const RegisterPage = () => {
  const  { register, handleSubmit, formState: { errors } }  = useForm<RegisterData>({
    resolver: zodResolver(registerSchema)
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: RegisterData) => api.post('/auth/register', data)
  })

  async function onSubmit(data: RegisterData) {
  try {
    await mutateAsync(data)
    console.log('Usuário registrado com sucesso')
  } catch (error) {
    console.error('Erro ao se registrar:', error)
  }
}

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center'>
      <div className='bg-slate-900 border border-purple-900 p-6 rounded-xl w-96'>
        <MoonLogo />
        <h1 className=' text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent'>MoonFit</h1>
        
        <div>
          <p className='text-white text-center'>Crie sua conta</p>
          <AuthTabs />

          <form className='text-purple-300 flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}> 
             <label className='font-semibold  text-purple-300 text-sm mb-1 block' htmlFor="name">Name </label>
            <input className='w-full bg-gray-800 text-white rounded-lg p-3 outline-none' type="name" placeholder='Digite seu nome' id='name' { ...register('name')} />
            {errors.name && <span className='text-red-400 text-sm'>{errors.name.message}</span>
            }

            <label className='font-semibold  text-purple-300 text-sm mb-1 block' htmlFor="email">Email </label>
            <input className='w-full bg-gray-800 text-white rounded-lg p-3 outline-none' type="email" placeholder='Digite seu email' id='email' { ...register('email')} />
            {errors.email && <span className='text-red-400 text-sm'>{errors.email.message}</span>}

            <label className='font-semibold text-purple-300 text-sm mb-1 block' htmlFor="password">Password </label>
            <input className='w-full bg-gray-800 text-white rounded-lg p-3 outline-none' type="password" placeholder='Digite sua senha' id='password' { ...register('password') } />
            {errors.password && <span className='text-red-400 text-sm'>{errors.password.message}</span>}
            
            <button className='text-white rounded-xl w-full p-2 bg-purple-700 hover:bg-purple-600' type='submit' disabled={isPending} >{isPending ? 'Registrando...' : 'Registrar'}</button>
          </form>

        </div>
      </div>
    </div>
  )
}