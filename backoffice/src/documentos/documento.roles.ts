import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  DOCUMENTO = 'documento',
  ADMIN = 'admin',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.DOCUMENTO) // define new or modify existing role. also takes an array.
  .readAny('documento')
  .grant(AppRoles.ADMIN)
  .readAny('documento')
  .updateAny('documento')
  .createAny('documento')
  .deleteAny('documento');
