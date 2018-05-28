$(document).ready(()=>{
    $("#formNewUser").hide();
    refreshUsers()
})


$('#formNewUser').validator().on('submit', (e)=>{
    if (e.isDefaultPrevented()) 
    {
        console.log("form with errors") 
    }
    else {
        event.preventDefault();
        var data = {};
        data.firstName = $('#primeiroNome').val();
        data.secondName = $('#segundoNome').val();

         $('#formNewUser')[0].reset();
        $.ajax({
            type: 'POST',
            url: 'api/post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (result) {
                refreshUsers();
            },
            error: function (data) { console.log(data) } 
        });
    
    }
})

function refreshUsers() {
    $.ajax({
        type: 'GET',
        url: 'api/posts',
        success: function (data) {
            var txt = "";
            txt += "<table class='table' style='padding:10px; width:70%; margin:0% 15% 0% 15%'>"; 
            txt += "<thead style='background-color:#607d8b; color:white '>";
            txt += "<tr><th style='text-align:right'>Primeiro Nome</th><th style='text-align:right'>Segundo Nome</th></tr></thead><tbody>"; 
            data.forEach(function (row) {
                txt += "<tr><td style='text-align:right'>" + row.firstName + "</td><td style='text-align:right'>" + row.secondName + "</td></tr>";
            });
            txt += "</tbody></table>";
        $("#result").html(txt);
        }
        });
}


    