import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsOptional,
    IsDecimal,
    IsDateString,
    IsEnum,
    Min,
} from 'class-validator';

export enum ExpenseType {
    CASH = 'cash',
    CARD = 'card',
    BANK = 'bank',
}

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @Min(1)
    amount: number;

    @IsEnum(ExpenseType)
    type: ExpenseType;

    @IsOptional()
    @IsDateString()
    expenseDate?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;
}