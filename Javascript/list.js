const Data_Atual = new Date();
const cancelarForm = window.document.getElementById('Cancelar-formulario-task')
const aceitarForm = window.document.getElementById('Adicionar-formulario-task')
const formularioDADOS = window.document.getElementById('formulario-task')
const voltar = window.document.getElementById('ancora-voltar-lista')
const Titulo_input = window.document.getElementById('titulo-task')
const Desc_input = window.document.getElementById('Descrição-task')
const Data_input = window.document.getElementById('data-task')
const Dias_da_semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", 'Sexta-Feira', 'Sábado'];
const Meses_do_ano = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const Nome_dia = Dias_da_semana[Data_Atual.getDay()];
const Dia_do_mes = Data_Atual.getDate();
const Nome_mes = Meses_do_ano[Data_Atual.getMonth()];


document.addEventListener('DOMContentLoaded', function() {
    const paginaAtual = window.location.pathname;
    if (paginaAtual.includes('ListaDeTarefas.html')) {
        renderizar_tarefas()
    }
})


formularioDADOS.addEventListener('submit', function(event) {
    event.preventDefault();
    criar_nova_tarefa()
    window.location.href = 'ListaDeTarefas.html'
})

cancelarForm.addEventListener('click', () => {
    window.location.href = 'ListaDeTarefas.html'
})



function criar_nova_tarefa() {
    let dia = `${Dia_do_mes}-${(Data_Atual.getMonth())+1}-${Data_Atual.getFullYear()}`

    let tarefa_para_ser_add = {
        titulo: String(Titulo_input.value).toUpperCase(), 
        descricao: String(Desc_input.value),
        data: String(Data_input.value)
    }

    let tarefas_salvas = JSON.parse(localStorage.getItem('Tarefas'))

    if (tarefas_salvas) {
        if (dia in tarefas_salvas) {
            tarefas_salvas[dia].push(tarefa_para_ser_add)
        } else {
            tarefas_salvas[dia] = [tarefa_para_ser_add]
        }
    } else {
        tarefas_salvas = {}
        tarefas_salvas[dia] = [tarefa_para_ser_add]
    }


    localStorage.removeItem('Tarefas')
    localStorage.setItem('Tarefas', JSON.stringify(tarefas_salvas))
    cancelarForm.click()
}

function renderizar_tarefas() {

    const tarefas_salvas = JSON.parse(localStorage.getItem('Tarefas')) || {};
    const section_tarefas = window.document.getElementById('section-tarefas')

    for (const tarefas_dos_dias in tarefas_salvas) {
        if (Object.prototype.hasOwnProperty.call(tarefas_salvas, tarefas_dos_dias)) {
            const objeto_tarefas = tarefas_salvas[tarefas_dos_dias];

            let div_tarefas_list = window.document.createElement('div');
            div_tarefas_list.className = 'tarefas-list';
            section_tarefas.appendChild(div_tarefas_list);

            //pegando nomes de dias e meses
            let [dia, mes, ano] = tarefas_dos_dias.split('-');
            let dataObject = new Date(`${ano}-${mes}-${dia}`);

            //html
            let title_dia = document.createElement('h3');
            title_dia.className = 'dias-tarefa';
            title_dia.textContent = `${Dias_da_semana[dataObject.getDay()]}, ${dia} ${Meses_do_ano[mes-1]}`
            div_tarefas_list.appendChild(title_dia)
            //html

            for (const key in objeto_tarefas) {
                if (Object.prototype.hasOwnProperty.call(objeto_tarefas, key)) {

                    const valores_por_objeto = objeto_tarefas[key];

                    let title = valores_por_objeto.titulo;
                    let desc = valores_por_objeto.descricao;
                    let date = valores_por_objeto.data;

                    let div_class_tarefas = window.document.createElement('div');
                    div_class_tarefas.className = 'tarefas';

                    //html

                    div_class_tarefas.innerHTML = `
                    <h1>${title}</h1>
                    <p>${desc}</p> 
                    <h2>Data Limite: ${date}</h2>`  

                    //html

                    div_tarefas_list.appendChild(div_class_tarefas)   
                }
            }
        }
    }
}