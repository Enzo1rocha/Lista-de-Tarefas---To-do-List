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

                    const h1Tittle = document.createElement('h1')
                    h1Tittle.textContent = valores_por_objeto.titulo

                    let div_pai_lixeiras_filha_div_class = document.createElement('div')
                    let editar = document.createElement('i');
                    editar.className = 'fa-regular fa-pen-to-square'

                    editar.addEventListener('click', function() {
                        const div_editar = (editar.parentNode).parentNode
                        console.log(div_editar);
                        
                        let titulo_da_tarefa_alteração = div_editar.querySelector('h1');
                        let div_i_alterar = document.createElement('form')
                        div_i_alterar.className = 'div_i_alterar'

                        let input_altera = document.createElement('input')
                        input_altera.type = 'text'
                        input_altera.style.border = 'none'
                        input_altera.placeholder = 'Alterar Titulo'
                        input_altera.className = 'alterar_titulo'
                        input_altera.required = true;

                        let button_i = document.createElement('button')
                        button_i.className = 'button_i'
                        button_i.type = 'button'

                        input_altera.addEventListener('keydown', (event) => {
                            if (event.key == 'Enter') {
                                confirm_I.click()
                            }
                        })

                        let i_check = document.createElement('i')
                        i_check.className = 'fa-regular fa-square-check'

                        titulo_da_tarefa_alteração.innerHTML = ''
                        button_i.appendChild(i_check)

                        div_i_alterar.appendChild(input_altera)
                        div_i_alterar.appendChild(button_i)
                        titulo_da_tarefa_alteração.appendChild(div_i_alterar)

                        
                        let confirm_I = titulo_da_tarefa_alteração.querySelector("button")
                        confirm_I.addEventListener('click', () => {
                            let new_titulo = titulo_da_tarefa_alteração.querySelector('input')
                            for (let i = 0; i < tarefas_salvas[div_editar.dataset.identificadorDATA].length; i++) {
                                const element = tarefas_salvas[div_editar.dataset.identificadorDATA][i];
                                if (element.id == div_editar.dataset.identificadorID) {
                                    tarefas_salvas[div_editar.dataset.identificadorDATA][i].titulo = String(new_titulo.value)
                                    localStorage.setItem('Tarefas', JSON.stringify(tarefas_salvas))
                                    window.location.reload()
                                }
                            }                            
                        })
                    })

                    let lixeira = document.createElement('i');
                    lixeira.className = 'fa-regular fa-trash-can'

                    lixeira.addEventListener('click', function() {
                        let div = (lixeira.parentNode).parentNode;
                        let index = tarefas_salvas[div.dataset.identificadorDATA].findIndex((tarefa) => tarefa.id == div.dataset.identificadorID)
                        tarefas_salvas[div.dataset.identificadorDATA].splice(index,1);
                        if (tarefas_salvas[div.dataset.identificadorDATA].length == 0) {
                            delete tarefas_salvas[div.dataset.identificadorDATA];
                            div.parentNode.remove()
                        } else {
                            div.remove()
                        }
                        localStorage.setItem('Tarefas', JSON.stringify(tarefas_salvas))
                    })

                    div_pai_lixeiras_filha_div_class.appendChild(editar)
                    div_pai_lixeiras_filha_div_class.appendChild(lixeira)

                    div_class_tarefas.appendChild(h1Tittle)
                    div_class_tarefas.appendChild(div_pai_lixeiras_filha_div_class)

                    //html

                    div_tarefas_list.appendChild(div_class_tarefas)   
                }
            }
        }
    }


}

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


document.addEventListener('DOMContentLoaded', function() {
    const paginaAtual = window.location.pathname;
    if (paginaAtual.includes('ListaDeTarefas.html')) {
        renderizar_tarefas()
    }
})

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('AdicionarTarefa.html')) {
        formularioDADOS.addEventListener('submit', function(event) {
            event.preventDefault();
            criar_nova_tarefa()
            window.location.href = 'ListaDeTarefas.html'
        })
        
        cancelarForm.addEventListener('click', () => {
            window.location.href = 'ListaDeTarefas.html'
        })    
    }
})