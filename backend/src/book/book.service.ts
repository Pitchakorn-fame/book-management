import { BadRequestException, Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    console.info(updateBookDto);
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
