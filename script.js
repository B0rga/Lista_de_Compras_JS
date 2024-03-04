class Produto{

    constructor(){}

    VerificaCampo(nome){
        if(nome == ''){
            document.querySelector("small").innerHTML = "Preencha o campo!";
            return false;
        }
        else{
            document.querySelector("small").innerHTML = "";
            return true;
        };;
    }

    RetornaTipo(){
        if(document.querySelector("#graos").checked == true){ return "grao"; }
        else if(document.querySelector("#massas").checked == true) {return "massa"; }
        else if(document.querySelector("#verduras").checked == true){ return "verdura"; }
        else if(document.querySelector("#frutas").checked == true){ return "fruta"; }
        else if(document.querySelector("#laticinios").checked == true){ return "laticinio"; }
        else if(document.querySelector("#congelados").checked == true){ return "congelado"; }
        else if(document.querySelector("#doces").checked == true){ return "doce"; }
        else if(document.querySelector("#limpezas").checked == true){ return "limpeza"; }
        else{ return "naoEspecificado" }
    }

    Adicionar(){
        let produto = {};
        produto.nome = document.querySelector("#nome_produto").value;
        produto.tipo = this.RetornaTipo();

        let campoPrenchido = this.VerificaCampo(produto.nome);
        if(campoPrenchido == true){
            let p = document.createElement("p");
            p.innerHTML = produto.nome;
            document.querySelector(`#coluna_${produto.tipo}`).appendChild(p);
            document.querySelector("#nome_produto").value = "";
            document.querySelector(`#${produto.tipo}s`).checked = false;
        }
    }
}

var produto = new Produto();