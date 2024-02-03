import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from 'src/entity/user.entity';
import * as jwt from 'jsonwebtoken';
import { ROLE, TOKEN_TYPE } from 'src/users/user.enum';
import { EntityManager } from 'typeorm';

@Injectable()
export class InjectAccountMiddleware implements NestMiddleware {
  constructor(private readonly entityManager: EntityManager) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (req.baseUrl.includes('refresh-token')) return next();
    if (req.baseUrl.includes('delete')) return next();

    const accessToken = req.headers.authorization?.split('Bearer ')[1];

    if (!accessToken || accessToken === null || accessToken === 'null')
      return next();
    const { role, type } = jwt.decode(accessToken) as {
      role: ROLE;
      type: TOKEN_TYPE;
    };

    if (type !== TOKEN_TYPE.ACCESS_TOKEN)
      throw new BadRequestException('InvalidToken');
    if (role !== ROLE.USER) throw new BadRequestException('InvalidToken');

    try {
      const { sub } = jwt.verify(accessToken, JWT_SECRET);
      const user = await this.entityManager.findOne(UserEntity, {
        where: { id: sub as string },
      });

      if (!user) {
        throw new BadRequestException('InvalidToken');
      }
      req.user = user;

      next();
    } catch (e) {
      const errorName = (e as Error).name;
      switch (errorName) {
        case 'TokenExpiredError':
          throw new BadRequestException('ExpiredAccessToken');
        default:
          throw new BadRequestException('InvalidToken');
      }
    }
  }
}
