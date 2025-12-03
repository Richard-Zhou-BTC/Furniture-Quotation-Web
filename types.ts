export enum Style {
  ALL = '全部风格',
  SIMPLE_EURO = '简欧系列',
  MODERN = '现代风格',
  AMERICAN = '美式风格',
  NEW_CHINESE = '新中式风格',
  FRENCH = '法式风格',
  OTHER = '其他'
}

export enum ItemType {
  ALL = '全部品类',
  SOFA = '沙发',
  BED = '床',
  DINING_TABLE = '餐桌',
  COFFEE_TABLE = '茶几/角几',
  
  DINING_CHAIR = '餐椅',
  LEISURE_CHAIR = '休闲椅',
  DESK_CHAIR = '书椅',
  STOOL = '凳子',
  
  SIDEBOARD = '餐边柜',
  WINE_CABINET = '酒柜',
  BOOKCASE = '书柜/书架',
  WARDROBE = '衣柜',
  LIVING_ROOM_CABINET = '厅柜/地柜',
  CHEST = '斗柜',
  ENTRANCE_CABINET = '玄关柜',
  
  DESK = '书桌',
  DRESSING_TABLE = '梳妆台',
  NIGHTSTAND = '床头柜',
  
  DECOR = '摆件',
  OTHER = '其他'
}

export interface Product {
  id: string;
  name: string;
  style: Style;
  type: ItemType;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderSummaryData {
  items: CartItem[];
  aiAdvice?: string;
}