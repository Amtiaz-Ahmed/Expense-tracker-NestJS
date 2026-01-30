import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsEnum,
} from 'class-validator';

export enum CategoryType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(CategoryType)
    type: CategoryType;

    @IsOptional()
    @IsString()
    icon?: string;

    @IsOptional()
    @IsString()
    color?: string;
}