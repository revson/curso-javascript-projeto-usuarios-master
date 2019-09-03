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

            // o then tem duas funcoes de retorno, a primeira para certo e a segunda para errado
            // foi usado arrow funcion nos parametros de retorno para evitar conflito com o this que esta 
            // dentro da funcao
            this.getFoto().then(
                (content)=>{

                    //aqui recebe o retorno da funcao de parametro
                    //que a imagem criptografada
                    values.photo = content;

                    // pega os valores digitados no formulario e nao da request no formulario,
                    // apenas cria uma linha no grid com os dados do formulario
                    this.addLine( values );

                }, 
                (e)=>{
                    console.log(e);

                }
            );      

        });

    }

    
    getFoto(){

        // esta retornando o resoltado da classe Promessa
        // usa os paramentros resolve e reject na classe
        // fica parecido com o try catch para tratamento de erros
        // quando chamar a funcao getFoto, coloca o metodo then(), 
        // this.getFoto().then();
        return new Promise((resolve, reject)=>{

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

              
            // aqui onload recebe uma funcao de retorno callback
            // apos finalizar o carregamento executa
            fileReader.onload = ()=>{
                
                //O resolve retorna o resultado do conteudo do arquivo
                resolve(fileReader.result);
            };

            //case tenha algum erro, retorna o erro no reject da promessa
            fileReader.onerror = (e)=>{
                reject(e);
            };

            //carregando o arquivo
            if(file){
                fileReader.readAsDataURL(file);
            }else{
                resolve("dist/img/boxed-bg.jpg");
            }
           


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
        
            }else if(field.name == "admin"){

                user[field.name] = field.checked;

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
        
        let tr = document.createElement("tr");

        // usando a crase para fazer um template string
        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${dataUser.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;

        this.tableEl.appendChild(tr);
        
    
        
    }
    
}