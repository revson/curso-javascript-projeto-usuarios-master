
//procure por todos os elementos com atributo name=gender e para filtrar mais uma vez
//um pseudo filtro :checked
//var gender = document.querySelectorAll("#form-user-create [name=gender]:checked");


// fields vai receber todos os elementos do formulario pelo nome
// var fields = document.querySelectorAll("#form-user-create [name]");
// tambem pode ser escrito como arrow function
// fields.forEach((field, index)=>{});


let userController =  new UserController("form-user-create", "table-users");