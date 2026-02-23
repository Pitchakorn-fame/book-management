import { z } from "zod";
export const addNewBookFormSchema = z.object({
  isbn: z.string().min(13, { message: "ISBN must be 13 digits" }),
  category: z.string().min(1, { message: "Category is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  qty: z.number().min(1, { message: "Quantity is required" }),
});

export type AddNewBookForm = z.infer<typeof addNewBookFormSchema>;

export const ADD_NEW_BOOK_DEFAULT_VALUES: AddNewBookForm = {
  isbn: "",
  category: "",
  title: "",
  author: "",
  qty: 0,
};
