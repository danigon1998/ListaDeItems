import { ListItem } from "./IProduto";

export interface Category {
    id: string;
    name: string;
    items: ListItem[];
  }