import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER = 'user',
  ADMIN = 'admin',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.USER) // define new or modify existing role. also takes an array.
  .readAny('user')
  .grant(AppRoles.ADMIN)
  .readAny('user')
  .updateAny('user')
  .createAny('user')
  .deleteAny('user');
