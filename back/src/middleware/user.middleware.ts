import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CheckUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userIdBody = req.body.userid || req.body.organiser_id;
    const contactIdBody = req.body.contactId;
    const userIdQuery = req.query.userid;
    const contactQuery = req.query.contactid;
    if (
      userIdBody ||
      userIdQuery ||
      (userIdQuery && contactQuery) ||
      (userIdBody && contactIdBody)
    ) {
      const user =
        userIdBody || userIdQuery
          ? await this.userService.findUserById(+userIdBody || +userIdQuery)
          : undefined;

      if (!user)
        throw new NotFoundException("L'utilisateur n'existe pas du middleware");
    }
    if (contactIdBody || contactQuery) {
      const contact =
        contactQuery || contactIdBody
          ? await this.userService.findUserById(+contactQuery || +contactIdBody)
          : undefined;

      if (!contact)
        throw new NotFoundException("Le contact n'existe pas du middleware");
    }

    next();
  }
}
