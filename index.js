
//procure por todos os elementos com atributo name=gender e para filtrar mais uma vez
//um pseudo filtro :checked
//var gender = document.querySelectorAll("#form-user-create [name=gender]:checked");


// fields vai receber todos os elementos do formulario pelo nome
var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

function addLine(dataUser){
    
    var tr = document.createElement("tr");

    // usando a crase para fazer um template string
    tr.innerHTML = `<tr>
                    <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${dataUser.admin}</td>
                    <td>${dataUser.birth}</td>
                    <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                </tr>`;
    document.getElementById("table-users").appendChild(tr);

    
}


// criar um foreach para ler e tratar todos so campos do formulario

// tambem pode ser escrito como arrayfunction
//fields.forEach((field, index)=>{});




// pegamos o evento submit do formulario
document.getElementById("form-user-create").addEventListener("submit", function(event){

    // cancela o comportamento padrao do form
    event.preventDefault();

    fields.forEach(function(field, index){

        if(field.name == "gender"){
           
            if(field.checked === true ){
                user[field.name] = field.value;
            }
    
        }else{
            user[field.name] = field.value;
        }
    
    
    });

    addLine(user);

});