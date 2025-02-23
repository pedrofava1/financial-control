import React, { useState } from 'react';
import axios from 'axios';
import "./css/login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // 🔹 Garante que o form não recarrega a página
  
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
  
      if (response.status === 200 || response.status === 201) {
        const token = response.data.token; // 🔹 Pegando o token retornado pelo backend
        localStorage.setItem("token", token); // 🔹 Salvando no localStorage
        console.log("esse é o token: ",localStorage.getItem("token"))
        setMessageType('success');
        setMessage('Autenticação bem-sucedida! Redirecionando...');
  
        setTimeout(() => {
          window.location.href = "/home"; // 🔹 Redirecionando manualmente
        }, 2000);
      } else {
        setMessageType('error');
        setMessage('Erro: Credenciais inválidas.');
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setMessageType('error');
      setMessage('Erro: Credenciais inválidas.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
