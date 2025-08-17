// Produtos
const produtos = [
  { nome: "Fone de ouvido", descricao: "Sem fio, bluetooth", valor: 199.90, imagem: "imagens/fone.jpg", categoria: "Celular" },
  { nome: "Teclado Gamer", descricao: "RGB, mecânico", valor: 299.90, imagem: "imagens/teclado.jpg", categoria: "Computador" },
  { nome: "Mouse Gamer", descricao: "RGB, 16000 dpi", valor: 149.90, imagem: "imagens/mouse.jpg", categoria: "Computador" },
  { nome: "Controle PS5", descricao: "Wireless", valor: 399.90, imagem: "imagens/controle.jpg", categoria: "Videogame" }
];

const produtosContainer = document.getElementById("produtos");
const itensCarrinho = document.getElementById("itens-carrinho");
const enviarPedido = document.getElementById("enviar-pedido");
const totalSpan = document.getElementById("total");

let categoriaSelecionada = "Todos";
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Render produtos na loja
function renderProdutos() {
  if(!produtosContainer) return;
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
}

// Remover produto do carrinho
function removerProduto(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
}

// Renderizar carrinho
function renderCarrinho() {
  if(!itensCarrinho) return;
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
  if(totalSpan) totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Enviar pedido via WhatsApp
if(enviarPedido){
  enviarPedido.addEventListener("click", () => {
    if(carrinho.length === 0){
      alert("Carrinho vazio!");
      return;
    }
    let texto = "Olá, gostaria de fazer o pedido:\n";
    carrinho.forEach(item => {
      texto += `- ${item.nome} - R$ ${item.valor.toFixed(2)}\n`;
    });
    const numeroWhats = "5521987052383"; // Colocar número da empresa
    const url = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  });
}

// Inicialização
renderProdutos();
renderCarrinho();

























