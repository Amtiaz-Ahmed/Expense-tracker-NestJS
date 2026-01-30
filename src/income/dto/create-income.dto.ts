import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsEnum,
    Min,
    IsDateString,
} from 'class-validator';

export enum IncomeSource {
    SALARY = 'salary',
    BUSINESS = 'business',
    FREELANCE = 'freelance',
    OTHER = 'other'
}

export class CreateIncomeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @Min(1)
    amount: number;

    @IsEnum(IncomeSource)
    source: IncomeSource;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsOptional()
    @IsString()
    desccription?: string;

    @IsOptional()
    @IsDateString()
    incomeDate?: string;
}
