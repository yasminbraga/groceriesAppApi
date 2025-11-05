import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/auth-request.interface';
import { RequestListDto } from './dto/request-list.dto';
import { ResponseListDto } from './dto/response-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
@UseGuards(AuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async create(
    @Body() requestListDto: RequestListDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const createdList = await this.listsService.create(requestListDto, userId);
    return createdList;
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return this.listsService.findAllByLoggedUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foundList = await this.listsService.findOne(id);

    // return new ResponseListDto(foundList);
    return foundList;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() responseListDto: ResponseListDto,
  ) {
    return await this.listsService.update(id, responseListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.listsService.remove(id);
  }

  @Post(':id/share')
  async share(
    @Param('id') id: string,
    @Body() email: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return await this.listsService.share(id, email, userId);
  }
}
