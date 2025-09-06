import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>P2P Exchange - Home</title>
      </Head>

      <div className="min-h-screen">
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Troca P2P</h1>
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="btn-primario">Painel</Link>
                <button onClick={handleLogout} className="btn-secundario">Sair</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-primario">Login</Link>
                <Link href="/register" className="btn-secundario">Registrar</Link>
              </>
            )}
          </div>
        </nav>

        <main className="text-center py-20 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <h2 className="text-4xl font-bold mb-6">Troque Moedas de Forma Segura</h2>
          <p className="text-lg">Plataforma P2P para câmbio de USD/USDT, BRL, PYG e ARS</p>
        </main>
      </div>
    </>
  )
}
