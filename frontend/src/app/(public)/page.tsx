"use client";
import { useMemo, useState } from "react";

import BookList from "@/component/BookList";

import { IBook, mockupBookData } from "../../../constant/book-management";
import Sidebar from "@/component/Sidebar";
import BookForm from "@/component/BookForm";
import SearchBar from "@/component/SearchBar";

const Page = () => {
  const [bookData, setBookData] = useState<IBook[]>(mockupBookData);
  const [updateBookInfo, setUpdateBookInfo] = useState<IBook | null>(null);

  const [searchText, setSearchText] = useState<string>("");

  const [isOpenBookActionModal, setIsOpenBookActionModal] =
    useState<boolean>(false);

  const filterBookData = useMemo(() => {
    const searchTextLowerCase = searchText.toLowerCase();

    return bookData.filter(
      (book) =>
        book.isbn.includes(searchTextLowerCase) ||
        book.category.includes(searchTextLowerCase) ||
        book.author.includes(searchTextLowerCase) ||
        book.title.includes(searchTextLowerCase)
    );
  }, [searchText, bookData]);

  const handleAddNewBook = (book: IBook) => {
    setBookData((prevBooks) => [book, ...prevBooks]);
  };

  const updateBookData = (book: IBook) => {
    setUpdateBookInfo(book);
    setIsOpenBookActionModal(true);
  };

  const handleUpdateBook = (updateBook: IBook) => {
    const indexForUpdate = bookData.findIndex(
      (book) => book.isbn === updateBook.isbn
    );
    const updateBookData = [...bookData];

    updateBookData[indexForUpdate] = updateBook;
    setBookData(updateBookData);
  };

  const handleCloseBookActionModal = () => {
    setUpdateBookInfo(null);
    setIsOpenBookActionModal(false);
  };

  return (
    <>
      <div
        className={`grid grid-cols-[auto_1fr] h-screen relative ${
          isOpenBookActionModal ? "opacity-65 pointer-events-none" : ""
        }`}
      >
        <Sidebar />
        <div className="flex flex-col gap-8 p-6 overflow-hidden">
          <div className="text-3xl font-bold">Book Management System</div>
          <div className="grid grid-cols-[1fr_auto] gap-6 w-full h-fit">
            <SearchBar
              searchValue={searchText}
              onChangeFunction={(value: string) => {
                setSearchText(value);
              }}
            />
            <button
              className="flex justify-center items-center p-4 h-12 rounded-2xl border border-[#FF7F50] cursor-pointer hover:bg-[#FF7F50] hover:text-[#FFF] font-bold w-50"
              onClick={() => setIsOpenBookActionModal(true)}
            >
              Add book
            </button>
          </div>
          <BookList
            booksList={filterBookData}
            onUpdateBookInfo={updateBookData}
          />
        </div>
      </div>
      {isOpenBookActionModal && (
        <BookForm
          onCloseModal={handleCloseBookActionModal}
          onAddNewBook={handleAddNewBook}
          updateBookInfo={updateBookInfo}
          bookData={bookData}
          onUpdateBook={handleUpdateBook}
        />
      )}
    </>
  );
};

export default Page;
