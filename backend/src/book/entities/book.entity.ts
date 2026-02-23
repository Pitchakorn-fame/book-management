export class Book {}

export interface ICreateBook {
  isbn: string; //unique
  category: string;
  title: string;
  author: string;
  qty: number;
}

export interface IBaseModal {
  id: string;
  created_at: Date;
  updated_at: Date;
  status: Status;
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export interface IBook extends IBaseModal, ICreateBook {
  status: Status;
}

export type TUpdateBook = Omit<ICreateBook, 'isbn'>;
