import { Injectable, BadRequestException, PipeTransform } from "@nestjs/common";
import type { ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) { }

    transform(value: any) {
        console.log('JoiValidationPipe - Received value:', value);

        if (!value || Object.keys(value).length === 0) {
            throw new BadRequestException('Request body is empty or missing');
        }

        const { error, value: validatedValue } = this.schema.validate(value, {
            abortEarly: false,
            allowUnknown: true,
        });

        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            throw new BadRequestException({
                message: 'Validation failed',
                errors: errorMessages,
            });
        }

        return validatedValue;
    }
}