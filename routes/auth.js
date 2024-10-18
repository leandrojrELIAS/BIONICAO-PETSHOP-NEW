// Função para realizar o login
async function login(event) {
  event.preventDefault();
  const id = document.getElementById('loginId').value;
  try {
      const response = await fetch('/.netlify/functions/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
          localStorage.setItem('userId', id);
          window.location.href = 'index.html';
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente.');
  }
}

// Função para realizar o cadastro
async function cadastrar(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  try {
      const response = await fetch('/.netlify/functions/api/auth/cadastro', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, cpf }),
      });
      const data = await response.json();
      if (response.ok) {
          alert(`Cadastro realizado com sucesso! Seu ID é: ${data.id}`);
          window.location.href = 'login.html';
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar. Tente novamente.');
  }
}

// Adicionar event listeners aos formulários
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const cadastroForm = document.getElementById('cadastroForm');
  
  if (loginForm) {
      loginForm.addEventListener('submit', login);
  }
  
  if (cadastroForm) {
      cadastroForm.addEventListener('submit', cadastrar);
  }
});