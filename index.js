
//procure por todos os elementos com atributo name=gender e para filtrar mais uma vez
//um pseudo filtro :checked
//var gender = document.querySelectorAll("#form-user-create [name=gender]:checked");


// fields vai receber todos os elementos do formulario pelo nome
var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};


// criar um foreach para ler e tratar todos so campos do formulario

// tambem pode ser escrito como arrayfunction
//fields.forEach((field, index)=>{});

fields.forEach(function(field, index){

    if(field.name == "gender"){
       
        if(field.checked === true ){
            user[field.name] = field.value;
        }

    }else{
        user[field.name] = field.value;
    }


});

console.log(user);

