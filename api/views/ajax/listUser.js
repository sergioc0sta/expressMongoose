
$(document).ready(function(){
var response = '';
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


});
