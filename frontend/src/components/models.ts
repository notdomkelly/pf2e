import { LooseDictionary } from 'quasar/dist/types/ts-helpers';

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Column {
  name: string;
  label: string;
  field: string | ((row: LooseDictionary) => never);
  required?: boolean;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: (
    a: never,
    b: never,
    rowA: LooseDictionary,
    rowB: LooseDictionary
  ) => number;
  sortOrder?: 'ad' | 'da';
  format?: (val: any, row: LooseDictionary) => any;
  style?: string | ((row: LooseDictionary) => string);
  classes?: string | ((row: LooseDictionary) => string);
  headerStyle?: string;
  headerClasses?: string;
}

export interface Actor {
  name: string;
  family: string;
  rarity: string;
  size: string;
  type: string;
  traits: string[];
  level: number;
}
