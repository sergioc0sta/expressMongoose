$(document).ready(()=>{
    refreshUsers()
})

$('#formNewUser').validator().on('submit', (e)=>{
    if (e.isDefaultPrevented()) 
    {
        alert("form with errors") // handle the invalid form... }
    }
    else {
        event.preventDefault();
        //carregamento dos dados do form para variávels JS
        //como a chamada é feita do lado do cliente o carregamento é com jQuery
        var data = {};
        data.firstName = $('#primeiroNome').val();
        data.secondName = $('#segundoNome').val();

        //debugging para ver os dados que foram enviados
        console.log(data);
        //limpeza dos dados do form
        $('#formNewUser')[0].reset();
        //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON 
        $.ajax({
            type: 'POST',
            url: 'api/post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (result) {
                //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
                if (result.status == 200) 
                {
                     alert("submitted with success");
                }
                //faz refresh da tabela users através da função respetiva
                refreshUsers();
            },
            error: function (data) { console.log(data) } 
        });
    
    }
})

function refreshUsers() { //chamada ajax
    $.ajax({
        type: 'GET',
        url: 'api/posts',
        //os dados recebidos do model estão na variável data 
        success: function (data) {
         //debugging para ver se foi pedido com sucesso
         console.log(data);
         //criação de uma tabela para demonstração dos resultados recebidos
         var txt = "";
         txt += "<table class='table' style='padding:10px; width:70%; margin:0% 15% 0% 15%'>"; 
         txt += "<thead style='background-color:#607d8b; color:white '>";
         txt += "<tr><th style='text-align:right'>Primeiro Nome</th><th style='text-align:right'>Segundo Nome</th></tr></thead><tbody>"; 
         //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes 
         data.forEach(function (row) {
             txt += "<tr><td style='text-align:right'>" + row.firstName + "</td><td style='text-align:right'>" + row.secondName + "</td></tr>";
         });
         txt += "</tbody></table>";
        //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result 
        $("#result").html(txt);
        }
        });
}


    