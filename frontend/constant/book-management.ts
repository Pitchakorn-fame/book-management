export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IBook {
  isbn: string;
  category: string;
  title: string;
  author: string;
  qty: number;
  status: Status;
}
export const mockupBookData: IBook[] = Array.from({ length: 10 }, (_, i) => {
  return {
    isbn: `${i + 1}`.repeat(13).slice(0, 13),
    category: `category ${i + 1}`,
    title: `title ${i + 1}`,
    author: `author ${i + 1}`,
    qty: i + 1,
    status: Status.ACTIVE,
  };
});
