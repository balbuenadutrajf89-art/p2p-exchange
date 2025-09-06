import Head from 'next/head'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>P2P Exchange - Dashboard</title>
      </Head>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Painel do Usuário</h1>
        <p className="mt-4">Aqui você pode gerenciar suas ordens e transações P2P.</p>
      </div>
    </>
  )
}
