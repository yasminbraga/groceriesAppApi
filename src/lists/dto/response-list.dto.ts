import { PartialType } from '@nestjs/mapped-types';
import { RequestListDto } from './request-list.dto';

export class ResponseListDto extends PartialType(RequestListDto) {}
