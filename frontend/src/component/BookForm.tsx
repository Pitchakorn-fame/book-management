import { Icon } from "@iconify/react";
import { IBook, Status } from "../../constant/book-management";
import TextInputField from "./form/TextInputField";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  ADD_NEW_BOOK_DEFAULT_VALUES,
  AddNewBookForm,
  addNewBookFormSchema,
} from "@/schema/add-new-book";

import { zodResolver } from "@hookform/resolvers/zod";
interface IBookFormProps {
  onCloseModal: () => void;
  onAddNewBook: (book: IBook) => void;
  updateBookInfo?: IBook | null;
  bookData: IBook[];
  onUpdateBook: (book: IBook) => void;
}

const BookForm = (props: IBookFormProps) => {
  const updateBookInfo = props.updateBookInfo;
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<AddNewBookForm>({
    defaultValues: updateBookInfo
      ? {
          isbn: updateBookInfo.isbn,
          category: updateBookInfo.category,
          title: updateBookInfo.title,
          author: updateBookInfo.author,
          qty: String(updateBookInfo.qty),
        }
      : ADD_NEW_BOOK_DEFAULT_VALUES,
    resolver: zodResolver(addNewBookFormSchema),
  });

  const onSubmit: SubmitHandler<AddNewBookForm> = (values: AddNewBookForm) => {
    const adjustNewBookData: IBook = {
      isbn: values.isbn,
      category: values.category,
      title: values.title,
      author: values.author,
      qty: Number(values.qty),
      status: Status.ACTIVE,
    };

    const isIsbnDuplicate = props.bookData.find(
      (book) => book.isbn === values.isbn
    );
    if (isIsbnDuplicate && !updateBookInfo) {
      setError("isbn", {
        type: "custom",
        message: "Duplicate ISBN",
      });
      return;
    }

    if (!updateBookInfo) {
      props.onAddNewBook(adjustNewBookData);
    } else {
      props.onUpdateBook(adjustNewBookData);
    }
    props.onCloseModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 z-50 bg-white rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 border border-[#FF7F50]"
    >
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          {!!updateBookInfo ? "Update book" : "Add Book"}
        </div>
        <div className="font-bold cursor-pointer" onClick={props.onCloseModal}>
          <Icon icon="mingcute:close-fill" className="text-2xl" />
        </div>
      </div>
      <TextInputField
        id="isbn"
        {...register("isbn")}
        label="ISBN"
        placeholder="Enter ISBN e.g. 8503957483002"
        maxLength={13}
        required
        errorMessage={errors.isbn?.message}
        disable={!!updateBookInfo}
      />
      <TextInputField
        id="category"
        label="Category"
        {...register("category")}
        placeholder="Enter category e.g. Fiction"
        required
        errorMessage={errors.category?.message}
      />
      <TextInputField
        id="title"
        label="Book title"
        {...register("title")}
        placeholder="Enter Book title e.g. The Hunger game"
        required
        errorMessage={errors.title?.message}
      />
      <TextInputField
        id="author"
        label="Author"
        {...register("author")}
        placeholder="Enter Author e.g. Suzanne Collins"
        required
        errorMessage={errors.author?.message}
      />
      <TextInputField
        id="qty"
        label="Book quantity"
        {...register("qty")}
        placeholder="Book quantity must be at least 1"
        required
        errorMessage={errors.qty?.message}
      />
      <div className="flex gap-2 justify-end font-bold">
        <button
          onClick={props.onCloseModal}
          className="border border-[#FF7F50] p-2 rounded-2xl w-25 cursor-pointer h-fit"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#FF7F50] text-white p-2 rounded-2xl w-25 cursor-pointer h-fit"
        >
          {!!updateBookInfo ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
