import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Role from '../models/RoleModel';
import User from '../models/UserModel';
import { RoleIdParam } from '../types/RequestParams';
import { TypedRequest, TypedRequestParams, TypedResponse } from '../types/UtilTypes';
import RoleDTO from '../shared/Types/dtos/RoleDTO';
import {
    AddRoleData,
    DeleteRoleData,
    GetAllRolesData,
    GetRoleData,
    UpdateRoleData,
} from '../shared/Types/responses/RoleResponsesData';

/**
 * @desc 	Get all the roles
 * @route 	GET /api/roles/
 */
const getAllRoles = asyncHandler(async (req: Request, res: TypedResponse<GetAllRolesData>) => {
    const roles = await Role.find();

    res.ok({
        results: roles.length,
        roles,
    });
});

/**
 * @desc 	Get a specific role
 * @route 	GET /api/roles/:roleId
 */
const getRole = asyncHandler(async (req: TypedRequestParams<RoleIdParam>, res: TypedResponse<GetRoleData>) => {
    const role = await Role.findById(req.params.roleId);
    if (!role) {
        return res.notFound(`There is no role with the id ${req.params.roleId}`);
    }

    const userCount = await User.countDocuments({ roles: req.params.roleId });

    res.ok({
        userCount,
        role,
    });
});

/**
 * @desc 	Add a new role
 * @route 	POST /api/roles/
 */
const addRole = asyncHandler(async (req: TypedRequest<RoleDTO>, res: TypedResponse<AddRoleData>) => {
    const newRole = await Role.create(req.body);

    res.created({ role: newRole });
});

/**
 * @desc 	Delete a specific role
 * @route 	DELETE /api/roles/:roleId
 */
const deleteRole = asyncHandler(async (req: TypedRequestParams<RoleIdParam>, res: TypedResponse<DeleteRoleData>) => {
    // Remove the role from any users that had it
    let modCount = 0;
    await User.updateMany({ roles: req.params.roleId }, { $pull: { roles: req.params.roleId } }, { new: true }).then(
        (users) => {
            modCount = users.modifiedCount;
        },
    );

    // Delete the role
    const response = await Role.findByIdAndDelete(req.params.roleId);
    if (!response) {
        return res.notFound(`There is no role with the id ${req.params.roleId}`);
    }

    res.ok({ modifiedUserCount: modCount });
});

/**
 * @desc 	Edit a specific role
 * @route 	PATCH /api/roles/:roleId
 */
const updateRole = asyncHandler(async (req: TypedRequest<RoleDTO, RoleIdParam>, res: TypedResponse<UpdateRoleData>) => {
    const role = await Role.findByIdAndUpdate(req.params.roleId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!role) {
        return res.notFound(`There is no role with the id ${req.params.roleId}`);
    }

    res.ok({ role });
});

export { getAllRoles, getRole, deleteRole, addRole, updateRole };
