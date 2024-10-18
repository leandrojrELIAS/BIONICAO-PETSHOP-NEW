// Função para formatar a data e hora
function formatarDataHora(dataISO, hora) {
    const data = new Date(dataISO);
    const dataLocal = new Date(data.getTime() + data.getTimezoneOffset() * 60000);
    const opcoesData = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dataFormatada = dataLocal.toLocaleDateString('pt-BR', opcoesData);
    const horaFormatada = hora ? hora.slice(0, 5) : '';
    return `${dataFormatada} às ${horaFormatada}`;
}

// Função para enviar e salvar agendamento (Novo ou Editado)
async function enviarAgendamento(event) {
    event.preventDefault();
    const agendamentoId = document.getElementById('agendamentoId').value;

    const dados = {
        nomeDono: document.getElementById('nomeDono').value,
        contatoDono: document.getElementById('contatoDono').value,
        nome: document.getElementById('nome').value,
        raca: document.getElementById('raca').value,
        peso: document.getElementById('peso').value,
        idade: document.getElementById('idade').value,
        servico: document.getElementById('servico').value,
        dataAgendamento: document.getElementById('dataAgendamento').value,
        horaAgendamento: document.getElementById('horaAgendamento').value,
    };

    try {
        let url = '/.netlify/functions/api/agendamentos';
        let method = 'POST';

        if (agendamentoId) {
            url += `/${agendamentoId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao agendar o serviço.');
        }

        alert('Agendamento realizado com sucesso!');
        carregarAgendamentos();
        limparFormulario();
    } catch (error) {
        console.error('Erro ao agendar:', error);
        alert(`Erro ao realizar o agendamento: ${error.message}`);
    }
}

// ... (other functions remain the same)

// Função para carregar e exibir agendamentos
async function carregarAgendamentos() {
    try {
        console.log('Iniciando carregamento de agendamentos');
        const response = await fetch('/.netlify/functions/api/agendamentos');
        const agendamentos = await response.json();

        const agendamentosList = document.getElementById('agendamentosList');
        agendamentosList.innerHTML = '';

        agendamentos.forEach(agendamento => {
            const mensagem = formatarDataHora(agendamento.dataAgendamento, agendamento.horaAgendamento);
            const li = document.createElement('li');
            li.innerHTML = `
                Pet: ${agendamento.nome} (${agendamento.raca}) - Serviço: ${agendamento.servico} em ${mensagem} | Dono: ${agendamento.nomeDono} (Contato: ${agendamento.contatoDono})
                <div class="button-container-list">
                    <button onclick="editarAgendamento('${agendamento._id}')">Editar</button>
                    <button onclick="deletarAgendamento('${agendamento._id}')">Excluir</button>
                </div>
            `;
            agendamentosList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
        alert(`Erro ao carregar agendamentos: ${error.message}`);
    }
}

// Função para editar agendamento pelo ID
async function editarAgendamento(id) {
    try {
        const response = await fetch(`/.netlify/functions/api/agendamentos/${id}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro HTTP! status: ${response.status}, mensagem: ${errorText}`);
        }

        const agendamento = await response.json();

        document.getElementById('agendamentoId').value = agendamento._id;
        document.getElementById('nome').value = agendamento.nome || '';
        document.getElementById('raca').value = agendamento.raca || '';
        document.getElementById('peso').value = agendamento.peso || '';
        document.getElementById('idade').value = agendamento.idade || '';
        document.getElementById('servico').value = agendamento.servico || '';
        document.getElementById('dataAgendamento').value = agendamento.dataAgendamento ? new Date(agendamento.dataAgendamento).toISOString().split('T')[0] : '';
        document.getElementById('horaAgendamento').value = agendamento.horaAgendamento || '';
        document.getElementById('nomeDono').value = agendamento.nomeDono || '';
        document.getElementById('contatoDono').value = agendamento.contatoDono || '';
    } catch (error) {
        console.error('Erro ao carregar agendamento para edição:', error);
        alert(`Erro ao carregar agendamento para edição: ${error.message}`);
    }
}

// Função para deletar um agendamento
async function deletarAgendamento(id) {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
        try {
            const response = await fetch(`/.netlify/functions/api/agendamentos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Agendamento excluído com sucesso!');
                carregarAgendamentos();
            } else {
                throw new Error('Erro ao excluir agendamento');
            }
        } catch (error) {
            console.error('Erro ao deletar agendamento:', error);
            alert('Erro ao deletar agendamento.');
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarAgendamentos();
    document.getElementById('agendamentoForm').addEventListener('submit', enviarAgendamento);
});