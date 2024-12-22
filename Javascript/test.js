let tarefas = {
        "24/12/2024": [{titulo:'estudar', descricao:'estudar para isso', data:'24/12/2024'}, {titulo: 'dormir', descricao:'dormir as 21:30', data:'22/12/2024'}],

        "22/12/2024": [{titulo:'programar', descricao:'criar to do list', data:'26/12/2024'}]
}

Object.keys(tarefas).forEach(chave => {
    console.log(tarefas[chave][0].titulo)
    console.log(tarefas[chave][0].descricao)
    console.log(tarefas[chave][0].data)
});