import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/allOrders")
      .then((res) => {
        console.log(res.data);
        setAllOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <>
      <h3 className="title">All Orders </h3>

      <div className="orders">
        <div className="order-table">
          <table>
            <tr>
              <th>Name</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
            {allOrders.length === 0 ? (
              <div className="no-orders">
                <p>You haven't placed any orders today</p>
                <Link to={"/"} className="btn">
                  Get started
                </Link>
              </div>
            ) : (
              allOrders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price}</td>
                    <td
                      style={{
                        color: order.mode === "BUY" ? "green" : "red",
                        fontWeight: "bold",
                        fontSize: "25px",
                      }}
                    >
                      {order.mode === "BUY" ? "+" : "-"}
                    </td>
                  </tr>
                );
              })
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
