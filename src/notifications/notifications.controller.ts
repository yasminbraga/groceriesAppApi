import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/auth-request.interface';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return this.notificationService.findAllByLoggedUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const notification = this.notificationService.findOne(id);
    return notification;
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }
}
