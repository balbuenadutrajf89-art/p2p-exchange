import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://p2p-exchange-2gol.onrender.com/api/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(res.data);
      } catch (err) {
        setError("Erro ao carregar ordens.");
      }
    };

    fetchOrders();
  }, []);

  const acceptOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://p2p-exchange-2gol.onrender.com/api/orders/${id}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert(`Ordem ${id} aceita!`);
    } catch (err) {
      alert("Erro ao aceitar ordem.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Minhas Ordens</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id} style={{ marginBottom: 10 }}>
            <strong>{order.type}</strong> - {order.amount} ({order.status})
            {order.status === "open" && (
              <button onClick={() => acceptOrder(order.id)} style={{ marginLeft: 10 }}>
                Aceitar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
