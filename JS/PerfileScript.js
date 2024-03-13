// Verifica se há um item 'currentUser' no sessionStorage e se 'currentUser' é válido
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

let users = JSON.parse(localStorage.getItem("users")) || [];

function saveMainInformation(currentUser) {
  let indexCurrentUser = users.findIndex(
    (user) => user.email == currentUser.email
  );
  if (indexCurrentUser !== undefined) {
    users[indexCurrentUser] = currentUser;

    localStorage.setItem("users", JSON.stringify(users));
    console.log(users[indexCurrentUser]);
  }
}

const nameElement = document.querySelector("#nameLabel");
const emailLabel = document.querySelector("#emailLabel");
const checkMark = document.querySelector(".checkMark");
const subName = document.querySelector("#subName");
const phoneUser = document.querySelector("#phoneLabel");
const genero = document.querySelector("#generoUser");
const date = document.querySelector("#date");
const buttonElement = document.querySelector("#buttonElement");

buttonElement.addEventListener("click", function () {
  if (nameElement.value) {
    currentUser.name = nameElement.value;
  }
  saveDadosElement();
  saveMainInformation(currentUser);
});

function saveDadosElement() {
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
}
// Define o estilo backgroundColor aqui
if (currentUser && currentUser.name) {
  let getName = currentUser.name.split(" ");

  if (emailLabel.checkValidity()) {
    emailLabel.style.border = "1px solid green";
  } else {
    emailLabel.style.border = "1px solid red";
  }

  // Adicione valores aos elementos
  nameElement.value = getName[0] || "";
  subName.value = getName[1] || subName.value;
  emailLabel.value = currentUser.email || "";

  if (
    subName.value == "" ||
    subName.value == undefined ||
    subName.value == null
  ) {
    subName.style.border = "1px solid red";
  } else {
    subName.style.border = "1px solid green";
  }

  let isNameValid = true;

  // Verifica o elemento de nome
  if (
    !nameElement.value.trim() ||
    !/^[a-zA-Z\s]+$/.test(nameElement.value) ||
    !/^[A-Z]/.test(nameElement.value)
  ) {
    nameElement.style.border = "1px solid red";
    isNameValid = false;
    checkMark.style.display = "none";
  } else {
    nameElement.style.border = "1px solid green";
    checkMark.style.display = "block";
  }
}
