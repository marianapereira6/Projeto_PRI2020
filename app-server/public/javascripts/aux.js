function incrementaStar(ident){
  axios.post('http://localhost:8003/addStar/'+ ident)
    .then(response => window.location.reload())
    .catch(error => console.log(error))
}

function deletepost(ident){
  axios.post('http://localhost:8003/deletepost/'+ ident)
    .then(response => window.location.reload())
    .catch(error => console.log(error))
}

function deleteperfil(ident){
  axios.post('http://localhost:8003/deleteperfil/'+ ident)
    .then(response => window.location.reload())
    .catch(error => console.log(error))
}

function deleteComentFeed(ident,i){
  axios.post('http://localhost:8003/deleteComentFeed/'+ ident + '/'+ i )
    .then(response => window.location.reload())
    .catch(error => console.log(error))
}

function deleteComent(ident,i){
  axios.post('http://localhost:8003/deleteComent/'+ ident + '/'+ i )
    .then(response => window.location.reload())
    .catch(error => console.log(error))
}



function addstarComent(ident,i){
  axios.post('http://localhost:8003/addstarComent/'+ ident + '/'+ i )
    .then(response => window.location.reload())
    .catch(error => console.log(error))
}


var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
} 


function addImage() {
  const div = document.createElement('div');
  div.className = 'row';
  
  div.innerHTML = `
  
  <input  type="file" name="myFile">

  `;

  document.getElementById('adiciona').appendChild(div);
}


formatDate(date)

addstarComent(ident,i)
deleteComentP(ident,i)
incrementaStar(ident);
deletepost(ident);

