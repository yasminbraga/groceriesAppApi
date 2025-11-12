import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestNotificationDto } from './dto/request-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async notificate(
    requestNotificationDto: RequestNotificationDto,
  ): Promise<Notification> {
    const { user, message, type, fromId, resourceUrl } = requestNotificationDto;

    const notification = this.notificationRepository.create({
      user,
      message,
      type,
      fromId,
      resourceUrl,
    });
    return await this.notificationRepository.save(notification);
  }

  async findAllByLoggedUser(userId: string): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
