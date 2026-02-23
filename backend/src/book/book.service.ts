import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBook, ICreateBook, Status } from './entities/book.entity';

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

  update(id: number, updateBookDto: UpdateBookDto) {
    console.info(updateBookDto);
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
