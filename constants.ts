import { Style, ItemType, Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '北欧极简三人沙发',
    style: Style.MODERN,
    type: ItemType.SOFA,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    description: '灰色布艺三人沙发，搭配橡木椅腿，适合现代简约家居。'
  },
  {
    id: '2',
    name: '深色实木办公桌',
    style: Style.AMERICAN,
    type: ItemType.TABLE,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    description: '宽敞的深色木质办公桌，配有充足的储物空间，彰显稳重。'
  },
  {
    id: '3',
    name: '轻奢丝绒休闲椅',
    style: Style.FRENCH,
    type: ItemType.CHAIR,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
    description: '蓝绿色丝绒材质，搭配镀金椅腿，尽显法式优雅。'
  },
  {
    id: '4',
    name: '新中式实木餐桌 (6人)',
    style: Style.NEW_CHINESE,
    type: ItemType.DINING_TABLE,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
    description: '保留天然木纹的实木餐桌，融合传统榫卯工艺与现代设计。'
  },
  {
    id: '5',
    name: '意式简约软包床',
    style: Style.MODERN,
    type: ItemType.BED,
    image: 'https://images.unsplash.com/photo-1505693416388-5094639a3694?auto=format&fit=crop&w=800&q=80',
    description: '低矮设计的平台床，配有舒适的软包靠背。'
  },
  {
    id: '6',
    name: '复古工业落地灯',
    style: Style.OTHER,
    type: ItemType.OTHER,
    image: 'https://images.unsplash.com/photo-1513506003011-38f04415426a?auto=format&fit=crop&w=800&q=80',
    description: '哑光黑色金属质感，高度可调节，适合阅读区。'
  },
  {
    id: '7',
    name: '胡桃木床头柜',
    style: Style.MODERN,
    type: ItemType.NIGHTSTAND,
    image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=800&q=80',
    description: '小巧精致的胡桃木饰面储物柜，配有黄铜拉手。'
  },
  {
    id: '8',
    name: '人体工学办公椅',
    style: Style.MODERN,
    type: ItemType.CHAIR,
    image: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=800&q=80',
    description: '高靠背网布设计，提供极佳的腰部支撑。'
  },
  {
    id: '9',
    name: '几何图案羊毛地毯',
    style: Style.MODERN,
    type: ItemType.OTHER,
    image: 'https://images.unsplash.com/photo-1575414003502-942740439466?auto=format&fit=crop&w=800&q=80',
    description: '手工簇绒羊毛地毯，现代几何图案设计。'
  },
  {
    id: '10',
    name: '大理石茶几',
    style: Style.SIMPLE_EURO,
    type: ItemType.TABLE,
    image: 'https://images.unsplash.com/photo-1612152605332-2e9500513d65?auto=format&fit=crop&w=800&q=80',
    description: '天然爵士白大理石台面，搭配金属几何底座。'
  },
  {
    id: '11',
    name: '米色布艺餐椅 (2把)',
    style: Style.SIMPLE_EURO,
    type: ItemType.CHAIR,
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80',
    description: '柔软舒适的米色布艺餐椅，适合简欧风格餐厅。'
  },
  {
    id: '12',
    name: '多层开放式书柜',
    style: Style.NEW_CHINESE,
    type: ItemType.CABINET,
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
    description: '五层开放式置物架，适合展示书籍和古玩摆件。'
  },
  {
    id: '13',
    name: '法式雕花玄关柜',
    style: Style.FRENCH,
    type: ItemType.CABINET,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    description: '精致的手工雕花工艺，浪漫的奶油色调。'
  },
  {
    id: '14',
    name: '真皮单人沙发',
    style: Style.AMERICAN,
    type: ItemType.SOFA,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80',
    description: '复古油蜡皮材质，宽大舒适的坐感。'
  }
];

export const STYLES = Object.values(Style);
export const ITEM_TYPES = Object.values(ItemType);