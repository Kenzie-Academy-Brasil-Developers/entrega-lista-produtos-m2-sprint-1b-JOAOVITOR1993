const ul = document.querySelector(".containerListaProdutos ul")

const carrinhoCompras = []

function listarProdutos(array){
    array.forEach(produto =>{ 
       let cards = criarCards(produto)
       ul.append(cards)
    })
}
listarProdutos(produtos)

function criarCards(produto){
    const li = document.createElement("li")
    const img = document.createElement("img")
    const h3 = document.createElement("h3")
    const span = document.createElement("span")
    const olNutrientes = document.createElement("ol")

    produto.componentes.forEach(elemento => {
        const li = document.createElement("li")
            li.innerText = elemento 
            olNutrientes.append(li)
    })
  
    const divPrecoBotao = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    
    img.src = produto.img
    img.alt = ` Imagem ${produto.nome}`
    h3.innerText = produto.nome
    span.innerText = produto.secao
    divPrecoBotao.className = "divPrecoBotao"

    let precoConvertido = parseInt(produto.preco)
    p.innerText = `R$ ${precoConvertido.toFixed(2)}`
    button.innerText = "Comprar"
    button.id = "botaoComprar"

    button.addEventListener("click",() => {
        let produtoId = produto.id
        let produtoClicado = produtos.find((elemento) =>{
            if(produtoId === elemento.id){
                return elemento
            }
        })
        adicionarCarrinho(produtoClicado)
    })

    divPrecoBotao.append(p, button)
    li.append(img, h3, span, olNutrientes, divPrecoBotao)
    
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
         const hortifruti = produtos.filter(produto => {
            if(produto.secao === "Hortifruti"){
                return produto               
            }
        }) 
        listarProdutos(hortifruti) 
    })
    botaoPanificadora.addEventListener("click", function(){
        ul.innerHTML = ""
         const panificadora = produtos.filter(produto => {
            if(produto.secao === "Panificadora"){
                return produto 
            }
        })
        listarProdutos(panificadora)
    })
    botaoLaticinios.addEventListener("click", function(){
        ul.innerHTML = ""
        const laticinios = produtos.filter(produto => {
            if(produto.secao === "Laticínio"){
                return produto
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
        let precoConvertido = parseInt(produto.preco)
        valores.push(precoConvertido)
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

const ulCarrinho = document.querySelector(".carrinho ul")
const quantidade = document.querySelector(".numeroQuantidade")
const total = document.querySelector(".valorTotal")

function adicionarCarrinho(produtoAdd){
    carrinhoCompras.push(produtoAdd)
    listarProdutosCarrinho(carrinhoCompras)
}

function listarProdutosCarrinho(array){
    ulCarrinho.innerHTML =""
    array.forEach((produto) =>{
        let miniCards = criarCardCarrinho(produto)
        ulCarrinho.append(miniCards)
    })
 
    let valorTotal = somarProdutos(carrinhoCompras)
    total.innerHTML = ""
    total.append(`R$ ${valorTotal.toFixed(2)}`)
    quantidade.innerHTML = ""
    quantidade.append(carrinhoCompras.length)

    if(carrinhoCompras.length === 0){
        ulCarrinho.insertAdjacentHTML("afterbegin",`
        <p class ="adicioneItens">Por enquanto não temos produtos no carrinho</p>
        `)
    }
}

function criarCardCarrinho(produto){
    const li = document.createElement("li")
    const containerImgH3SpanP = document.createElement("span")
    const img = document.createElement("img")
    const spanContainer = document.createElement("span")
    const h3 = document.createElement("h3")
    const span = document.createElement("span")
    const p = document.createElement("p")
    const imgLixo = document.createElement("img")
    const button = document.createElement("button")

    button.addEventListener("click", ()=>{
        removerProdutoCarrinho(produto)
    })
    
    li.className = "cardCarrinho"
    containerImgH3SpanP.className = "containerImgInf"
    img.src = produto.img
    img.alt = ` Imagem ${produto.nome}`
    spanContainer.className = "containerH3SpanP"
    h3.innerText = produto.nome
    span.innerText = produto.secao
    let precoConvertido = parseInt(produto.preco)
    p.innerText = `R$ ${precoConvertido.toFixed(2)}`
    imgLixo.src = "./src/img/lixeira.png"

    containerImgH3SpanP.append(img, spanContainer)
    spanContainer.append(h3, span, p)
    button.append(imgLixo)
    li.append(containerImgH3SpanP, button)

    return li
}

function removerProdutoCarrinho(produto) {
    let index = carrinhoCompras.indexOf(produto)
    carrinhoCompras.splice(index,1)
    listarProdutosCarrinho(carrinhoCompras) 
}






