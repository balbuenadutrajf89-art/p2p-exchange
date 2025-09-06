import Head from 'next/head'
import Link from 'next/link'

export default function Login() {
  return (
    <>
      <Head>
        <title>P2P Exchange - Login</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-md p-8 rounded-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Entrar</h1>
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
            <input type="password" placeholder="Senha" className="w-full border px-3 py-2 rounded" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
          </form>
          <p className="mt-4 text-center text-sm">
            Não tem conta? <Link href="/register" className="text-blue-600">Registrar</Link>
          </p>
        </div>
      </div>
    </>
  )
}
