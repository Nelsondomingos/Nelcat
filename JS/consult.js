let informationConsult = JSON.parse (localStorage.getItem('agendada'));
let toast = document.querySelector('.toast');

if(informationConsult == '' || informationConsult == null || informationConsult == undefined){
    toast.style.display ="block";
    
    setTimeout (function close (){
        window.location ="index.html";
    }, 5000);
} else {
    toast.style.display ="none";
    let name = document.querySelector('#name').innerHTML = informationConsult[0].name;
    email = document.querySelector('#email').innerHTML = informationConsult[0].email;
    typeConsult = document.querySelector('#consulta').innerHTML = informationConsult[0].type;
    date = document.querySelector('#date').innerHTML = informationConsult[0].date;
    loadin = document.querySelector('.carregando');
    btn = document.querySelector('.btn');
    container = document.querySelector('.container');
    closeElement = document.querySelector('#close').addEventListener('click', function (){
        window.location ="index.html";
    });

    btn.addEventListener('click', function (){
        var promptMessage = prompt('Deseja cancelar a consulta ?');

        if(promptMessage == 'Sim' || promptMessage == 'sim'){
            container.style.display ="none";
            loadin.style.display ="block";

            setTimeout (function (){
                window.location ="index.html"
                informationConsult = localStorage.removeItem('agendada');
            }, 500);
        } 
        else if (promptMessage == 'Não' || promptMessage == 'não'){
                alert('não');
            } 
            else{
            alert('Tens que digita ou Não ou Sim');
        }
    });

    container.style.display ="block"
    date.style.display ="none";
}