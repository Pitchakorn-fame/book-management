import { Icon } from "@iconify/react";
import { IBook, Status } from "../../constant/book-management";

interface IBookListProps {
  booksList: IBook[];
  onUpdateBookInfo: (book: IBook) => void;
}

const BookList = (props: IBookListProps) => {
  const tableData = props.booksList;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#000]">
      <div className="h-full overflow-y-auto">
        <table className="w-full border-collapse overflow-scroll">
          <thead className="bg-[#FF7F50] sticky top-0">
            <tr>
              <th className="p-4 w-[5%] text-center">No.</th>
              <th className="p-4 w-[15%] text-left">ISBN</th>
              <th className="p-4 w-[15%] text-left">Catagory</th>
              <th className="p-4 w-[20%] text-left">name</th>
              <th className="p-4 w-[15%] text-left">Author</th>
              <th className="p-4 w-[10%] text-left">Status</th>
              <th className="p-4 w-[15%] text-left">{}</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {tableData.length > 0 &&
              tableData.map((book, index) => (
                <tr key={book.isbn}>
                  <td className="p-4 text-center">{index + 1}</td>
                  <td className="p-4">{book.isbn}</td>
                  <td className="p-4">{book.category}</td>
                  <td className="p-4 truncate">{book.title}</td>
                  <td className="p-4 truncate">{book.author}</td>
                  <td className="p-4">{book.status}</td>
                  <td
                    className={`p-4 flex gap-2 items-center ${
                      book.status === Status.INACTIVE
                        ? "pointer-events-none"
                        : {}
                    }`}
                  >
                    <Icon
                      icon="ci:info"
                      className={`text-2xl cursor-not-allowed text-blue-600`}
                    />
                    <Icon
                      icon="boxicons:edit"
                      className={`text-2xl cursor-pointer ${
                        book.status === Status.INACTIVE ? "text-[#E5E4E2]" : {}
                      } `}
                      onClick={() => props.onUpdateBookInfo(book)}
                    />
                    <Icon
                      icon="material-symbols:delete-outline-rounded"
                      className={`text-2xl cursor-not-allowed ${
                        book.status === Status.INACTIVE
                          ? "text-[#E5E4E2]"
                          : "text-red-500"
                      } `}
                    />
                  </td>
                </tr>
              ))}

            {tableData.length === 0 && (
              <tr className="w-fit overflow-hidden">
                <th colSpan={7} className="p-4 w-full text-2xl">
                  No book found
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
