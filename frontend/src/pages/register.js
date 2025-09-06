import Head from 'next/head'
import Link from 'next/link'

export default function Register() {
  return (
    <>
      <Head>
        <title>P2P Exchange - Registrar</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-md p-8 rounded-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Criar Conta</h1>
          <form className="space-y-4">
            <input type="text" placeholder="Nome" className="w-full border px-3 py-2 rounded" />
            <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
            <input type="password" placeholder="Senha" className="w-full border px-3 py-2 rounded" />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Registrar</button>
          </form>
          <p className="mt-4 text-center text-sm">
            Já tem conta? <Link href="/login" className="text-blue-600">Entrar</Link>
          </p>
        </div>
      </div>
    </>
  )
}
