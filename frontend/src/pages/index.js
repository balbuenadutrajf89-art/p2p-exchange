import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">P2P Exchange</h1>
            </div>
            <div className="flex space-x-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="btn-primary">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn-secondary">
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary">
                    Entrar
                  </Link>
                  <Link href="/register" className="btn-primary">
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h2 className="text-5xl font-bold mb-6">
            Troque Moedas de Forma Segura
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Plataforma P2P para câmbio entre USD/USDT, Real Brasileiro, Guarani Paraguaio e Peso Argentino
          </p>

          {!isLoggedIn && (
            <div className="space-x-4">
              <Link href="/register" className="btn-primary text-lg px-8 py-3">
                Começar Agora
              </Link>
              <Link href="/login" className="btn-secondary text-lg px-8 py-3">
                Já tenho conta
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="card text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Seguro</h3>
            <p className="text-gray-600">Sistema de escrow para proteger suas transações</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Rápido</h3>
            <p className="text-gray-600">Negociações diretas entre usuários</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🌎</div>
            <h3 className="text-xl font-bold mb-2">Multi-moeda</h3>
            <p className="text-gray-600">USD, BRL, PYG, ARS disponíveis</p>
          </div>
        </div>

        {/* Supported Currencies */}
        <div className="card mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Moedas Suportadas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💵</div>
              <p className="font-semibold">USD/USDT</p>
              <p className="text-sm text-gray-600">Dólar Americano</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🇧🇷</div>
              <p className="font-semibold">BRL</p>
              <p className="text-sm text-gray-600">Real Brasileiro</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🇵🇾</div>
              <p className="font-semibold">PYG</p>
              <p className="text-sm text-gray-600">Guarani Paraguaio</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🇦🇷</div>
              <p className="font-semibold">ARS</p>
              <p className="text-sm text-gray-600">Peso Argentino</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
