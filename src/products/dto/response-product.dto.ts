import { PartialType } from '@nestjs/mapped-types';
import { RequestProductDto } from './request-product.dto';

export class ResponseProductDto extends PartialType(RequestProductDto) {}
