let GetInpuElement = document.querySelector("#password"),
  eyes = document.querySelector("#eyes");
verification = true;
(userInter = document.querySelector(".confirm")),
  (errorLog = document.querySelector("#errorLog"));

function showPassWord() {
  if (verification == true) {
    GetInpuElement.setAttribute("type", "text");
    document.querySelector("#eyes").style.backgroundImage =
      "url('../../IMG/hidden.png')";
    verification = false;
  } else {
    verification = true;
    GetInpuElement.setAttribute("type", "password");
    document.querySelector("#eyes").style.backgroundImage =
      "url('../../IMG/visiblite.png')";
  }
}

function validarFormulario() {
  // Resetando mensagem de erro
  document.getElementById("email").innerHTML = "";
  document.getElementById("password").innerHTML = "";

  // Pegando os valores dos inputs
  let input1Value = document.getElementById("email").value.trim();
  let input2Value = document.getElementById("password").value.trim();

  // Validando o Input1 e se foi digitado @gmail.com
  if (
    input1Value === "" ||
    !input1Value.includes("@") ||
    !input1Value.includes(".com")
  ) {
    document.getElementById("email").style.border = "1px solid red";
    document.getElementById("btn").style.cursor = "no-drop";
    return;
  } else {
    document.getElementById("email").style.border = "1px solid green";
    document.getElementById("btn").style.cursor = "pointer";
  }
  // Validando Input 2
  if (input2Value.trim() === "" || input1Value < 6) {
    document.getElementById("password").style.border = "1px solid red";
    let button = (document.getElementById("btn").style.cursor = "no-drop");
    return;
  }
}

let button = document
  .getElementById("btn")
  .addEventListener("click", validarFormulario);

// Este é quando os inputs forem bem preenchidos
let myForm = document
  .querySelector("#myForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelector("#specialSpan").style.display = "none";
    let carregando = (document.querySelector(".carregando").style.display =
      "block");

    let input2Value = (document.getElementById("password").style.border =
      "1px solid green");

    setTimeout(function timeoutFunction() {
      document.querySelector("#specialSpan").style.display = "block";
      document.querySelector(".carregando").style.display = "none";

      function verificarLoginNoLocalStorage(event) {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Obter usuários do localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Verificar se existe um usuário com o mesmo email e senha
        let usuarioExistente = users.find(
          (user) => user.email === email && user.password === password
        );

        if (usuarioExistente) {
          // Armazenar dados do usuário atual na sessionStorage para uso posterior
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify(usuarioExistente)
          );
          window.location = "../LOGADO/index.html";

          localStorage.removeItem("userLog");

          let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        } else {
          errorLog.style.display = "block";
          document.querySelector(".cadastre").style.marginTop = "-3rem";
          document.querySelector(".otherWay").style.display = "none";
          document.getElementById("email").style.border =
            "1px solid  rgb(238, 230, 230)";
          document.getElementById("password").style.border =
            "1px solid  rgb(238, 230, 230)";
        }
        event.preventDefault();
      }
      verificarLoginNoLocalStorage();
      document.querySelector("#myForm").submit();
    }, 2000);
  });
