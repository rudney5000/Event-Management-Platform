export interface Event {
  id: number;
  title: string;
  date: string;
  city: string;
  address: string;
  priceType: "free" | "paid";
  price?: number;
  status: "draft" | "published";
  priority: 1 | 2 | 3;
}
