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

            //aqui recriamaos a variavel values para tratar a variavel de imagem
            let values = this.getValues();            

            //o getFoto com a funcao de parametro
            this.getFoto((content)=>{
                
                //aqui recebe o retorno da funcao de parametro
                //que a imagem criptografada
                values.photo = content;

                // pega os valores digitados no formulario e nao da request no formulario,
                // apenas cria uma linha no grid com os dados do formulario
                this.addLine( values );

            });            

        });

    }

    /**
     * A funcao getFoto tem como paramentro um funcao
     * A funcao callback retorna o arquivo
     * @param {*} callback funcao 
     * 
     */
    getFoto(callback){
        //instancia a classe que trabalha com imagem
        let fileReader = new FileReader();

        //filtra os elementos do formulario e retorna quando for o campo da imagem
        let elements = [...this.formEl.elements].filter(item =>{
            if(item.name === 'photo'){
                return item;
            }
        });

        // aqui como so temos um arquivo de foto, nao percoremos o elemento form, vamos direto no index
        // 0 do elemento da foto 
        // elements e files sao colecoes
        let file = elements[0].files[0];

        //carregando o arquivo
        fileReader.readAsDataURL(file);
        
        // aqui onload recebe uma funcao de retorno callback
        // apos finalizar o carregamento executa
        fileReader.onload = ()=>{
            
            //passa o velor como retorna da funcao callback
            //quando chamada o getFoto, usa uma funcao arrowfunction e coloca como parametro
            // a variavel que ira receber este valor aqui do result
            callback(fileReader.result);
        };

        

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
                        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
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