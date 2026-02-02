import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsDateString,
    IsOptional,
    Min
} from 'class-validator';

export class CreateReminderDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @Min(0.01)
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsDateString()
    @IsOptional()
    reminderDate?: string;

    @IsString()
    @IsOptional()
    reminderTime?: string;
}