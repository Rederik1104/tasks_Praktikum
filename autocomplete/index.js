function getInput(){
    let productData = JSON.parse(localStorage.getItem("products"));
    let htmlContent = "";
    let input = document.querySelector('#autocomplete').value;
    for(let i = 0; i < productData.products.length; i++){
        if(productData.products[i].title.includes(input)){
            htmlContent += '<div onclick=clickA('+productData.products[i].id+')><p>' + productData.products[i].title + '</p></div>';
        }
    }
    //document.querySelector(".autoC").innerHTML = htmlContent;
    $(".autoC").html(htmlContent);
}
 document.addEventListener('DOMContentLoaded', async function(){
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    localStorage.setItem("products", JSON.stringify(data));
    }
)
function clickA(input){
    let name = JSON.parse(localStorage.getItem("products")).products[input-1].title;
    document.querySelector("#autocomplete").value = name;
    submit(name)
}

function submit(anfrage){
    $(".logs").append('<p>'+anfrage+'</p>');
}

