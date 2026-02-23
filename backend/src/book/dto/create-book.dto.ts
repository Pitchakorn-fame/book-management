/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{13}$/, {
    message: 'isbn must be exactly 13 digits (numbers only)',
  })
  isbn: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @Min(1, { message: 'book qty must be greater than 0' })
  qty: number;
}
