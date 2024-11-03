const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configurações de Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB Atlas
mongoose.connect(
  'mongodb+srv://Lucas:<db_password>@cluster0.3tzao.mongodb.net/loginApp?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definir Esquema e Modelo de Usuário
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Rota para Registrar um Novo Usuário
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: "Usuário já existe" });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    
    await newUser.save();
    res.json({ success: true, message: "Conta criada com sucesso!" });
  } catch (err) {
    res.json({ success: false, message: "Erro ao criar conta" });
  }
});

// Rota para Login do Usuário
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Encontrar o usuário no banco de dados
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "Usuário não encontrado" });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Senha incorreta" });
    }

    res.json({ success: true, message: "Login bem-sucedido!" });
  } catch (err) {
    res.json({ success: false, message: "Erro ao fazer login" });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
