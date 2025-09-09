// Produtos
const produtos = [
  { nome: "Topo de Bolo 3D", descricao: "Topo 3D da Minnie", valor: 40.00, imagem: "img/topodebolo3d1.jpg", categoria: "topo_de_bolo_3d" },
  { nome: "Topo de Bolo 3D", descricao: "Topo 3D", valor: 40.00, imagem: "img/topodebolo3d3.jpg", categoria: "topo_de_bolo_3d" },
  { nome: "Topo de Bolo 3D", descricao: "Topo 3D do Safari", valor: 40.00, imagem: "img/topodebolo3d4.jpg", categoria: "topo_de_bolo_3d" },
  { nome: "Topo de Bolo 3D", descricao: "Topo 3D da Minnie", valor: 40.00, imagem: "img/topodebolo3d5.jpg", categoria: "topo_de_bolo_3d" },
  { nome: "Topo de Bolo 3D", descricao: "Incrivel mundo de gumball", valor: 40.00, imagem: "img/topodebolo3d6.jpg", categoria: "topo_de_bolo_3d" },
  { nome: "Topo de Bolo Simples", descricao: "Super Man", valor: 25.00, imagem: "img/topodebolosimples1.jpg", categoria: "topo_de_bolo_simples" },
  { nome: "Topo de Bolo Simples", descricao: "Minions", valor: 25.00, imagem: "img/topodebolosimples2.jpg", categoria: "topo_de_bolo_simples" },
  { nome: "Topo de Bolo Simples", descricao: "Stray Kids", valor: 25.00, imagem: "img/topodebolosimples3.jpg", categoria: "topo_de_bolo_simples" },
  { nome: "Topo de Bolo Simples", descricao: "Grizzy e os Lemmings", valor: 25.00, imagem: "img/topodebolosimples4.jpg", categoria: "topo_de_bolo_simples" },
];

const produtosContainer = document.getElementById("produtos");
const itensCarrinho = document.getElementById("itens-carrinho");
const enviarPedido = document.getElementById("enviar-pedido");
const totalSpan = document.getElementById("total");

let categoriaSelecionada = "Todos";
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Render produtos na loja
function renderProdutos() {
    if (!produtosContainer) return;
    produtosContainer.innerHTML = "";
    const filtrados = categoriaSelecionada === "Todos" ? produtos : produtos.filter(p => p.categoria === categoriaSelecionada);

    filtrados.forEach((p, i) => {
        const div = document.createElement("div");
        div.className = "produto";
        div.innerHTML = `
            <img src="${p.imagem}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p>${p.descricao}</p>
            <p>R$ ${p.valor.toFixed(2)}</p>
            <button onclick="adicionarCarrinho(${i})">Adicionar</button>
        `;
        produtosContainer.appendChild(div);
    });
}

// Filtrar categoria
function filtrarCategoria(cat) {
    categoriaSelecionada = cat;
    renderProdutos();
}

// Adicionar produto ao carrinho
function adicionarCarrinho(index) {
    carrinho.push(produtos[index]);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${produtos[index].nome} adicionado ao carrinho!`);
    renderCarrinho();
}

// Remover produto do carrinho
function removerProduto(index) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
}

// Renderizar carrinho
function renderCarrinho() {
    if (!itensCarrinho) return;
    itensCarrinho.innerHTML = "";
    let total = 0;
    carrinho.forEach((item, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            ${item.nome} - R$ ${item.valor.toFixed(2)}
            <button class="remover" onclick="removerProduto(${i})">Remover</button>
        `;
        itensCarrinho.appendChild(li);
        total += item.valor;
    });
    if (totalSpan) totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Enviar pedido via WhatsApp
if (enviarPedido) {
    enviarPedido.addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("Carrinho vazio!");
            return;
        }
        let texto = "Olá, gostaria de fazer o pedido:\n";
        carrinho.forEach(item => {
            texto += `- ${item.nome} - R$ ${item.valor.toFixed(2)}\n`;
        });
        const numeroWhats = "5521987052383";
        const url = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank");
    });
}

// Inicialização
renderProdutos();
renderCarrinho();
