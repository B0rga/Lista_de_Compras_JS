class Produto{

    // o construtor armazena os dados necessários para a inicialização de um objeto
    constructor(){  
        this.id = 1; // atributo que determina o id do produto (inicia com 1)
        this.arrayProdutos = []; // array para armazenar o conjunto de produtos (objetos) criados
        this.editId = null; // atributo para verificar se um produto existe, para assim poder editá-lo
    }

    // método que lê e retorna dados do produto
    LerDados(){
        let produto = {}; // criando objeto
        produto.id = this.id; // recebendo o id atual
        produto.nome = document.querySelector("#nomeProduto").value; // recebendo o nome do input
        produto.tipo = this.RetornaTipo(); // o tipo é determinado pelo retorno de outro método
        this.DesmarcaRadios();

        return produto;
    }

    // método que valida se o campo do produto está preenchido
    VerificaCampo(produto){
        if(produto.nome == ''){
            document.querySelector("small").innerHTML = "Preencha o campo!";
            return false;
        }
        else{
            document.querySelector("small").innerHTML = "";
            return true;
        };;
    }

    // método que retorna o tipo do produto, verificando qual radio está preenchido
    RetornaTipo(){
        if(document.querySelector("#graos").checked == true){return "Grão";}
        else if(document.querySelector("#massas").checked == true) {return "Massa";}
        else if(document.querySelector("#verduras").checked == true){return "Verdura";}
        else if(document.querySelector("#frutas").checked == true){return "Fruta";}
        else if(document.querySelector("#laticinios").checked == true){return "Laticínio";}
        else if(document.querySelector("#congelados").checked == true){return "Congelado";}
        else if(document.querySelector("#doces").checked == true){return "Doce";}
        else if(document.querySelector("#limpezas").checked == true){return "Limpeza";}
        else{return "Não Especificado";}
    }

    // método para desmarcar todos os radios
    DesmarcaRadios(){
        let radios = document.querySelectorAll("input[type=radio]"); // recebendo uma lista de todos os radios do HTML
        radios.forEach((radio) => radio.checked=false); // o forEach passa por cada radio da lista, desmarcando-o
    }

    // método que adiciona um objeto produto na array
    AdicionarNaArray(produto){
        this.arrayProdutos.push(produto);
        this.id++;
    }

    // método que modifica a tabela do HTML, adicionando ou editando uma linha
    ModificaTabela(){
        let tbody = document.querySelector("tbody");

        // devemos limpar o texto do tbody logo de início, para que ele não adicione o item anterior novamente
        tbody.innerText = "";

        // este for tem a função de selecionar o último produto da array, para assim adicioná-lo à tabela
        for(let i=0; i<this.arrayProdutos.length; i++){
            let linha = tbody.insertRow(); // inserindo uma nova linha no tbody
            
            // inserindo colunas na linha criada
            let colunaId = linha.insertCell();
            let colunaNome = linha.insertCell();
            let colunaTipo = linha.insertCell();
            let colunaAcao = linha.insertCell();

            // alternando o texto das novas colunas de acordo com os dados do produto adicionado
            colunaId.innerHTML = this.arrayProdutos[i].id;
            colunaNome.innerHTML = this.arrayProdutos[i].nome;
            colunaTipo.innerHTML = this.arrayProdutos[i].tipo;
            
            // criando um botão de delete
            let imgDelete = document.createElement("img");
            imgDelete.src = "img/delete.svg";

            // criando botão de editar
            let imgEdit = document.createElement("img");
            imgEdit.src = "img/edit.svg";

            // abaixo estou setando o atributo de "onclick" para o botão. Fazemos referência a qual método da classe
            // ele deve executar, enquanto passamos o id do produto recém criado como parâmetro. Ou seja, cada linha
            // terá um botão de delete, que irá remover apenas o produto da mesma, baseado no id do produto
            imgDelete.setAttribute("onclick", `produto.Deletar(${this.arrayProdutos[i].id})`);

            // o processo de atribuição ao botão editar é o mesmo. A diferença é que o método a qual ele faz
            // referência irá receber um JSON do produto atual como parâmetro. Ou seja, o botão editar desta
            // linha irá conter todos dados do produto da mesma, como id, nome e tipo.
            imgEdit.setAttribute("onclick", `produto.PreparaEdicao(${JSON.stringify(this.arrayProdutos[i])})`);

            // adicionando os botões à 'colunaAcao'
            colunaAcao.appendChild(imgDelete);
            colunaAcao.appendChild(imgEdit);
        }
        this.CancelarElementos();
        console.log(this.arrayProdutos);
    }

    // método que irá remover o produto da array e da tabela, baseando-se no seu id
    Deletar(id){
        if(confirm(`Deseja excluir o produto ${id} da lista?`)){
            let tbody = document.querySelector("tbody");
            
            // este for percorrerá por toda a array até encontrar o produto com o mesmo id do parâmetro
            for(let i=0; i<this.arrayProdutos.length; i++){
                if(id==this.arrayProdutos[i].id){ // comparando o id do parâmetro com o id de cada produto da array
                    // se os dados baterem, o produto será removido da array baseado no índice em que está localizado
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i); // o produto também será removido da tabela, baseado no índice
                }
            }

        }
    }

    // método que irá modificar o estilo dos elementos do HTML, de acordo com a necessidade do código
    ModificarElementos(){
        this.DesmarcaRadios();
        document.querySelector("#btnAdicionar").value = "Atualizar";
        document.querySelector("#btnCancelar").style.visibility = "visible";
    }

    // método que irá cancelar a edição de um produto, além de retornar o estilo original dos elementos do HTML
    CancelarElementos(){
        this.DesmarcaRadios();
        document.querySelector("#nomeProduto").value = "";
        document.querySelector("#btnAdicionar").value = "Adicionar";
        document.querySelector("#btnCancelar").style.visibility = "hidden";

        // ao cancelarmos a edição, o editId deve voltar a ser null, para que possamos adicionar novos produtos novamente
        this.editId = null; 

        let imagens = document.querySelectorAll("img"); // recebendo uma lista de todas as imagens do HTML (neste caso os botões de editar e deletar)
        imagens.forEach((img) => img.style.visibility="visible"); // passando por cada imagem da lista, tornando-as visível

        let linhas = document.querySelectorAll("tr"); // recebendo todas as linhas da table do HTML
        linhas.forEach((linha) => linha.style.color="lavender"); // mudando a cor de cada uma
        linhas.forEach((linha) => linha.style.backgroundColor="#1C1C1C"); // mudando a cor do background de cada uma
    }

    // método que prepara a edição de um produto, baseando-se nos dados que foram recebidos pelo JSON
    PreparaEdicao(dados){
        this.editId = dados.id; // quando o editId deixa de ser null significa que agora iremos atualizar um produto, e não adicionar
        document.querySelector("#nomeProduto").value = dados.nome; // o input recebe o nome do produto selecionado
        this.ModificarElementos();

        let linhas = document.querySelectorAll("tbody > tr"); // recebendo uma lista de todas as linhas do tbody
        
        // este for tem o papel de destacar a linha do produto que estamos editando. Ele irá percorrer por todos os
        // elementos da array até encontrar o elemento que tenha o mesmo id do produto selecionado.
        for(let i=0; i<this.arrayProdutos.length; i++){
            if(dados.id==this.arrayProdutos[i].id){

                // quando os dados baterem o estilo da linha poderá ser alterado, baseada no índice atual do for
                linhas[i].style.color = "#1C1C1C";
                linhas[i].style.backgroundColor = "lavender";
                
                // para evitar problemas, "desligaremos" a edição ou exclusão de qualquer outro produto,
                // até que a edição deste produto seja cancelada ou concluída
                let imagens = document.querySelectorAll("img");
                imagens.forEach((img) => img.style.visibility="hidden");
            }
        }
    }

    // método que irá alterar os dados do produto da array
    AtualizarProduto(id, produto){

        // este for percorrerá pela array até encontrar o elemento de mesmo id do produto selecionado para edição
        for(let i=0; i<this.arrayProdutos.length;i++){
            if(id==this.arrayProdutos[i].id){

                // alterando os dados
                this.arrayProdutos[i].nome = produto.nome;
                this.arrayProdutos[i].tipo = produto.tipo;
            }
        }
        this.CancelarElementos()
    }
    
    // método principal para adicionar produto
    SalvarDados(){
        let produto = this.LerDados(); // objeto recebendo os dados
        if(this.VerificaCampo(produto)){ // verificando se o campo está preenchido
            if(this.editId == null){ // verificando se um produto foi ou não selecionado para edição
                this.AdicionarNaArray(produto); // adicionando um novo produto à array
            }
            else{
                this.AtualizarProduto(this.editId, produto); // editando um produto sa array
            }            
        }
        this.ModificaTabela(); // modificando tabela
        document.querySelector("#nomeProduto").focus(); // focando o input automaticamente
    }    
}

const produto = new Produto(); // instanciando a classe