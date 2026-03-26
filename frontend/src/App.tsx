import { useState } from "react"
import { MoonLogo } from "./components/MoonLogo"

export const App = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center'>
      <div className='bg-slate-900 border border-purple-900 p-6 rounded-xl w-96'>
        <MoonLogo />
        <h1 className=' text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent'>MoonFit</h1>
        
        <div>
          <p className='text-white text-center'>Entre na sua conta</p>

          <form className='text-purple-300 flex flex-col gap-4' onSubmit={handleSubmit}> 
            <label className='font-semibold  text-purple-300 text-sm mb-1 block' htmlFor="email">Email: </label>
            <input className='w-full bg-gray-800 text-white rounded-lg p-3 outline-none' type="email" name='email' placeholder='Digite seu email' id='email' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />

            <label className='font-semibold text-purple-300 text-sm mb-1 block' htmlFor="password">Password: </label>
            <input className='w-full bg-gray-800 text-white rounded-lg p-3 outline-none' type="password" name='password' placeholder='Digite sua senha' id='password' value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
            
            <button className='text-white rounded-xl w-full p-2 bg-purple-700 hover:bg-purple-600' type='submit' >Entrar</button>
          </form>

        </div>
        
        
      </div>
    </div>
  )
}