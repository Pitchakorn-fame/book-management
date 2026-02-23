import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import type { IBook } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBook(@Body() newBook: CreateBookDto): IBook {
    return this.bookService.createBook(newBook);
  }

  @Get()
  getBooks(): { data: IBook[] } {
    return this.bookService.getBooks();
  }

  @Get(':id')
  getBookById(@Param('id', ParseIntPipe) id: number): IBook {
    const book = this.bookService.getBookById(String(id));
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
