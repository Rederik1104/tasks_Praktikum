function setCookie(cname, exdays){
    const date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    let exp = "expires=" + date.toUTCString();
    var fName = document.querySelector("#first_name").value;
    var lName = document.querySelector("#last_name").value;
    var name = fName.concat(" ", lName);
    document.cookie = cname + "=" + encodeURIComponent(name) + ";" + exp + ";path=/;SameSite=None;Secure";
} 

function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";")

    console.log(ca);

}