class Produto{

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
    }

    SalvarDados(){
        let produto = this.LerDados();
        if(this.VerificaCampo(produto)){
            this.AdicionarNaArray(produto);
            this.AdicionarNaTabela();
        }
        document.querySelector("#nomeProduto").value = "";
    }

    LerDados(){
        let produto = {};
        produto.id = this.id;
        produto.nome = document.querySelector("#nomeProduto").value;
        produto.tipo = this.RetornaTipo();

        return produto;
    }

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

    RetornaTipo(){
        if(document.querySelector("#graos").checked == true){ 
            document.querySelector("#graos").checked = false;
            return "Grão"; 
        }
        else if(document.querySelector("#massas").checked == true) {
            document.querySelector("#massas").checked = false;
            return "Massa"; 
        }
        else if(document.querySelector("#verduras").checked == true){
            document.querySelector("#verduras").checked = false;
            return "Verdura"; 
        }
        else if(document.querySelector("#frutas").checked == true){
            document.querySelector("#frutas").checked = false;
            return "Fruta";
        }
        else if(document.querySelector("#laticinios").checked == true){
            document.querySelector("#laticinios").checked = false;
            return "Laticínio";
        }
        else if(document.querySelector("#congelados").checked == true){
            document.querySelector("#congelados").checked = false;
            return "Congelado";
        }
        else if(document.querySelector("#doces").checked == true){
            document.querySelector("#doces").checked = false;
            return "Doce";
        }
        else if(document.querySelector("#limpezas").checked == true){
            document.querySelector("#limpezas").checked = false;
            return "Limpeza";
        }
        else{ 
            return "Não Especificado" 
        }
    }

    AdicionarNaArray(produto){
        this.arrayProdutos.push(produto);
        this.id++;
    }

    AdicionarNaTabela(){
        let tbody = document.querySelector("tbody");
        tbody.innerText = "";

        for(let i=0; i<this.arrayProdutos.length; i++){
            let linha = tbody.insertRow();
            let colunaId = linha.insertCell();
            let colunaNome = linha.insertCell();
            let colunaTipo = linha.insertCell();
            let colunaAcao = linha.insertCell();

            colunaId.innerHTML = this.arrayProdutos[i].id;
            colunaNome.innerHTML = this.arrayProdutos[i].nome;
            colunaTipo.innerHTML = this.arrayProdutos[i].tipo;
            
            let imgDelete = document.createElement("img");
            imgDelete.src = "img/delete.svg";
            imgDelete.style.width = "20px";
            imgDelete.style.cursor = "pointer";

            imgDelete.setAttribute("onclick", `produto.Deletar(${this.arrayProdutos[i].id})`);

            colunaAcao.appendChild(imgDelete);
        }
        console.log(this.arrayProdutos);
    }

    Deletar(id){
        let tbody = document.querySelector("tbody");
        for(let i=0; i<this.arrayProdutos.length; i++){
            if(id==this.arrayProdutos[i].id){
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
    }
}

var produto = new Produto();