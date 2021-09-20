export interface ProductItemType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  amount: number;
}

export type BasketData = {
  isLoading?: boolean;
  items: ProductItemType[];
  onAllItemsDeleted: () => void;
  onItemAdded: (id: string) => void;
  onItemDeleted: (id: string) => void;
}

export interface UserDetails {
  name?: string;
  email?: string;
  photoURL?: string;
  address?: string;
  state?: string;
  country?: string;
  zip?: string;
  birth?: string;
  phone?: string;
}
