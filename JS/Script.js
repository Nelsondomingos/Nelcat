let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
let bodyElement = document.querySelector('body');
let toastifyElement = document.querySelector('.toast');
let toast = document.querySelector('#toast');

let close = document.querySelector('.close').addEventListener('click', function(){
    toastifyElement.style.display ="none";
});

document.querySelector('#closeElementTwo').addEventListener('click', function (){
    toast.style.display ="none";
    $darkModeOverlay.style.display ="none";
    $loadin.style.display ="none";
    $GetbodyElement.style.overflow = "visible";
});

if (currentUser) {
    user = document.querySelector('#user').innerText = currentUser.name[0];

    if(!localStorage.getItem('justOnce')){
        toastifyElement.style.display ="block";

        localStorage.setItem('justOnce', 'true');
    } else {
        toastifyElement.style.display ="none";
    }

    setTimeout(function() {
        toastifyElement.style.display ="none";
    },5000);
} else {
    window.location = "../NÃO_LOGADO/Login.html";
    let toastDisplayed = false;
}   
logOut = () =>{
    localStorage.removeItem('justOnce');
    sessionStorage.removeItem('currentUser');
} 

let $loadin = document.querySelector('.carregando');
let $getOpenElement = document.querySelector('.hidden');
let $getCheckBoxElement = document.querySelector('#botao'); 
let $userImg = document.querySelector('.user').addEventListener('click',userInformation);
let $toSchedule = document.querySelector('.toSchedule').addEventListener('click',toggleEments);
let $darkModeOverlay = document.querySelector('.darkModeOverlay');
let $cadastroElement = document.querySelector('.cadastro');
let $closeElement = document.querySelector('.closeElement').addEventListener('click',closeCard);

function closeCard(){
    $cadastroElement.style.display ="none";  
    $darkModeOverlay.style.display ="none";
    $GetbodyElement.style.overflow = "visible";
};

let $GetbodyElement = document.querySelector('body');
let $closeX = document.querySelector('#fechar');
let $userImgCheckBox = document.querySelector('#userImg');
let $close = document.querySelector('.close');

function userInformation () {
    let informationAboutPerfile = document.querySelector('.informationAboutPerfile');
    if($userImgCheckBox.checked){
        informationAboutPerfile.style.display = "block";
    } else {
        informationAboutPerfile.style.display = "none";
        informationAboutPerfile.style.display = "none";
    }
}

function toggleEments (){
    if($getCheckBoxElement.checked){
        $getCheckBoxElement.style.display = "none";
    }

    if ($getCheckBoxElement.checked) {
        $cadastroElement.style.display = "block";
        $darkModeOverlay.style.display = "block";
        $GetbodyElement.style.overflow = "hidden";
        $closeX.style.visibility = "visible";
    } else {
        $darkModeOverlay.style.display = "none";
        $cadastroElement.style.display = "none";
        $GetbodyElement.style.overflow = "visible";
    }
}
$getCheckBoxElement.addEventListener('click',toggleEments);

function validarFormulario (){
    document.querySelector('form').addEventListener('submit', function (event){
        event.preventDefault();

        let isNameValid = true;
        let isEmailValid = true;
        let isDateValid = true;
        let isTypeValid = true;
        let especialSpan = document.getElementById("especialSpan");
        let especialSpanEmail = document.querySelector('#especialSpanEmail');
        let especialSpanDate = document.querySelector('#especialSpanDate');
        let especialSpanType = document.querySelector('#especialSpanType');
        let name = document.getElementById('name');
        let email = document.getElementById('email');
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let date = document.getElementById('date');
        let type = document.querySelector('#consult');

        if (!type.value.trim()) {
            especialSpanType.innerHTML = "O tipo da consulta é obrigatório";
            type.style.border = "1px solid red";
            isNameValid = false;
            isTypeValid = false;
        } else {
            especialSpanType.style.display = "none";
            type.style.border = "1px solid green";
            isTypeValid = true;
        }

        if (!email.value.trim()) {
            isEmailValid  = false;
            email.style.border = "1px solid red";
            especialSpanEmail.innerHTML ="O email não pode estar vazio";
        } 
        else if (!emailPattern.test(email.value)) { 
            especialSpanEmail.innerHTML ="Formato de email inválido";
            email.style.border = "1px solid red";
            isEmailValid = false;
        } 

        if (isEmailValid) {
            email.style.border = "1px solid green";
            especialSpanEmail.style.display ="none";
        }

        if (!name.value.trim()) {
            especialSpan.innerHTML = "O nome não pode estar vazio";
            name.style.border = "1px solid red";
            isNameValid = false;
            // buttonElement.setAttribute('disabled');
        }
        else if (!/^[a-zA-Z\s]+$/.test(name.value)) {
            especialSpan.innerHTML = "O nome deve conter apenas letras e espaços.";
            name.style.border = "1px solid red";
            isNameValid = false;
            // buttonElement.setAttribute('disabled');
        } else if (!/^[A-Z]/.test(name.value)) {
            especialSpan.innerHTML = "O nome deve começar com uma letra maiúscula";
            especialSpan.style.marginLeft ="-67px";
            name.style.border = "1px solid red";
            isNameValid = false;
            // buttonElement.setAttribute('disabled');
        } else {
            name.style.border = "1px solid green";
            especialSpan.style.display ="none";
        }
        if (isNameValid) {
            name.style.border = "1px solid green";
            especialSpan.style.display ="none";
        }

        if(date.value.trim() == ''){
            date.style.border ="1px solid red";
            isDateValid = false;
            especialSpanDate.innerHTML = " A data não pode estar vazia";
        } else {
            date.style.border ="1px solid green";
            especialSpanDate.style.display ="none";
        }

        if (isNameValid && isEmailValid && isDateValid && isTypeValid) {
            $cadastroElement.style.display ="none";
            $darkModeOverlay.style.display ="block"
            $loadin.style.display ="block";

            setTimeout( function (){
                let consultDados = JSON.parse(localStorage.getItem('agendada')) || [];

                let userDados = {
                    name:name.value,
                    email:email.value,
                    type:type.value,
                    date:date.value,
                }      
                
                let existentConsult = consultDados.find(user => user.email === userDados.email || consultDados == '');
                if(!existentConsult){
                    consultDados.push(userDados);

                    localStorage.setItem('agendada', JSON.stringify(consultDados));
                    window.location ="./consultAgend.html";
                } else {
                    setTimeout (function (){
                        toast.style.display ="none";
                        $darkModeOverlay.style.display ="none";
                        $loadin.style.display ="none";
                        $GetbodyElement.style.overflow = "visible";
                    },5000);
                    document.querySelector('.text').innerText ="Já tens uma consulta marcada";
                    toast.style.display ="block";
                }
            },3000);
        }        
    });
}