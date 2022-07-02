//Array de objetos contendo dados dos livros já cadastrados
let BancoDeLivros = [{

    numero: 1,
    titulo: "Como fazer sentido e bater o martelo",
    autor: "Alexandro Aolchique",
    ano: 2017,
    statusAtual: "Disponível",
    emprestadoPara: ""
},
{
    numero: 2,
    titulo: "Sejamos todos feministas",
    autor: "Chimamanda Ngozi Adichie",
    ano: 2015,
    statusAtual: "Disponível",
    emprestadoPara: ""
},
{
    numero: 3,
    titulo: "Basquete 101",
    autor: "Hortência Marcari",
    ano: 2010,
    statusAtual: "Disponível",
    emprestadoPara: ""
}];

/*
    Verifica se o local storage já contém dados armazenados. 
    Caso não tenha, a variável BancoDeLivros é armazenada. 
    Caso tenha, a variável BancoDeLivros recebe os dados nele contidos.
*/
if(localStorage.hasOwnProperty("BancoDeLivrosLocal")){
    BancoDeLivros = JSON.parse(localStorage.getItem("BancoDeLivrosLocal"));
} else {
    localStorage.setItem("BancoDeLivrosLocal", JSON.stringify(BancoDeLivros));
}

const coletarNome = () => prompt("Qual o seu nome?");
const coletarTitulo = () => prompt("Digite o título do livro:").toUpperCase();

//Função para coleta de dados do livro a ser doado
function coletarDadosDeLivroDoado(array) {
    let LivroDoado = {
        numero: 0,
        titulo: "",
        autor: "",
        ano: 0,
        statusAtual: "Disponível",
        emprestadoPara: "",
    };

    LivroDoado.numero = array.length + 1;
    LivroDoado.titulo = prompt("Digite o título do livro:");
    LivroDoado.autor = prompt("Digite o nome do autor do livro:");
    LivroDoado.ano = parseInt(prompt("Digite o ano do livro:"));

    return LivroDoado;
}


//Função de retirada de um livro
function retirarLivro(array) {
    let tituloDoLivroSolicitado = "", nomeDoSolicitante = "";

    nomeDoSolicitante = coletarNome();
    tituloDoLivroSolicitado = coletarTitulo();

    for(let i = 0; i < array.length; i++) {

        let tituloTemporarioParaBusca = array[i].titulo.toUpperCase();

        if(tituloDoLivroSolicitado === tituloTemporarioParaBusca && array[i].statusAtual == "Disponível") {

            array[i].statusAtual = "Indisponível";
            array[i].emprestadoPara = nomeDoSolicitante;
            localStorage.setItem("BancoDeLivrosLocal", JSON.stringify(array));

            return alert(`O seguinte livro foi retirado:
            Número: ${array[i].numero}
            Título: ${array[i].titulo}
            Autor: ${array[i].autor}
            Ano: ${array[i].ano}
            Status atual: ${array[i].statusAtual}
            Emprestado para: ${array[i].emprestadoPara}
            \nBoa leitura!`);
        }
        else if(tituloDoLivroSolicitado === tituloTemporarioParaBusca && array[i].statusAtual === "Indisponível") {

            return alert("Livro Indisponível!");
        }
        else if(i == array.length - 1 && tituloDoLivroSolicitado !== tituloTemporarioParaBusca) {

            return alert("Livro não encontrado!");

        } else {
            continue;
        }
    }
}

//Função de devolução de um livro
function devolverLivro(array) {
    let tituloDoLivroParaDevolucao = "";
    
    tituloDoLivroParaDevolucao = coletarTitulo();

    for(let i = 0; i < array.length; i++) {

        let tituloTemporarioParaBusca = array[i].titulo.toUpperCase();

        if(tituloDoLivroParaDevolucao === tituloTemporarioParaBusca && array[i].statusAtual === "Indisponível") {

            array[i].statusAtual = "Disponível";
            array[i].emprestadoPara = "";
            localStorage.setItem("BancoDeLivrosLocal", JSON.stringify(array));

            return alert(`O seguinte livro foi devolvido:
            Número: ${array[i].numero}
            Título: ${array[i].titulo}
            Autor: ${array[i].autor}
            Ano: ${array[i].ano}
            Status atual: ${array[i].statusAtual}
            Emprestado para: ${array[i].emprestadoPara}
            \nObrigado!`);
        }
        else if(tituloDoLivroParaDevolucao === tituloTemporarioParaBusca && array[i].statusAtual === "Disponível") {

            return alert("O livro já foi devolvido(suspeito -_-)");
        }
        else if(i == array.length - 1 && tituloDoLivroParaDevolucao !== tituloTemporarioParaBusca) {

            return alert("Livro não encontrado!");
        }
        else {
            continue;
        }
    }
}

//Função de doação de um livro
function doarLivro(array) {

    let LivroDoado = coletarDadosDeLivroDoado(BancoDeLivros);
    array.push(LivroDoado);
    localStorage.setItem("BancoDeLivrosLocal", JSON.stringify(array));

    return alert(`O seguinte livro foi adicionado ao banco de livros da biblioteca:
    Número: ${LivroDoado.numero}
    Título: ${LivroDoado.titulo}
    Autor: ${LivroDoado.autor}
    Ano: ${LivroDoado.ano}
    Status atual: ${LivroDoado.statusAtual}
    Emprestado para: ${LivroDoado.emprestadoPara}
    \nAgradecemos a sua doação! <3`);
}

//"Tela inicial" do sistema da biblioteca
let op = "";

do {

    op = prompt("Bem vindo à Biblioteca Ágil!\nQual ação deseja realizar?(Digite o número correspondente)\n1 - Retirar um livro\n2 - Devolver um livro\n3 - Doar um livro\n4 - Sair");

    switch(op) {
        case "1":
            retirarLivro(BancoDeLivros);
            console.log(BancoDeLivros);
            break;
        case "2":
            devolverLivro(BancoDeLivros);
            console.log(BancoDeLivros);
            break;
        case "3":
            doarLivro(BancoDeLivros);
            console.log(BancoDeLivros);
            break;
        case "4":
            console.log(JSON.parse(localStorage.getItem("BancoDeLivrosLocal")));
            break;
        default:
            alert("Valor inválido! Digite um dos números correspondentes.");
            break;
    }

}while(op !== "4");