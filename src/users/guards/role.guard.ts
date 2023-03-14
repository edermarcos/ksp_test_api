import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';

import { META_ROLES } from '../interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );
    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new BadRequestException('User not found');
    }

    for (const role of user.roles) {
      if (roles.includes(role)) {
        return true;
      }
    }

    throw new ForbiddenException(
      `User ${user.fullName} does not have permission to access this resource`,
    );
  }
}
