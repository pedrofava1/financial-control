import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/home.css"; // Importando o CSS estilizado

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Nenhum token encontrado, redirecionando para login...");
      navigate("/login");
      return;
    }

    // Simulando busca de dados do backend (você pode integrar com sua API real)
    setTimeout(() => {
      setBalance(1250.75);
      setExpenses(890.32);
      setIncome(2150.50);
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Controle Financeiro</h1>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </header>

      <div className="dashboard">
        <div className="card balance">
          <h2>Saldo Atual</h2>
          <p>R$ {balance.toFixed(2)}</p>
        </div>
        <div className="card income">
          <h2>Receitas</h2>
          <p>R$ {income.toFixed(2)}</p>
        </div>
        <div className="card expenses">
          <h2>Despesas</h2>
          <p>R$ {expenses.toFixed(2)}</p>
        </div>
      </div>

      <div className="actions">
        <button className="action-button">Adicionar Receita</button>
        <button className="action-button">Adicionar Despesa</button>
        <button className="action-button">Ver Relatórios</button>
      </div>
    </div>
  );
};

export default Home;
