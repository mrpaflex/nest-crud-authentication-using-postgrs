import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { error } from "console";

@Injectable()
export class BackendValidationPipe implements PipeTransform{
    async transform(value: any, metadata: ArgumentMetadata){
    const objectv = plainToClass(metadata.metatype, value);
    const errors = await validate(objectv)

    if (errors.length ===0 ) {
        return value
    }
    throw new HttpException({errors: this.formatErrors(errors)}, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    formatErrors(errors: ValidationError[]){
        return errors.reduce((acc, error)=>{
            acc[error.property] = Object.values(error.constraints);
            //console.log(acc, error)
            return acc
        }, {});
    }
}