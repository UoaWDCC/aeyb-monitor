import RoleDTO from '../dtos/RoleDTO';

export type AddRoleRequest = Omit<RoleDTO, 'id'>;

export type UpdateRoleRequest = Partial<Omit<RoleDTO, 'id'>>;
