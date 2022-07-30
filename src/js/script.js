const ul = document.querySelector("ul")
let total = document.querySelector(".total")

function listarProdutos(array){
    array.forEach(produto =>{ 
       let cards = criarCards(produto)
       ul.append(cards)
    })
    let valorTotal = somarProdutos(array)
    total.innerHTML = ""
    total.append(`R$ ${valorTotal.toFixed(2)}`) 
}
listarProdutos(produtos)

function criarCards(produto){
    const li = document.createElement("li")
    const img = document.createElement("img")
    const h3 = document.createElement("h3")
    const span = document.createElement("span")
    const p = document.createElement("p")

    img.src = produto.img
    img.alt = ` Imagem ${produto.nome}`
    h3.innerText = produto.nome
    span.innerText = produto.secao 
    p.innerText = `R$ ${produto.preco.toFixed(2)}`

    li.append(img, h3, span, p)
    
    return li
}

const botaoTodos = document.getElementsByClassName("estiloGeralBotoes estiloGeralBotoes--filter")[0]
const botaoHortifruti = document.getElementsByClassName("estiloGeralBotoes estiloGeralBotoes--filter")[1]
const botaoPanificadora = document.getElementsByClassName("estiloGeralBotoes estiloGeralBotoes--filter")[2]
const botaoLaticinios = document.getElementsByClassName("estiloGeralBotoes estiloGeralBotoes--filter")[3]


function filtrarProdutos(){
    botaoTodos.addEventListener("click", function(){
        ul.innerHTML = ""
        listarProdutos(produtos)
    })
    botaoHortifruti.addEventListener("click", function(){
        ul.innerHTML = ""
        const hortifruti = []
        produtos.filter(produto => {
            if(produto.secao === "Hortifruti"){
                hortifruti.push(produto)               
            }
        }) 
        listarProdutos(hortifruti) 
    })
    botaoPanificadora.addEventListener("click", function(){
        ul.innerHTML = ""
        const panificadora = []
        produtos.filter(produto => {
            if(produto.secao === "Panificadora"){
                panificadora.push(produto)
            }
        })
        listarProdutos(panificadora)
    })
    botaoLaticinios.addEventListener("click", function(){
        ul.innerHTML = ""
        const laticinios = []
        produtos.filter(produto => {
            if(produto.secao === "Laticínio"){
                laticinios.push(produto)
            }
        })
        listarProdutos(laticinios)
    })
}
filtrarProdutos()

const inputPesquisa = document.getElementById("campoBusca")
const botaoPesquisa = document.getElementById("botaoPesquisa")

function pesquisaProdutos(){
    botaoPesquisa.addEventListener("click", function(){
    ul.innerText = ""
    const resultadoPesquisa = []
        produtos.forEach(produto => {
            let campoBusca = inputPesquisa.value.toLowerCase()
            let nomeBusca = produto.nome.toLowerCase()
            let secao = produto.secao.toLowerCase()
            let categoria = produto.categoria.toLocaleLowerCase()
            if(nomeBusca.includes(campoBusca) || secao.includes(campoBusca)|| categoria.includes(campoBusca)){
                resultadoPesquisa.push(produto)
            }
        })
    listarProdutos(resultadoPesquisa)
    })
}
pesquisaProdutos()

function somarProdutos(array){
    let valores = []
    array.forEach(produto =>{
        valores.push(produto.preco)
    })
    return soma(valores)
}

function soma(array){
    let valorInicial = 0
    const soma = array.reduce((valorAnterior,valorAtual)=>{
         return valorAnterior + valorAtual
     },valorInicial)
     return soma  
}



   




