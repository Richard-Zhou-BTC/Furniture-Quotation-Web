export enum Language {
  ZH = 'zh',
  EN = 'en',
  FR = 'fr',
  ES = 'es',
  JA = 'ja'
}

export enum Style {
  ALL = 'ALL',
  SIMPLE_EURO = 'SIMPLE_EURO',
  MODERN = 'MODERN',
  AMERICAN = 'AMERICAN',
  NEW_CHINESE = 'NEW_CHINESE',
  FRENCH = 'FRENCH',
  OTHER = 'OTHER'
}

export enum ItemType {
  ALL = 'ALL',
  SOFA = 'SOFA',
  BED = 'BED',
  DINING_TABLE = 'DINING_TABLE',
  COFFEE_TABLE = 'COFFEE_TABLE',
  DINING_CHAIR = 'DINING_CHAIR',
  LEISURE_CHAIR = 'LEISURE_CHAIR',
  DESK_CHAIR = 'DESK_CHAIR',
  STOOL = 'STOOL',
  SIDEBOARD = 'SIDEBOARD',
  WINE_CABINET = 'WINE_CABINET',
  BOOKCASE = 'BOOKCASE',
  WARDROBE = 'WARDROBE',
  LIVING_ROOM_CABINET = 'LIVING_ROOM_CABINET',
  CHEST = 'CHEST',
  ENTRANCE_CABINET = 'ENTRANCE_CABINET',
  DESK = 'DESK',
  DRESSING_TABLE = 'DRESSING_TABLE',
  NIGHTSTAND = 'NIGHTSTAND',
  DECOR = 'DECOR',
  OTHER = 'OTHER'
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  nameFr?: string;
  nameEs?: string;
  nameJa?: string;
  style: Style;
  type: ItemType;
  image: string;
  description: string;
  descriptionEn?: string;
  descriptionFr?: string;
  descriptionEs?: string;
  descriptionJa?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface QuoteRecord {
  id: string;
  timestamp: number;
  items: CartItem[];
  totalQuantity: number;
}