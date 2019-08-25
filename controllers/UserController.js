class UserController {

    constructor(formId, tableId){

        //inicia a variavel com os elementos do formulario
        this.formEl = document.getElementById(formId);

        //inicia a variavel da tabela que recebera os dados do usuario
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    }

    /**
     * Quando clicar no botao, o submit do formulario e montado aqui
     */
    onSubmit(){

        
        // pegamos o evento submit do formulario
        // como ja pegamos o formulario no construtor
        // aqui so passa a variavel formEl.
        // Outra coisa aqui, vamos usar o arrow function dentro do metodo
        // para evitar conflito com o this da classe que passaria a ser o this da function.        
        // Nesta arrow function nao for colocado os () poi tem apenas um paramentro
        this.formEl.addEventListener("submit", event => {

            // cancela o evento padrao do form
            event.preventDefault();

            // pega os valores digitados no formulario e nao da request no formulario,
            // apenas cria uma linha no grid com os dados do formulario
            this.addLine( this.getValues() );

            

        });

    }

    /**
     * Pega os valores dos campos do formulario
     */
    getValues(){
        // declarando com let, para ficar somente dentro do escopo
        let user = {};
        
        // vamos rodar o foreach nos elementos do formulario.
        // por se tratar de um objto, nao encontrara o metodo forEach()
        // entao e usado os [] envolta do objeto para converter em array
        // mas ai teria outro problema de ficar percorrendo todos os indices do objeto
        // para isso tem um operador novo chamado Spread (...) antes do this para nao ter que precisar verificar quantos indices
        // o array vai ter
        
        [...this.formEl.elements].forEach(function(field, index){

            if(field.name == "gender"){
               
                if(field.checked === true ){
                    user[field.name] = field.value;
                }
        
            }else{
                user[field.name] = field.value;
            }
        
        
        });
        
        // retornado direto a resposta da classe
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.passwor, 
            user.photo, 
            user.admin);

        
    }

    addLine(dataUser){
                
        // usando a crase para fazer um template string
        this.tableEl.innerHTML = `
                    <tr>
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
        
    
        
    }
    
}