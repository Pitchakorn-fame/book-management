import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { ICreateBook, Status } from './entities/book.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let service: BookService;
  const createBookPayload: ICreateBook = {
    isbn: '9780123456789',
    category: 'Fiction',
    title: 'Test Book',
    author: 'Test Author',
    qty: 5,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createBook', () => {
    it('should create a book with id, status ACTIVE, and timestamps', () => {
      const result = service.createBook(createBookPayload);

      expect(result).toMatchObject({
        isbn: createBookPayload.isbn,
        category: createBookPayload.category,
        title: createBookPayload.title,
        author: createBookPayload.author,
        qty: createBookPayload.qty,
        status: Status.ACTIVE,
      });
      expect(result.id).toBe('1');
      expect(result.created_at).toBeInstanceOf(Date);
      expect(result.updated_at).toBeInstanceOf(Date);
      expect(service.getBooks().data).toHaveLength(1);
    });

    it('should throw BadRequestException when ISBN already exists', () => {
      service.createBook(createBookPayload);
      expect(() => service.createBook(createBookPayload)).toThrow(
        BadRequestException,
      );
      expect(() => service.createBook(createBookPayload)).toThrow(
        'This ISBN already exist',
      );
    });
  });

  describe('getBooks', () => {
    it('should return empty data when no books', () => {
      expect(service.getBooks()).toEqual({ data: [] });
    });
  });

  describe('getBookById', () => {
    it('should return book when found', () => {
      const created = service.createBook(createBookPayload);
      const result = service.getBookById(created.id);
      expect(result).toEqual(created);
    });

    it('should throw NotFoundException when book does not exist', () => {
      expect(() => service.getBookById('999')).toThrow(NotFoundException);
      expect(() => service.getBookById('999')).toThrow('Book not found');
    });
  });

  describe('updateBook', () => {
    it('should update book and return updated book', () => {
      service.createBook(createBookPayload);
      const update = {
        category: 'Tech',
        title: 'Updated Title',
        author: 'New Author',
        qty: 10,
      };
      const result = service.updateBook('1', update);

      expect(result).toMatchObject(update);
      expect(result.id).toBe('1');
      expect(result.isbn).toBe(createBookPayload.isbn);
      expect(result.updated_at).toBeInstanceOf(Date);

      const fetched = service.getBookById('1');
      expect(fetched).toMatchObject(update);
    });

    it('should throw NotFoundException when book does not exist', () => {
      expect(() =>
        service.updateBook('999', {
          category: 'C',
          title: 'T',
          author: 'A',
          qty: 1,
        }),
      ).toThrow(NotFoundException);
      expect(() =>
        service.updateBook('999', {
          category: 'C',
          title: 'T',
          author: 'A',
          qty: 1,
        }),
      ).toThrow('Book not found');
    });
  });

  describe('removeBook', () => {
    it('should set status to INACTIVE (soft delete)', () => {
      service.createBook(createBookPayload);
      const result = service.removeBook('1');

      expect(result.status).toBe(Status.INACTIVE);
      expect(result.id).toBe('1');
      expect(result.updated_at).toBeInstanceOf(Date);

      const fetched = service.getBookById('1');
      expect(fetched?.status).toBe(Status.INACTIVE);
    });

    it('should throw NotFoundException when book does not exist', () => {
      expect(() => service.removeBook('999')).toThrow(NotFoundException);
      expect(() => service.removeBook('999')).toThrow('Book not found');
    });
  });
});
