
$(document).ready(function(){
    $("#updateValues").hide();
    getList()
    
})

function updateRow(isimd){
    console.log(isimd)
    $.ajax({
     url: "api/find/"+isimd.toString(),
     type: 'GET',
     
     success: function(response){
    
        $("#updateValues").toggle()
        $('#firstName').val(response.firstName)
        $('#secondName').val(response.firstName)
        $('#id').val(response._id)
         
     },
     error: function (data) { alert('Não foi possivel carregar a tabela!') } 
    });
   }


$('#updateValues').validator().on('submit', (e)=>{
    if (e.isDefaultPrevented()) 
    {
        console.log("form with errors") 
            
    }
    else 
    {
            
        event.preventDefault();
        var data = {};
        data.firstName = $('#firstName').val();
        data.secondName = $('#secondName').val();
        var id = $('#id').val() || ""
        if(id === "")
        {
            alert("Selecionar um registo!")
        }
        else
        {
            if(data.firstName !== "" )
            {
                $.ajax({
                type: 'PUT',
                url: "api/post/"+id,
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (result) {
                    $('#updateValues')[0].reset();
                    $("#updateValues").toggle()
                    getList();
                },
                error: function (data) { console.log(data) } 
                });
            }
        }
    }
})


function deleteRow(isimd){
    $.ajax({
     url: 'api/delete',
     type: 'DELETE',
     data: { "id":isimd.toString()},
     success: function(response){
        $('#updateValues')[0].reset();
        getList()
     },
     error: function (data) { alert('Não foi possivel carregar a tabela!') } 
    });
   }


function getList(){
var response = '';
$.ajax({
type: 'GET',
url: 'api/posts',
success: function (data) {
    var txt = "";
    txt += "<table id = 'myTabela' class='table' style='padding:10px; width:70%; margin:0% 15% 0% 15%'>";
    txt += "<thead style='background-color:#607d8b; color:white '>";
    txt += "<tr><th style='text-align:right'>Primeiro Nome</th><th style='text-align:right'>Segundo Nome</th><th style='text-align:right'>Atualizar</th><th style='text-align:right'>Remover</th></tr></thead><tbody>"; 
 data.forEach(function (row) {
     txt += "<tr><td style='text-align:right'>" + row.firstName + "</td><td style='text-align:right'>" + row.secondName + "</td><td style='text-align:right'><a type='button' onclick=updateRow('"+row._id+"')>Atualizar</a></td><td style='text-align:right'><a type='button' onclick=deleteRow('"+row._id+"')"+">Remover</a></td></tr>";
 });
 txt += "</tbody></table>";

$("#result").html(txt);
}
});
}