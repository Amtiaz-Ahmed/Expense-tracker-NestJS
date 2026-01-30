import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsOptional,
    IsDateString,
    Min,
} from 'class-validator';

export class CreateExpenseDto {

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @Min(0.01)
    amount: number;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}