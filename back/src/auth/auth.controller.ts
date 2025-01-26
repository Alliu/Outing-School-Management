import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { SignInDto } from './dtos/signin.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserProfDto } from './dtos/prof/createUserProf.dto';
import { v4 as uuidv4 } from 'uuid';
import { auth_user, auth_user_status, media, token_type } from '@prisma/client';
import { UserPasswordDto } from './dtos/prof/UserPassword.dto';
import { CreateUserParentDto } from './dtos/parent/createUserParent.dto';
import { MailService } from '../mail/mail.service';
import { HttpDataService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { Request, Response } from 'express';
import { RefreshGuard } from './guards/refresh.guard';
import { AuthGuard } from './guards/auth.guard';
import { UploadService } from 'src/upload/upload.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private mailService: MailService,
    private httpService: HttpDataService,
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('signup_teacher')
  async signup(@Body() body: CreateUserProfDto): Promise<{ user: number }> {
    const schoolEmail = await this.httpService.getSchollEmailFromApi({
      schoolName: body.school_name,
      schoolPostalCode: body.school_cp,
      schoolAddress: body.school_address,
    });

    console.log(schoolEmail);
    const teacherDomain = body.teacher_email.split('@')[1];
    const schoolDomain = schoolEmail.split('@')[1];
    if (schoolDomain !== teacherDomain) {
      throw new BadRequestException(
        "L'email académique de l'utilisateur ne correspond pas à son établissement",
      );
    }
   
    const user = await this.authService.getByEmail(body.teacher_email);
   
    if (user) {
      throw new BadRequestException("L'email existe déjà.");
    }
 
    body.password = await this.authService.bhash(body.password);
  
    const new_auth_user = await this.authService.createWithProfileTeacher(
      body,
      schoolEmail,
    );

    const validationToken = uuidv4();
    console.log(validationToken);
    const expiredDate = new Date();
    expiredDate.setMonth(expiredDate.getMonth() + 1);
    await this.authService.createToken(
      new_auth_user.user_id,
      validationToken,
      token_type.VALIDATION_EMAIL,
      expiredDate,
    );

  //Send a mail to school
    return { user: new_auth_user.user_id };
  }

  @Post('confirmation-school')
  async validateSchoolCode(@Query('id') id: string) {
    const token_user = await this.authService.getByToken(id);
    if (token_user) console.log(token_user);
    const timeLeft = new Date(token_user.expired_at).getTime() - Date.now();
    if (timeLeft < 0) throw new BadRequestException('Token expiré');
    await this.authService.updateStatus({
      where: {
        user_id: token_user.user_id,
      },
      data: { status: { set: auth_user_status.CONFIRMED_BY_SCHOOL } },
    });
 
    const validationToken = uuidv4();
    const expiredDate = new Date();
    expiredDate.setMonth(expiredDate.getMonth() + 1);
    await this.authService.updateToken({
      where: {
        user_id_token: { user_id: token_user.user_id, token: id },
      },
      data: { token: validationToken, expired_at: expiredDate },
    });

    const userEmail = await this.authService.getById(token_user.user_id);
    console.log('🚀 ~ AuthController ~ @Query ~ userEmail:', userEmail);

    //Send a mail to user
    return "Statut confirmé par l'école!";
  }

  @Post('signup_parent')
  async signupParent(
    @Body() body: CreateUserParentDto,
  ): Promise<{ user: auth_user }> {
    const { email } = body;

    const existingUser = await this.authService.getByEmail(email);
    if (existingUser) {
      throw new BadRequestException("L'email renseigné existe déjà ");
    }

    body.password = await this.authService.bhash(body.password);

    const newUser = await this.authService.createWithProfileParent(body);

    const validationToken = uuidv4();
    const expiredDate = new Date();
    expiredDate.setMonth(expiredDate.getMonth() + 1);
    await this.authService.createToken(
      newUser.user_id,
      validationToken,
      token_type.VALIDATION_EMAIL,
      expiredDate,
    );

 //Send a mail to user
    return { user: newUser };
  }

  @Get('confirmation-user')
  async validateUserCode(@Query('token') token: string) {
  
    const user = await this.authService.getByToken(token);
    if (!user) throw new BadRequestException('token inconnu');
    

    const userFindById = await this.authService.getById(user.user_id);

    await this.authService.updateStatus({
      where: {
        user_id: user.user_id,
      },
      data: { status: { set: auth_user_status.ACTIVATED } },
    });

    const refresh_Token = await this.jwtService.signAsync(
      { sub: user.user_id },
      {
        secret: process.env.SECRET_REFRESH_KEY,
        expiresIn: '15m',
      },
    );

    await this.authService.updateToken({
      where: {
        user_id_token: { user_id: user.user_id, token: token },
      },
      data: {
        token: refresh_Token,
        expired_at: new Date(this.jwtService.decode(refresh_Token).exp * 1000),
        type: token_type.REFRESH,
      },
    });

 //Send a mail to user
  
    return "Statut confirmé par l'utilisateur!";
  }

  @Post('signin')
  async signin(@Body() body: SignInDto, @Res() res: Response) {
    const user = await this.authService.getByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.status !== auth_user_status.ACTIVATED) {
      throw new UnauthorizedException('Unactivated account');
    }
    const compare = await this.authService.bcompare(
      body.password,
      user.password,
    );
    if (!compare) {
      throw new BadRequestException('Mot de passe incorrect');
    }
    const refresh_token = await this.jwtService.signAsync(
      { sub: user.user_id },
      {
        secret: process.env.SECRET_REFRESH_KEY,
        expiresIn: '15m',
      },
    );

    const access_token = await this.jwtService.signAsync(
      { sub: user.user_id },
      {
        secret: process.env.SECRET_KEY,
        expiresIn: '5m',
      },
    );

    await this.authService.updateToken({
      where: { user_id: user.user_id },
      data: {
        token: await this.authService.bhash(refresh_token),
        expired_at: new Date(this.jwtService.decode(refresh_token).exp * 1000),
        type: token_type.REFRESH,
      },
    });

    await this.authService.setCookie(res, {
      access_token: access_token,
      refresh_token: refresh_token,
    });
  
    const findUser = await this.userService.getUserById(user.user_id);
    return res.send({
      access_token: access_token,
      user: {
        id: findUser.id,
        lastname: findUser.lastname,
        firstname: findUser.firstname,
        role: findUser.role,
        path: findUser['media']['path'],
      },
    });
  }

  @Get('refresh')
  @UseGuards(RefreshGuard)
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const userToken = await this.authService.getUserToken(req.user.sub);
    if (!userToken)
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    if (userToken.type !== token_type.REFRESH)
      throw new UnauthorizedException('Mauvais type de token');

    const compareToken = await this.authService.bcompare(
      req.refresh_token,
      userToken.token,
    );

    if (!compareToken)
      throw new UnauthorizedException('le token ne correspond pas');
    const access_token = await this.jwtService.signAsync(
      { sub: userToken.user_id },
      {
        secret: process.env.SECRET_KEY,
        expiresIn: '5m',
      },
    );
    const refresh_token = await this.jwtService.signAsync(
      { sub: userToken.user_id },
      {
        secret: process.env.SECRET_REFRESH_KEY,
        expiresIn: '15m',
      },
    );
   
    await this.authService.updateToken({
      where: {
        user_id: userToken.user_id,
      },
      data: {
        token: await this.authService.bhash(refresh_token),
        expired_at: new Date(this.jwtService.decode(refresh_token).exp * 1000),
        type: token_type.REFRESH,
      },
    });
    await this.authService.setCookie(res, {
      access_token,
      refresh_token,
    });
    return res.send({ access_token: access_token });
  }

  //When a user refresh a page
  @Get('profile')
  @UseGuards(AuthGuard)
  async keepSession(@Req() req: Request) {
    if (req.user.sub) {
      const findUser = await this.userService.getUserById(req.user.sub);
      return {
        user: {
          id: findUser.id,
          lastname: findUser.lastname,
          firstname: findUser.firstname,
          role: findUser.role,
          path: findUser['media']['path'],
        },
      };
    }
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    res.status(200).send({ message: 'Déconnexion réussie' });
  }

  @Get('delete')
  @UseGuards(AuthGuard)
  async deleteUser(@Req() req: Request) {
    if (req.user.sub) {
      const findUser = await this.authService.getById(req.user.sub);
      await this.authService.deleteProfile(findUser.user_id);
      return 'Votre compte a été supprimé';
    }
  }
}
