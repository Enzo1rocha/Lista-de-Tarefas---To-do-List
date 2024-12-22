const { json } = require("sequelize")

const cancelarForm = window.document.getElementById('Cancelar-formulario-task')
const ListaDeTarefahtml = window.document.getElementById('Ancora-voltar-lista')
const Titulo_input = window.document.getElementById('titulo-task')
const Desc_input = window.document.getElementById('Descrição-task')
const Data_input = window.document.getElementById('data-task')

const Tarefas_Salvas = JSON.parse(localStorage.getItem('TarefasDoUsuario'))

const Data_Atual = new Date();
const Dias_da_semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", 'Sexta-Feira', 'Sábado'];

const Meses_do_ano = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const Nome_dia = Dias_da_semana[Data_Atual.getDay()];
const Dia_do_mes = Data_Atual.getDate();
const Nome_mes = Meses_do_ano[Data_Atual.getMonth()];

const tarefas = {
    "24/12/2024": [{titulo:'estudar', descricao:'estudar para isso', data:'24/12/2024'}, {titulo: 'dormir', descricao:'dormir as 21:30', data:'22/12/2024'}],

    "22/12/2024": [{titulo:'programar', descricao:'criar to do list', data:'26/12/2024'}]
}

localStorage.setItem('TarefasDoUsuario', JSON.stringify(tarefas))


function voltar_Lista_de_Tarefa() {
    ListaDeTarefahtml.click();
}

function getFormTask() {

}