function emailCheck(){
    const email_validate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let email = document.querySelector('#emailField').value

    if(email_validate.exec(email)){
        return true;
    }
    else{
        
        console.log("Ihre Email Adresse entspricht keinem gültigem format!");
        let faerbung = document.querySelector('#email_field')
        console.log(faerbung.classList)
        faerbung.classList.add('errorRed');
        console.log(faerbung.classList)
        // return false;
    }

}
