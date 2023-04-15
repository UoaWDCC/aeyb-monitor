import Permission from '../utils/Permission';

export default interface RoleDTO {
    id: string;
    name: string;
    color: string;
    permissions: Permission[];
}