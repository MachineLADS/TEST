import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre login e registro
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const endpoint = isRegistering ? "/register" : "/login"; // Define o endpoint com base na tela atual
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data.message);

    if (data.success) {
      alert(isRegistering ? "Conta criada com sucesso!" : "Login bem-sucedido!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>{isRegistering ? "Registrar" : "Acesse o sistema"}</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          {!isRegistering && (
            <>
              <label>
                <input type="checkbox" />
                Lembre de mim
              </label>
              <a href="#">Esqueceu sua senha?</a>
            </>
          )}
        </div>
        <button type="submit">{isRegistering ? "Registrar" : "Login"}</button>
        <div className="signup-link">
          <p>
            {isRegistering ? (
              <>
                Já tem uma conta? <a href="#" onClick={() => setIsRegistering(false)}>Login</a>
              </>
            ) : (
              <>
                Não tem uma conta? <a href="#" onClick={() => setIsRegistering(true)}>Registrar</a>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;