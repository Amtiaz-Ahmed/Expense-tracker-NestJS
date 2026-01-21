import { Injectable, BadRequestException, PipeTransform } from "@nestjs/common";
import type { ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) { }

    transform(value: any) {
        const { error } = this.schema.validate(value, {
            abortEarly: false,
            allowUnknown: true,
        });
        if (error) {
            throw new BadRequestException(error.details[0].message);
        }
        return value;
    }
}