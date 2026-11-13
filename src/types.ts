export interface SiteConfig {
  nome: string;
  slogan: string;
  logo: string;
  cidade: string;
  telefone: string;
  whatsapp: string;
  instagram: string;
  ifood: string;
  linkPedidos: string;
  endereco: string;
  horarios: string;
}

export interface HeroSequenceConfig {
  dir: string;
  total: number;
  mode: 'fit-box' | 'fit-tall';
}

export interface HeroCfg {
  desktop: HeroSequenceConfig;
  mobile: HeroSequenceConfig;
}

export type MenuCategoryKey = 'lanches' | 'pasteis' | 'sorvetes';

export interface MenuItem {
  id: string;
  category: MenuCategoryKey;
  subgrupo?: 'Salgados' | 'Doces';
  nome: string;
  descricao: string;
  preco: string;
  destaque?: string;
  imagem: string;
}

export interface CategoryBlockConfig {
  key: MenuCategoryKey;
  sectionId: string;
  label: string;
  kicker: string;
  tituloInicio: string;
  tituloDestaque: string;
  frase: string;
  imagemPrincipal: string;
  imagemAlt: string;
  seloImagem: string;
  layoutLado: 'left' | 'right';
  theme: 'cream' | 'yellow' | 'petrol';
  bgHex: string;
  itensDestaque: MenuItem[];
  todosItens: MenuItem[];
}

export interface HomeHighlightItem {
  id: string;
  category: MenuCategoryKey;
  etiqueta: 'Lanche' | 'Pastel' | 'Sorvete';
  nome: string;
  descricao: string;
  precoApartir: string;
  imagem: string;
}

export interface ComboItem {
  id: string;
  nome: string;
  itens: string;
  preco: string;
  precoAntigo?: string;
  imagem: string;
  categoryIcon: MenuCategoryKey;
}

export interface GalleryItem {
  id: string;
  titulo: string;
  categoria: string;
  imagem: string;
}

export interface TestimonialItem {
  id: string;
  nome: string;
  bairro: string;
  produto: string;
  estrelas: number;
  comentario: string;
}
