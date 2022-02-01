import { LooseDictionary } from 'quasar/dist/types/ts-helpers';

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
  filterType?: string;
}

export interface Actor {
  name: string;
  family: string;
  rarity: string;
  size: string;
  type: string;
  traits: string[];
  level: number;
  xp?: number;
}

export interface SelectedActor extends Actor {
  id: string;
  count: number;
  xpTotal?: number;
}

export interface PartyMember {
  id: string;
  name: string;
  level: number | string;
}


export interface Filters {
  name: string | null;
  family: string[] | null;
  rarity: string[] | null;
  size: string[] | null;
  type: string[] | null;
  traits: string[] | null;
  level: { min: number; max: number };
}
