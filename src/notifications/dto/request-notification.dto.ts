import { User } from '../../users/entities/user.entity';

export class RequestNotificationDto {
  public readonly fromId: string;
  public readonly user: User;
  public readonly message: string;
  public readonly type: 'LIST_SHARED' | 'ITEM_CHECKED' | 'OTHER';
  public readonly resourceUrl: string;
}
