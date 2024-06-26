$(document).ready(function(){
    const email_validate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    $("#submit").click(function(){
        let email = $("#email").value;
        if(email_validate.exec(email)){
            return true;
        }else{
            $("#email").css("background-color","red");
        }
    })
})