import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const CURRENCIES = {
  'USD': { name: 'Dólar/USDT', flag: '💵', symbol: '$' },
  'BRL': { name: 'Real Brasileiro', flag: '🇧🇷', symbol: 'R$' },
  'PYG': { name: 'Guarani Paraguaio', flag: '🇵🇾', symbol: '₲' },
  'ARS': { name: 'Peso Argentino', flag: '🇦🇷', symbol: '$' }
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [myOrders, setMyOrders] = useState([])
  const [showCreateOrder, setShowCreateOrder] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [newOrder, setNewOrder] = useState({
    type: 'sell',
    fromCurrency: 'USD',
    toCurrency: 'BRL',
    amount: '',
    rate: '',
    paymentMethod: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchOrders()
    fetchMyOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setOrders(response.data)
    } catch (error) {
      console.error('Erro ao buscar ordens:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMyOrders(response.data)
    } catch (error) {
      console.error('Erro ao buscar minhas ordens:', error)
    }
  }

  const handleCreateOrder = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, newOrder, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setShowCreateOrder(false)
      setNewOrder({
        type: 'sell',
        fromCurrency: 'USD',
        toCurrency: 'BRL',
        amount: '',
        rate: '',
        paymentMethod: ''
      })
      fetchOrders()
      fetchMyOrders()
    } catch (error) {
      alert('Erro ao criar ordem: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleAcceptOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert('Ordem aceita! Em breve implementaremos o chat para negociação.')
      fetchOrders()
    } catch (error) {
      alert('Erro ao aceitar ordem: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-blue-600">P2P Exchange</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Olá, {user?.name}</span>
              <button onClick={handleLogout} className="btn-secondary">
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Actions */}
        <div className="mb-8">
          <button
            onClick={() => setShowCreateOrder(true)}
            className="btn-primary text-lg px-6 py-3"
          >
            + Criar Nova Ordem
          </button>
        </div>

        {/* Create Order Modal */}
        {showCreateOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="card max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Criar Nova Ordem</h3>

              <form onSubmit={handleCreateOrder}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tipo
                  </label>
                  <select
                    value={newOrder.type}
                    onChange={(e) => setNewOrder({...newOrder, type: e.target.value})}
                    className="input-field"
                  >
                    <option value="sell">Vender</option>
                    <option value="buy">Comprar</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      De
                    </label>
                    <select
                      value={newOrder.fromCurrency}
                      onChange={(e) => setNewOrder({...newOrder, fromCurrency: e.target.value})}
                      className="input-field"
                    >
                      {Object.entries(CURRENCIES).map(([code, info]) => (
                        <option key={code} value={code}>
                          {info.flag} {code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Para
                    </label>
                    <select
                      value={newOrder.toCurrency}
                      onChange={(e) => setNewOrder({...newOrder, toCurrency: e.target.value})}
                      className="input-field"
                    >
                      {Object.entries(CURRENCIES).map(([code, info]) => (
                        <option key={code} value={code}>
                          {info.flag} {code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newOrder.amount}
                    onChange={(e) => setNewOrder({...newOrder, amount: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Taxa de Câmbio
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newOrder.rate}
                    onChange={(e) => setNewOrder({...newOrder, rate: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Método de Pagamento
                  </label>
                  <input
                    type="text"
                    value={newOrder.paymentMethod}
                    onChange={(e) => setNewOrder({...newOrder, paymentMethod: e.target.value})}
                    className="input-field"
                    placeholder="Ex: PIX, Transferência bancária..."
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary flex-1">
                    Criar Ordem
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateOrder(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* My Orders */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Minhas Ordens</h2>
          <div className="grid gap-4">
            {myOrders.length === 0 ? (
              <div className="card text-center text-gray-500">
                Você ainda não criou nenhuma ordem
              </div>
            ) : (
              myOrders.map((order) => (
                <div key={order._id} className="card">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-bold text-lg">
                          {order.type === 'sell' ? 'VENDER' : 'COMPRAR'}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {CURRENCIES[order.fromCurrency].flag} {order.amount} {order.fromCurrency} → 
                        {CURRENCIES[order.toCurrency].flag} {order.toCurrency}
                      </p>
                      <p className="text-sm text-gray-500">
                        Taxa: {order.rate} | {order.paymentMethod}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {CURRENCIES[order.toCurrency].symbol} {(order.amount * order.rate).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Available Orders */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Ordens Disponíveis</h2>
          <div className="grid gap-4">
            {orders.filter(order => order.userId !== user?._id && order.status === 'open').length === 0 ? (
              <div className="card text-center text-gray-500">
                Nenhuma ordem disponível no momento
              </div>
            ) : (
              orders
                .filter(order => order.userId !== user?._id && order.status === 'open')
                .map((order) => (
                  <div key={order._id} className="card">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-bold text-lg">
                            {order.type === 'sell' ? 'VENDA' : 'COMPRA'}
                          </span>
                          <span className="text-sm text-gray-500">
                            por {order.userName}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {CURRENCIES[order.fromCurrency].flag} {order.amount} {order.fromCurrency} → 
                          {CURRENCIES[order.toCurrency].flag} {order.toCurrency}
                        </p>
                        <p className="text-sm text-gray-500">
                          Taxa: {order.rate} | {order.paymentMethod}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold mb-2">
                          {CURRENCIES[order.toCurrency].symbol} {(order.amount * order.rate).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleAcceptOrder(order._id)}
                          className="btn-primary"
                        >
                          Aceitar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
