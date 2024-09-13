// Função para formatar a data e hora
function formatarDataHora(dataISO, hora) {
    const data = new Date(dataISO);

    // Ajuste de  fuso horário se necessário
    const dataLocal = new Date(data.getTime() + data.getTimezoneOffset() * 60000);

    // Formatação da data
    const opcoesData = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dataFormatada = dataLocal.toLocaleDateString('pt-BR', opcoesData); // Exemplo para o Brasil

    // Formatação da hora
    const opcoesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const horaFormatada = new Date(`1970-01-01T${hora}:00`).toLocaleTimeString('pt-BR', opcoesHora);

    return `${dataFormatada} às ${horaFormatada}`;
}

// Manipulador de envio do formulário de agendamento
document.getElementById('agendamentoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const agendamento = {
        nome: document.getElementById('nome').value,
        raca: document.getElementById('raca').value,
        peso: parseFloat(document.getElementById('peso').value),
        idade: parseInt(document.getElementById('idade').value),
        servico: document.getElementById('servico').value,
        dataAgendamento: document.getElementById('dataAgendamento').value,
        horaAgendamento: document.getElementById('horaAgendamento').value,
        nomeDono: document.getElementById('nomeDono').value,  
        contatoDono: document.getElementById('contatoDono').value  
    };

    try {
        const response = await fetch('http://localhost:5000/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(agendamento) // Envia o objeto `agendamento` diretamente evitando erros 
        });

        if (response.ok) {
            alert('Agendamento realizado com sucesso!');
            carregarAgendamentos();
        } else {
            const errorData = await response.json();
            console.error('Erro:', errorData);
            alert('Erro ao realizar agendamento.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar agendamento.');
    }
});

// Função para carregar e exibir agendamentos
async function carregarAgendamentos() {
    try {
        const response = await fetch('http://localhost:5000/api/agendamentos');
        const agendamentos = await response.json();

        const agendamentosList = document.getElementById('agendamentosList');
        agendamentosList.innerHTML = '';

        agendamentos.forEach(agendamento => {
            const mensagem = formatarDataHora(agendamento.dataAgendamento, agendamento.horaAgendamento);
            const li = document.createElement('li');
            li.textContent = `Pet: ${agendamento.nome} (${agendamento.raca}) - Serviço: ${agendamento.servico} em ${mensagem} | Dono: ${agendamento.nomeDono} (Contato: ${agendamento.contatoDono})`;  // Corrigido para `nomeDono` e `contatoDono`
            agendamentosList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
    }
}
