const Data_Atual = new Date();
const cancelarForm = window.document.getElementById('Cancelar-formulario-task')
const aceitarForm = window.document.getElementById('Adicionar-formulario-task')
const formularioDADOS = window.document.getElementById('formulario-task')
const voltar = window.document.getElementById('ancora-voltar-lista')
const Titulo_input = window.document.getElementById('titulo-task')
const Desc_input = window.document.getElementById('Descrição-task')
const Data_input = window.document.getElementById('data-task')
const Dias_da_semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", 'Sexta', 'Sábado'];
const Meses_do_ano = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const Nome_dia = Dias_da_semana[Data_Atual.getDay()];
const Dia_do_mes = Data_Atual.getDate();
const Nome_mes = Meses_do_ano[Data_Atual.getMonth()];

const lixeira = window.document.getElementsByClassName('fa-regular fa-trash-can')

Array.from(lixeira).forEach(element => {
    element.addEventListener('click', function (eventu) {
        if (eventu.target.tagName == 'I') {
            let div_com_as_informações_da_lixeira_clicada = eventu.target.closest('.tarefas');
    
            date_ID = div_com_as_informações_da_lixeira_clicada.dataset.identificadorID
            date_Data = div_com_as_informações_da_lixeira_clicada.dataset.identificadorDATA
            console.log(date_ID, date_Data)
    
            let tarefas_salvas = JSON.parse(localStorage.getItem('Tarefas') || {})
    
            for (const tarefa in tarefas_salvas[date_Data]) {
                if (Object.prototype.hasOwnProperty.call(tarefas_salvas[date_Data], tarefa)) {
                    const element = tarefas_salvas[date_Data][tarefa];
    
                    if (element.id == date_ID) {
                        tarefas_salvas[date_Data].splice(tarefa, 1)
                        localStorage.clear()
                        localStorage.setItem('Tarefas', JSON.stringify(tarefas_salvas))
                        div_com_as_informações_da_lixeira_clicada.remove();
                    }
                    
                }
            }
    
            }
            
        }
    )
});

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
    let dia = String(Data_input.value)
    dia = (dia.split('-')).reverse()
    dia = dia.join('-')
    

    let tarefa_para_ser_add = {
        titulo: String(Titulo_input.value)
    }

    let tarefas_salvas = JSON.parse(localStorage.getItem('Tarefas')) || {};

    if (tarefas_salvas) {
        if (dia in tarefas_salvas) {
            tarefa_para_ser_add.id = tarefas_salvas[dia].length + 1
            tarefas_salvas[dia].push(tarefa_para_ser_add)
        } else {
            tarefa_para_ser_add.id = 1
            tarefas_salvas[dia] = [tarefa_para_ser_add]
        }
    } else {
        tarefas_salvas = {}
        tarefa_para_ser_add.id = 1
        tarefas_salvas[dia] = [tarefa_para_ser_add]
    }


    localStorage.setItem('Tarefas', JSON.stringify(tarefas_salvas))
}


function renderizar_tarefas() {

    const tarefas_salvas = JSON.parse(localStorage.getItem('Tarefas')) || {};
    const section_tarefas = window.document.getElementById('section-tarefas')

    //acessando as tarefas salvas, de um determinado dia

    for (const tarefas_dos_dias in tarefas_salvas) {
        if (Object.prototype.hasOwnProperty.call(tarefas_salvas, tarefas_dos_dias)) {
            const objeto_tarefas = tarefas_salvas[tarefas_dos_dias];

            let div_tarefas_list = window.document.createElement('div');
            div_tarefas_list.className = 'tarefas-list';
            section_tarefas.appendChild(div_tarefas_list);

            //pegando nomes de dias e meses
            let dataObject = tarefas_dos_dias.split('-')

            //html
            let title_dia = document.createElement('h3');
            title_dia.className = 'dias-tarefa';
            title_dia.textContent = `${Dias_da_semana[Data_Atual.getDay(dataObject[0])]}, ${dataObject[0]} de ${Meses_do_ano[dataObject[1] - 1]}`
            div_tarefas_list.appendChild(title_dia)
            //html

            // acessando os elementos das tarefas salvas

            for (const key in objeto_tarefas) {
                if (Object.prototype.hasOwnProperty.call(objeto_tarefas, key)) {

                    const valores_por_objeto = objeto_tarefas[key];


                    let div_class_tarefas = window.document.createElement('div');
                    div_class_tarefas.className = 'tarefas';
                    div_class_tarefas.dataset.identificadorID = valores_por_objeto.id
                    div_class_tarefas.dataset.identificadorDATA = tarefas_dos_dias

                    //html

                    div_class_tarefas.innerHTML = `
                    <h1>${valores_por_objeto.titulo}</h1>
                    <div>
                        <i class="fa-regular fa-pen-to-square"></i> 
                        <i class="fa-regular fa-trash-can"></i>
                    </div>`  

                    //html

                    div_tarefas_list.appendChild(div_class_tarefas)   
                }
            }
        }
    }


}