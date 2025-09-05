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
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (!storedUser) {
      router.push('/login')
    } else {
      setUser(storedUser)
      fetchOrders()
    }
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`)
      const allOrders = res.data
      setOrders(allOrders.filter(o => o.creator._id !== user?._id))
      setMyOrders(allOrders.filter(o => o.creator._id === user?._id))
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const createOrder = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        creator: user._id,
        amount: newOrder.amount,
        currencyFrom: newOrder.fromCurrency,
        currencyTo: newOrder.toCurrency
      })
      setShowCreateOrder(false)
      fetchOrders()
    } catch (err) {
      console.error(err)
      alert("Erro ao criar ordem")
    }
  }

  const acceptOrder = async (id) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}/accept`, {
        acceptor: user._id
      })
      fetchOrders()
    } catch (err) {
      console.error(err)
      alert("Erro ao aceitar ordem")
    }
  }

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Ordem atualizada para: ${data.status}`);
        fetchOrders()
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar ordem");
    }
  };

  if (loading) return <p>Carregando...</p>

  return (
    <div className="p-8">
      <h1>P2P Exchange</h1>
      <p>Olá, {user?.name}</p>

      <button 
        onClick={() => setShowCreateOrder(!showCreateOrder)}
        style={{ marginTop: "10px", background: "blue", color: "#fff", padding: "8px", borderRadius: "6px" }}
      >
        + Criar Nova Ordem
      </button>

      {showCreateOrder && (
        <div style={{ marginTop: "15px" }}>
          <h3>Nova Ordem</h3>
          <input 
            type="number"
            placeholder="Valor"
            value={newOrder.amount}
            onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
          />
          <button onClick={createOrder}>Salvar</button>
        </div>
      )}

      <h2 style={{ marginTop: "20px" }}>Minhas Ordens</h2>
      {myOrders.length === 0 ? (
        <p>Você ainda não criou nenhuma ordem</p>
      ) : (
        myOrders.map((order) => (
          <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
            <p>{order.currencyFrom} → {order.currencyTo}</p>
            <p>Valor: {order.amount}</p>
            <p>Status: {order.status}</p>

            {/* Botão para concluir */}
            {order.status === "ACCEPTED" && (
              <button 
                onClick={() => updateOrderStatus(order._id, "COMPLETED")}
                style={{ marginRight: "10px", background: "green", color: "#fff", padding: "5px 10px", borderRadius: "4px" }}
              >
                Concluir Ordem
              </button>
            )}

            {/* Botão para cancelar */}
            {order.status === "CREATED" && (
              <button 
                onClick={() => updateOrderStatus(order._id, "CANCELLED")}
                style={{ background: "red", color: "#fff", padding: "5px 10px", borderRadius: "4px" }}
              >
                Cancelar Ordem
              </button>
            )}
          </div>
        ))
      )}

      <h2 style={{ marginTop: "20px" }}>Ordens Disponíveis</h2>
      {orders.length === 0 ? (
        <p>Nenhuma ordem disponível no momento</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
            <p>{order.currencyFrom} → {order.currencyTo}</p>
            <p>Valor: {order.amount}</p>
            <p>Status: {order.status}</p>
            {order.status === "CREATED" && (
              <button 
                onClick={() => acceptOrder(order._id)}
                style={{ background: "orange", color: "#fff", padding: "5px 10px", borderRadius: "4px" }}
              >
                Aceitar Ordem
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}
