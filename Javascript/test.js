let tarefas = {
    "24/12/2024": [{titulo:'estudar', descricao:'estudar para isso', data:'24/12/2024'}, {titulo: 'dormir', descricao:'dormir as 21:30', data:'22/12/2024'}],

    "22/12/2024": [{titulo:'programar', descricao:'criar to do list', data:'26/12/2024'}]
}


for (const date in tarefas) {
    if (Object.prototype.hasOwnProperty.call(tarefas, date)) {
        const element = tarefas[date]
        console.log(date);

        let div_tarefas_list = window.document.createElement('div')
        
        div_tarefas_list.innerHTML = '<h3 class="dias-tarefa"></h3>'
        
        for (const key in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) {
                const valores = element[key];
                let title = valores.titulo
                let desc = valores.descricao
                let date = valores.data
                console.log(`${title}, ${desc}, ${date}`)
                
                
            }
        }

        }
    }