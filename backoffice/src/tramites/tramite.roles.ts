import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  TRAMITE = 'tramite',
  ADMIN = 'admin',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.TRAMITE) // define new or modify existing role. also takes an array.
  .readAny('tramite')
  .grant(AppRoles.ADMIN)
  .readAny('tramite')
  .updateAny('tramite')
  .createAny('tramite')
  .deleteAny('tramite');
