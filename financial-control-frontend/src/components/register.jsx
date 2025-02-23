import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./css/register.css"

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setMessageType('error');
      setMessage('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/register', {
        name,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        setMessageType('success');
        setMessage('Registro bem-sucedido! Você será redirecionado ao login.');
        console.log('Registro bem-sucedido, redirecionando para login...');

        setTimeout(() => {
          console.log('Chamando navigate para /login');
          navigate('/login');
        }, 2000);
      } else {
        console.log('Resposta inesperada:', response);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessageType('error');
        setMessage('Erro: O e-mail já está registrado.');
      } else {
        setMessageType('error');
        setMessage('Erro ao registrar. Tente novamente.');
      }
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registrar</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
            placeholder="Digite seu nome"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
            placeholder="Digite seu email"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            placeholder="Digite sua senha"
          />
        </div>

        <button type="submit" className="submit-button">Registrar</button>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
