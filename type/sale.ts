import { Shop } from '@/type/shop';


export type Sale = {
  id: string,
  discount: number,
  sub_total: number,
  grand_total: number,
  nb_articles: number,
  shop: Shop,
  created_at: Date
};
