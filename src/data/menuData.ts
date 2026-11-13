import burgerClassicImg from '../assets/images/burger_classic_1794581682149.jpg';
import burgerBaconImg from '../assets/images/burger_bacon_1794581681278.jpg';
import burgerChickenImg from '../assets/images/burger_chicken_1794581681977.jpg';
import pastelCarneImg from '../assets/images/pastel_carne_queijo_1794581681887.jpg';
import pastelFrangoImg from '../assets/images/pastel_frango_catupiry_1794581682155.jpg';
import sorveteCasquinhaImg from '../assets/images/sorvete_casquinha_1794581684331.jpg';
import sorveteSundaeImg from '../assets/images/sorvete_sundae_1794581683307.jpg';
import comboFamiliaImg from '../assets/images/combo_familia_1794581685191.jpg';
import sobreLanchoneteImg from '../assets/images/sobre_lanchonete_1794581686212.jpg';

import type {
  CategoryBlockConfig,
  ComboItem,
  GalleryItem,
  HomeHighlightItem,
  MenuCategoryKey,
  MenuItem,
  TestimonialItem,
} from '../types';

export const MENU_TABS: { key: MenuCategoryKey; sectionId: string; label: string }[] = [
  { key: 'lanches', sectionId: 'cardapio-lanches', label: 'Lanches' },
  { key: 'pasteis', sectionId: 'cardapio-pasteis', label: 'Pastéis' },
  { key: 'sorvetes', sectionId: 'cardapio-sorvetes', label: 'Sorvetes' },
];

// ============================================================================
// ITENS EDITÁVEIS — LANCHES, PASTÉIS E SORVETES
// Deixe `imagem: ''` para exibir o ícone da categoria em círculo laranja,
// ou informe o import/URL da foto para trocar facilmente por imagem real.
// ============================================================================

const LANCHES_ITENS: MenuItem[] = [
  {
    id: 'lanche-xburger',
    category: 'lanches',
    nome: 'X-Burger',
    descricao: 'Hambúrguer artesanal suculento na chapa, queijo derretido e molho especial no pão macio.',
    preco: 'R$ 22,90',
    destaque: 'Clássico',
    imagem: burgerClassicImg,
  },
  {
    id: 'lanche-xsalada',
    category: 'lanches',
    nome: 'X-Salada',
    descricao: 'Carne na chapa, queijo prato, alface crocante, tomate fresco, cebola roxa e maionese da casa.',
    preco: 'R$ 25,90',
    destaque: 'Mais pedido',
    imagem: burgerChickenImg,
  },
  {
    id: 'lanche-xbacon',
    category: 'lanches',
    nome: 'X-Bacon',
    descricao: 'Hambúrguer 150g, cheddar cremoso e fatias generosas de bacon crocante dourado na hora.',
    preco: 'R$ 29,90',
    destaque: 'Sucesso',
    imagem: burgerBaconImg,
  },
  {
    id: 'lanche-xtudo',
    category: 'lanches',
    nome: 'X-Tudo',
    descricao: 'Completo de verdade: carne, bacon, ovo na chapa, presunto, queijo, milho, batata palha e salada.',
    preco: 'R$ 34,90',
    imagem: '',
  },
  {
    id: 'lanche-hotdog',
    category: 'lanches',
    nome: 'Hot Dog Prensado',
    descricao: 'Duas salsichas no molho caseiro, purê cremoso, vinagrete fresco, cheddar e batata palha.',
    preco: 'R$ 19,90',
    imagem: '',
  },
  {
    id: 'lanche-misto',
    category: 'lanches',
    nome: 'Misto Quente Especial',
    descricao: 'Pão tostado na manteiga na chapa com presunto fatiado na hora e dobro de queijo derretido.',
    preco: 'R$ 14,90',
    imagem: '',
  },
];

const PASTEIS_DESTAQUE: MenuItem[] = [
  {
    id: 'pastel-carne',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Pastel de Carne',
    descricao: 'Massa crocante e sequinha com carne moída refogada no tempero da casa e toque de azeitona.',
    preco: 'R$ 14,90',
    destaque: 'Tradicional',
    imagem: pastelCarneImg,
  },
  {
    id: 'pastel-queijo',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Pastel de Queijo',
    descricao: 'Recheio generoso de muçarela derretida de ponta a ponta em massa dourada na hora.',
    preco: 'R$ 14,90',
    imagem: '',
  },
  {
    id: 'pastel-frango-catupiry',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Frango com Catupiry',
    descricao: 'Peito de frango desfiado bem temperado combinado com requeijão cremoso autêntico.',
    preco: 'R$ 16,90',
    destaque: 'Campeão',
    imagem: pastelFrangoImg,
  },
  {
    id: 'pastel-pizza',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Pastel de Pizza',
    descricao: 'Muçarela derretida, presunto fatiado, tomate fresco em cubos e orégano perfumado.',
    preco: 'R$ 15,90',
    imagem: '',
  },
  {
    id: 'pastel-calabresa',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Calabresa ou Palmito',
    descricao: 'Escolha entre calabresa acebolada com queijo ou palmito cremoso macio bem temperado.',
    preco: 'R$ 16,90',
    imagem: '',
  },
  {
    id: 'pastel-doce',
    category: 'pasteis',
    subgrupo: 'Doces',
    nome: 'Pastéis Doces',
    descricao: 'Massa crocante nos sabores Chocolate ao leite, Banana com Canela ou Romeu e Julieta.',
    preco: 'R$ 15,90',
    destaque: 'Sobremesa',
    imagem: '',
  },
];

const PASTEIS_TODOS: MenuItem[] = [
  {
    id: 'pastel-carne-all',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Pastel de Carne',
    descricao: 'Carne moída suculenta refogada na hora com temperos frescos.',
    preco: 'R$ 14,90',
    destaque: 'Salgado',
    imagem: pastelCarneImg,
  },
  {
    id: 'pastel-queijo-all',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Pastel de Queijo',
    descricao: 'Muçarela fatiada derretida de ponta a ponta.',
    preco: 'R$ 14,90',
    destaque: 'Salgado',
    imagem: '',
  },
  {
    id: 'pastel-frango-all',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Frango com Catupiry',
    descricao: 'Frango desfiado cremoso com requeijão autêntico.',
    preco: 'R$ 16,90',
    destaque: 'Salgado',
    imagem: pastelFrangoImg,
  },
  {
    id: 'pastel-pizza-all',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Pastel de Pizza',
    descricao: 'Muçarela, presunto, tomate fresco e orégano.',
    preco: 'R$ 15,90',
    destaque: 'Salgado',
    imagem: '',
  },
  {
    id: 'pastel-calabresa-all',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Pastel de Calabresa',
    descricao: 'Calabresa ralada dourada na chapa com queijo derretido.',
    preco: 'R$ 16,90',
    destaque: 'Salgado',
    imagem: '',
  },
  {
    id: 'pastel-palmito-all',
    category: 'pasteis',
    subgrupo: 'Salgados',
    nome: 'Pastel de Palmito',
    descricao: 'Palmito picado em creme suave com toque de salsinha.',
    preco: 'R$ 16,90',
    destaque: 'Salgado',
    imagem: '',
  },
  {
    id: 'pastel-chocolate-all',
    category: 'pasteis',
    subgrupo: 'Doces',
    nome: 'Pastel de Chocolate',
    descricao: 'Recheio cremoso de chocolate ao leite derretido.',
    preco: 'R$ 15,90',
    destaque: 'Doce',
    imagem: '',
  },
  {
    id: 'pastel-banana-all',
    category: 'pasteis',
    subgrupo: 'Doces',
    nome: 'Banana com Canela',
    descricao: 'Banana caramelizada macia com açúcar e canela.',
    preco: 'R$ 14,90',
    destaque: 'Doce',
    imagem: '',
  },
  {
    id: 'pastel-romeu-all',
    category: 'pasteis',
    subgrupo: 'Doces',
    nome: 'Romeu e Julieta',
    descricao: 'Goiabada cremosa derretida com queijo branco suave.',
    preco: 'R$ 15,90',
    destaque: 'Doce',
    imagem: '',
  },
];

const SORVETES_ITENS: MenuItem[] = [
  {
    id: 'sorvete-casquinha',
    category: 'sorvetes',
    nome: 'Casquinha',
    descricao: 'Sorvete cremoso de baunilha, chocolate ou misto na casquinha crocante com cobertura.',
    preco: 'R$ 8,90',
    destaque: 'Queridinha',
    imagem: sorveteCasquinhaImg,
  },
  {
    id: 'sorvete-copinho',
    category: 'sorvetes',
    nome: 'Copinho',
    descricao: 'Duas bolas artesanais bem servidas com calda quente e farofa crocante de amendoim.',
    preco: 'R$ 12,90',
    imagem: '',
  },
  {
    id: 'sorvete-sundae',
    category: 'sorvetes',
    nome: 'Sundae',
    descricao: 'Sorvete cremoso na taça com morangos frescos, calda de chocolate, wafer e amendoim.',
    preco: 'R$ 17,90',
    destaque: 'Mais pedido',
    imagem: sorveteSundaeImg,
  },
  {
    id: 'sorvete-milkshake',
    category: 'sorvetes',
    nome: 'Milk-shake',
    descricao: 'Batido na hora (400ml) nos sabores chocolate, morango, creme ou ovo maltine com chantilly.',
    preco: 'R$ 19,90',
    imagem: '',
  },
  {
    id: 'sorvete-bananasplit',
    category: 'sorvetes',
    nome: 'Banana Split',
    descricao: 'Banana fresca, três bolas de sorvete, caldas variadas, chantilly leve e cereja.',
    preco: 'R$ 24,90',
    destaque: 'Para dividir',
    imagem: '',
  },
  {
    id: 'sorvete-picole',
    category: 'sorvetes',
    nome: 'Picolé Artesanal',
    descricao: 'Sabores naturais de frutas refrescantes e versões cremosas recheadas ao leite.',
    preco: 'R$ 6,50',
    imagem: '',
  },
];

export const CATEGORY_BLOCKS: CategoryBlockConfig[] = [
  {
    key: 'lanches',
    sectionId: 'cardapio-lanches',
    label: 'Lanches',
    kicker: 'Chapa quente na hora',
    tituloInicio: 'LANCHES',
    tituloDestaque: 'ARTESANAIS',
    frase: 'Do clássico X-Burger e Hot Dog ao X-Tudo caprichado: pão macio selado na chapa, queijo derretido e preparo feito na hora.',
    imagemPrincipal: burgerClassicImg,
    imagemAlt: 'Lanche artesanal suculento com queijo derretido e vegetais frescos',
    seloImagem: 'Chapa quente',
    layoutLado: 'left',
    theme: 'cream',
    bgHex: '#FFF4E6',
    itensDestaque: LANCHES_ITENS,
    todosItens: LANCHES_ITENS,
  },
  {
    key: 'pasteis',
    sectionId: 'cardapio-pasteis',
    label: 'Pastéis',
    kicker: 'Massa sequinha e recheada',
    tituloInicio: 'PASTÉIS GRANDES',
    tituloDestaque: 'E CROCANTES',
    frase: 'Fritos na hora com massa leve e recheio generoso de ponta a ponta — opções salgadas tradicionais e doces irresistíveis.',
    imagemPrincipal: pastelFrangoImg,
    imagemAlt: 'Pastel grande dourado e crocante servido com papel xadrez',
    seloImagem: 'Salgados & Doces',
    layoutLado: 'right',
    theme: 'yellow',
    bgHex: '#FFE9B0',
    itensDestaque: PASTEIS_DESTAQUE,
    todosItens: PASTEIS_TODOS,
  },
  {
    key: 'sorvetes',
    sectionId: 'cardapio-sorvetes',
    label: 'Sorvetes',
    kicker: 'Cremosidade e frescor',
    tituloInicio: 'SORVETES E',
    tituloDestaque: 'SOBREMESAS',
    frase: 'Para refrescar o dia ou fechar o pedido com doçura: casquinhas, sundaes montados, milk-shakes geladinhos e banana split.',
    imagemPrincipal: sorveteSundaeImg,
    imagemAlt: 'Taça sundae cremosa com morangos frescos e calda de chocolate',
    seloImagem: 'Gelado na hora',
    layoutLado: 'left',
    theme: 'petrol',
    bgHex: '#1C2B39',
    itensDestaque: SORVETES_ITENS,
    todosItens: SORVETES_ITENS,
  },
];

export const COMBOS: ComboItem[] = [
  {
    id: 'combo-completo',
    nome: 'Combo Lanche + Pastel + Sorvete',
    itens: '1 X-Burger ou X-Salada + 1 Pastel Grande (Carne ou Queijo) + 1 Casquinha Cremosa',
    preco: 'R$ 42,90',
    precoAntigo: 'R$ 51,00',
    imagem: comboFamiliaImg,
    categoryIcon: 'lanches',
  },
  {
    id: 'combo-dupla',
    nome: 'Combo Dupla',
    itens: '2 Pastéis Grandes Salgados à sua escolha + 2 Refrigerantes Lata 350ml bem gelados',
    preco: 'R$ 36,90',
    precoAntigo: 'R$ 44,00',
    imagem: pastelCarneImg,
    categoryIcon: 'pasteis',
  },
  {
    id: 'combo-sobremesa',
    nome: 'Combo Sobremesa',
    itens: '1 Taça Sundae de Morango ou Chocolate + 1 Pastel Doce quentinho (Chocolate, Banana ou Romeu e Julieta)',
    preco: 'R$ 29,90',
    precoAntigo: 'R$ 35,00',
    imagem: sorveteSundaeImg,
    categoryIcon: 'sorvetes',
  },
  {
    id: 'combo-familia',
    nome: 'Combo Família',
    itens: '2 Lanches Artesanais + 2 Pastéis Grandes + 2 Copinhos de Sorvete + 1 Refrigerante 2L',
    preco: 'R$ 94,90',
    precoAntigo: 'R$ 114,00',
    imagem: '',
    categoryIcon: 'lanches',
  },
];

export const SOBRE_CONTEUDO = {
  titulo: 'Lanches, pastéis e sorvetes com sabor de encontro em família',
  assinatura: 'Sabor de verdade, feito na hora',
  paragrafos: [
    'Nascemos com a proposta de reunir os três clássicos favoritos da vizinhança no mesmo lugar: lanches selados na chapa, pastéis grandes fritos na hora com massa sequinha e sorvetes cremosos servidos bem gelados.',
    'Preparamos cada pedido do zero com ingredientes frescos, recheios generosos e embalagem caprichada — seja para saborear no nosso balcão ou receber tudo no ponto certo em casa.',
  ],
  destaques: [
    { valor: '3', legenda: 'Especialidades preparadas na hora' },
    { valor: '+20', legenda: 'Opções entre lanches, pastéis e sorvetes' },
    { valor: '30 min', legenda: 'Média de entrega local' },
  ],
  imagem: sobreLanchoneteImg,
};

// Galeria equilibrada: exatamente 2 fotos de cada categoria
export const GALERIA_FOTOS: GalleryItem[] = [
  {
    id: 'gal-lanche-1',
    titulo: 'X-Burger & X-Salada na Chapa',
    categoria: 'Lanches',
    imagem: burgerClassicImg,
  },
  {
    id: 'gal-pastel-1',
    titulo: 'Pastel de Carne e Queijo Crocante',
    categoria: 'Pastéis',
    imagem: pastelCarneImg,
  },
  {
    id: 'gal-sorvete-1',
    titulo: 'Casquinha Cremosa com Calda',
    categoria: 'Sorvetes',
    imagem: sorveteCasquinhaImg,
  },
  {
    id: 'gal-lanche-2',
    titulo: 'X-Bacon Crocante Artesanal',
    categoria: 'Lanches',
    imagem: burgerBaconImg,
  },
  {
    id: 'gal-pastel-2',
    titulo: 'Pastel Frango com Catupiry',
    categoria: 'Pastéis',
    imagem: pastelFrangoImg,
  },
  {
    id: 'gal-sorvete-2',
    titulo: 'Taça Sundae com Morangos',
    categoria: 'Sorvetes',
    imagem: sorveteSundaeImg,
  },
];

// Depoimentos equilibrados: 1 sobre pastel, 1 sobre lanche, 1 sobre sorvete
export const DEPOIMENTOS: TestimonialItem[] = [
  {
    id: 'dep-1',
    nome: 'Mariana Costa',
    bairro: 'Centro',
    produto: 'Pastéis',
    estrelas: 5,
    comentario:
      'O pastel chega super sequinho, gigante e muito recheado! O de Frango com Catupiry e o doce de Banana com Canela são nossos favoritos de sexta.',
  },
  {
    id: 'dep-2',
    nome: 'Rafael Oliveira',
    bairro: 'Vila Nova',
    produto: 'Lanches',
    estrelas: 5,
    comentario:
      'Pedi um X-Bacon e um Hot Dog Prensado para a família e vieram quentinhos na medida. Pão macio, carne suculenta e atendimento muito ágil.',
  },
  {
    id: 'dep-3',
    nome: 'Camila Ferreira',
    bairro: 'Jardim Esperança',
    produto: 'Sorvetes',
    estrelas: 5,
    comentario:
      'O Sundae e o Milk-shake chegaram bem gelados e cremosos, sem derreter! Virou parada obrigatória no calor e nas noites de fim de semana.',
  },
];

// ============================================================================
// DESTAQUES & COMBOS DA HOME ENXUTA (ordem alternada: lanche, pastel, sorvete)
// ============================================================================
export const HOME_HIGHLIGHTS: HomeHighlightItem[] = [
  {
    id: 'home-hl-1',
    category: 'lanches',
    etiqueta: 'Lanche',
    nome: 'X-Burger Artesanal',
    descricao: 'Carne na chapa, queijo derretido e pão brioche macio.',
    precoApartir: 'A partir de R$ 22,90',
    imagem: burgerClassicImg,
  },
  {
    id: 'home-hl-2',
    category: 'pasteis',
    etiqueta: 'Pastel',
    nome: 'Pastel de Carne',
    descricao: 'Massa crocante e sequinha com carne temperada na hora.',
    precoApartir: 'A partir de R$ 14,90',
    imagem: pastelCarneImg,
  },
  {
    id: 'home-hl-3',
    category: 'sorvetes',
    etiqueta: 'Sorvete',
    nome: 'Casquinha com Calda',
    descricao: 'Sorvete cremoso na casquinha crocante com calda quente.',
    precoApartir: 'A partir de R$ 8,90',
    imagem: sorveteCasquinhaImg,
  },
  {
    id: 'home-hl-4',
    category: 'lanches',
    etiqueta: 'Lanche',
    nome: 'X-Bacon',
    descricao: 'Blend bovino 150g, cheddar cremoso e bacon crocante.',
    precoApartir: 'A partir de R$ 29,90',
    imagem: burgerBaconImg,
  },
  {
    id: 'home-hl-5',
    category: 'pasteis',
    etiqueta: 'Pastel',
    nome: 'Pastel de Queijo com Catupiry',
    descricao: 'Muçarela derretida combinada com catupiry cremoso autêntico.',
    precoApartir: 'A partir de R$ 15,90',
    imagem: pastelFrangoImg,
  },
  {
    id: 'home-hl-6',
    category: 'sorvetes',
    etiqueta: 'Sorvete',
    nome: 'Milk-shake',
    descricao: 'Batido na hora em sabores cremosos com cobertura especial.',
    precoApartir: 'A partir de R$ 19,90',
    imagem: '',
  },
];

export const HOME_COMBOS: ComboItem[] = [
  {
    id: 'home-combo-lanche',
    nome: 'Lanche + Refri',
    itens: '1 X-Burger Artesanal ou X-Salada na chapa + 1 Refrigerante Lata 350ml bem gelado.',
    preco: 'R$ 26,90',
    precoAntigo: 'R$ 30,50',
    imagem: burgerClassicImg,
    categoryIcon: 'lanches',
  },
  {
    id: 'home-combo-pasteis',
    nome: 'Dupla de Pastéis',
    itens: '2 Pastéis Grandes Salgados à sua escolha + 1 Refrigerante 600ml para dividir.',
    preco: 'R$ 34,90',
    precoAntigo: 'R$ 41,00',
    imagem: pastelCarneImg,
    categoryIcon: 'pasteis',
  },
  {
    id: 'home-combo-sobremesa',
    nome: 'Sobremesa Gelada',
    itens: '1 Taça Sundae ou Milk-shake 400ml + 1 Pastel Doce quentinho feito na hora.',
    preco: 'R$ 29,90',
    precoAntigo: 'R$ 35,00',
    imagem: sorveteSundaeImg,
    categoryIcon: 'sorvetes',
  },
];

