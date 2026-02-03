// import {
//     IsString,
//     IsNotEmpty,
//     IsNumber,
//     IsOptional,
//     IsEnum,
//     Min,
//     IsDateString,
// } from 'class-validator';
// import { Type } from 'class-transformer';

// export enum IncomeSource {
//     SALARY = 'salary',
//     BUSINESS = 'business',
//     FREELANCE = 'freelance',
//     OTHER = 'other'
// }

// export class CreateIncomeDto {
//     @IsNumber({}, { message: 'Amount must be a number' })
//     @Min(1, { message: 'Amount must be at least 1' })
//     @Type(() => Number)
//     amount: number;

//     @IsEnum(IncomeSource, { message: 'Source must be valid (salary, business, freelance, other)' })
//     source: IncomeSource;

//     @IsNumber({}, { message: 'Category ID must be a number' })
//     @IsNotEmpty({ message: 'Category ID is required' })
//     @Type(() => Number)
//     categoryId: number;

//     @IsOptional()
//     @IsString({ message: 'Description must be a string' })
//     description?: string;

//     @IsOptional()
//     @IsDateString()
//     incomeDate: string;
// }


import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsEnum,
    Min,
    IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum IncomeSource {
    SALARY = 'salary',
    BUSINESS = 'business',
    FREELANCE = 'freelance',
    OTHER = 'other'
}

export class CreateIncomeDto {
    @IsNumber({}, { message: 'Amount must be a number' })
    @Min(1, { message: 'Amount must be at least 1' })
    @Type(() => Number)
    amount: number;

    @IsEnum(IncomeSource, { message: 'Source must be valid (salary, business, freelance, other)' })
    @IsNotEmpty({ message: 'Source is required' })
    source: IncomeSource;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsDateString()
    incomeDate?: string;
}