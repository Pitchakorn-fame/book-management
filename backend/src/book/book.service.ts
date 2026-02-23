import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  IBook,
  ICreateBook,
  Status,
  TUpdateBook,
} from './entities/book.entity';

@Injectable()
export class BookService {
  private book: IBook[] = [];

  createBook(newbook: ICreateBook): IBook {
    const isIsbnDuplicate = this.book.find(
      (book) => book.isbn === newbook.isbn,
    );
    if (isIsbnDuplicate) {
      throw new BadRequestException('This ISBN already exist');
    }
    const adjustNewBook = {
      ...newbook,
      id: String(this.book.length + 1),
      created_at: new Date(),
      updated_at: new Date(),
      status: Status.ACTIVE,
    };

    this.book.push(adjustNewBook);
    return adjustNewBook;
  }

  getBooks(): { data: IBook[] } {
    return { data: [...this.book] };
  }

  getBookById(id: string): IBook | null {
    const book = this.book.find((book) => book.id === id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  updateBook(id: string, updateBook: TUpdateBook): IBook {
    const indexForUpdate = this.book.findIndex((book) => book.id === id);
    if (indexForUpdate === -1) throw new NotFoundException('Book not found');

    const oldBookInfo = this.book[indexForUpdate];

    const updateBookData: IBook[] = [...this.book];

    const updateBookInfo = {
      ...oldBookInfo,
      ...updateBook,
      updated_at: new Date(),
    };

    updateBookData[indexForUpdate] = updateBookInfo;
    this.book = updateBookData;

    return { ...updateBookInfo };
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
