$(document).ready(()=>{
    validToken()
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
                if(!result.success)
                    {
                        window.location.replace("http://localhost:8081/login")
                    }
            },
            error: function (data) { console.log(data) } 
        })
    }
    else
    {
        window.location.replace("http://localhost:8081/login")
    }    
}