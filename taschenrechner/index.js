function zahlen(zahl){
    $("#rechnung").append(zahl);

}
function del(){
    //$("#rechnung").text($("#rechnung").substring(0,$("#rechnung").length-1));
    var text = $("#rechnung").text();
    text = text.substring(0, text.length - 1);
    $("#rechnung").text(text);
    

}
function submit(){
    let rechnung = 0;
    let text = $("#rechnung").text();
    let result = eval(text);

    result = parseFloat(result);

    let round = $("#round").val();
    result = result.toFixed(round);

    $("#rechnung").append("=", result);

}
function ac(){
    document.getElementById("rechnung").innerText = "";
}
function valueR(){
    $("#lRound").text($("#round").val() + " (Nachkommastellen runden)"); 
}