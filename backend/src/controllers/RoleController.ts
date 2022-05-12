import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Role from '../models/Role';

/**
 * @desc 	Get all the roles
 * @route 	GET /api/roles/
 */
const getAllRoles = asyncHandler(async (req: Request, res: Response) => {
    const roles = await Role.find();

    res.status(200).json({
        status: 'success',
        results: roles.length,
        data: {
            roles
        }
    });
});

/**
 * @desc 	Get a specific role
 * @route 	GET /api/roles/:
 */
const getRole = asyncHandler(async (req: Request, res: Response) => {
    const role = await Role.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            role
        }
    });
});

/**
 * @desc 	Add a new role
 * @route 	POST /api/roles/
 */
const addRole = asyncHandler(async (req: Request, res: Response) => {

    const newRole = await Role.create(req.body)    

    newRole.save()
    await res.status(201).json({
        status: 'success',
        data: {
            role: newRole
        },
    });
});

/**
 * @desc 	Delete a specific role
 * @route 	DELETE /api/users/:
 */
const deleteRole = asyncHandler(async (req: Request, res: Response) => {
    // TODO delete role

    res.status(200).json({
        message: 'Nice work, you just made a DELETE request! - deleteRole',
    });
});

/**
 * @desc 	Edit a specific Role
 * @route 	PATCH /api/users/:
 */
const updateRole = asyncHandler(async (req: Request, res: Response) => {
    // Fetch users

    res.status(200).json({
        message: 'Nice work, you just made a PATCH request! - updateRole',
    });
});

export { getAllRoles, getRole, deleteRole, addRole, updateRole };
