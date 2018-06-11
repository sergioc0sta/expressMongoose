$(document).ready(()=>{
    validToken()
    
})


$('#login').on('submit', (e)=>{
    if (e.isDefaultPrevented()) 
    {
        console.log("form with errors") 
    }
    else {
        event.preventDefault();
        var data = {};
        data.email = $('#email').val();
        data.password = $('#password').val();
         $('#login')[0].reset();
        $.ajax({
            type: 'POST',
            url: 'api/Authenticate',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (result) {
                if(result.success)
                {
                    
                    localStorage.setItem('user', JSON.stringify(result))
                    window.location.replace("http://localhost:8081/index"); 
                }
                else{
                    window.location.replace("http://localhost:8081/login");
                }
            },
            error: function (data) { console.log(data) } 
        });
    
    }
})

function validToken(){
    if(localStorage.getItem("user"))
    {
        $.ajax({
            type: 'GET',
            url: 'api/check',
            headers: {
                'authorization': String(JSON.parse( localStorage.getItem("user") ).token)
            },
            contentType: 'application/json',
            success: function (result) {

                console.log(result)
                if(result.success)
                    {
                        window.location.replace("http://localhost:8081/index"); 
                    }
            },
            error: function (data) { console.log(data) } 
        })
    }    
}