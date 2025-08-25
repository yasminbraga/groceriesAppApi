import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RequestListDto } from './dto/request-list.dto';
import { ResponseListDto } from './dto/response-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async create(@Body() requestListDto: RequestListDto) {
    const createdList = await this.listsService.create(requestListDto);
    return new ResponseListDto(createdList);
  }

  @Get()
  async findAll() {
    return await this.listsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const foundList = await this.listsService.findOne(+id);

    // return new ResponseListDto(foundList);
    return foundList;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() responseListDto: ResponseListDto,
  ) {
    return await this.listsService.update(+id, responseListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.listsService.remove(+id);
  }
}
