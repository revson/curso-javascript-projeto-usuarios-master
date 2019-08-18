var name = document.querySelector("#exampleInputName");
//procure por todos os elementos com atributo name=gender e para filtrar mais uma vez
//um pseudo filtro :checked
var gender = document.querySelectorAll("#form-user-create [name=gender]:checked");
var birth = document.querySelector("#exampleInputBirth");
var country = document.querySelector("#exampleInputCountry");
var email = document.querySelector("#exampleInputEmail");
var password = document.querySelector("#exampleInputPassword");
var photo = document.querySelector("#exampleInputFile");
var admin = document.querySelector("#exampleInputAdmin");

// fields vai receber todos os elementos do formulario pelo nome
var fields = document.querySelectorAll("#form-user-create [name]");

// criar um foreach para ler e tratar todos so campos do formulario

// tambem pode ser escrito como arrayfunction
//fields.forEach((field, index)=>{});

fields.forEach(function(field, index){

    console.log(field.name);

});

