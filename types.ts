export enum Style {
  ALL = '全部风格',
  MODERN = '现代风格',
  AMERICAN = '美式风格',
  NEW_CHINESE = '新中式风格',
  SIMPLE_EURO = '简欧风格',
  FRENCH = '法式风格',
  OTHER = '其他'
}

export enum ItemType {
  ALL = '全部品类',
  SOFA = '沙发',
  BED = '床',
  TABLE = '桌子',
  NIGHTSTAND = '床头柜',
  DINING_TABLE = '餐桌',
  CHAIR = '椅子',
  CABINET = '柜子',
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