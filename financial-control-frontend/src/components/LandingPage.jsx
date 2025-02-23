import React from "react";
import "./css/landingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="landing-title">Bem-vindo ao Controle Financeiro</h1>
        <nav className="landing-nav">
          <a href="/login" className="landing-link">Sign In</a>
          <a href="/register" className="landing-link">Register</a>
        </nav>
      </header>
      <main className="landing-main">
        <h2 className="landing-subtitle">Gerencie suas finanças de forma fácil e eficiente</h2>
        <p className="landing-description">
          Nossa aplicação de controle financeiro permite que você registre seus gastos, visualize suas despesas e mantenha suas finanças organizadas.
        </p>
        <div className="landing-features">
          <div className="feature">
            <h3 className="feature-title">Registre seus gastos</h3>
            <p className="feature-description">Adicione e categorize seus gastos diários para um melhor controle financeiro.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Visualize suas despesas</h3>
            <p className="feature-description">Acompanhe suas despesas com gráficos e relatórios detalhados.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Mantenha suas finanças organizadas</h3>
            <p className="feature-description">Planeje seu orçamento e alcance suas metas financeiras.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
