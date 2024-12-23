const Data_Atual = new Date();

const cancelarForm = window.document.getElementById('Cancelar-formulario-task')
const aceitarForm = window.document.getElementById('Adicionar-formulario-task')

const voltar = window.document.getElementById('ancora-voltar-lista')
const Titulo_input = window.document.getElementById('titulo-task')
const Desc_input = window.document.getElementById('Descrição-task')
const Data_input = window.document.getElementById('data-task')



const Dias_da_semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", 'Sexta-Feira', 'Sábado'];
const Meses_do_ano = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const Nome_dia = Dias_da_semana[Data_Atual.getDay()];
const Dia_do_mes = Data_Atual.getDate();
const Nome_mes = Meses_do_ano[Data_Atual.getMonth()];

const tarefas = {
    "24-12-2024": [{titulo:'estudar', descricao:'estudar para isso', data:'24-12-2024'}, {titulo: 'dormir', descricao:'dormir as 21:30', data:'22-12-2024'}],

    "22-12-2024": [{titulo:'programar', descricao:'criar to do list', data:'26-12-2024'}]
}

cancelarForm.addEventListener('click', () => {
    window.location.href = 'ListaDeTarefas.html'
})


aceitarForm.addEventListener('submit', () => {
    criar_nova_tarefa()
})

function criar_nova_tarefa() {
    let dia = `${Dia_do_mes}-${(Data_Atual.getMonth())+1}-${Data_Atual.getFullYear()}`

    let tarefa_para_ser_add = {
        titulo: String(Titulo_input.value),
        descricao: String(Desc_input.value),
        data: String(Data_input.value)
    }

    let tarefas_salvas = JSON.parse(localStorage.getItem('Tarefas'))

    if (dia in tarefas_salvas) {
        tarefas_salvas[dia].unshift(tarefa_para_ser_add)
    } else {
        tarefas_salvas[dia] = [tarefa_para_ser_add]
    }

    localStorage.removeItem('Tarefas')
    localStorage.setItem('Tarefas', JSON.stringify(tarefas_salvas))


}