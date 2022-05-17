import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Role from '../models/Role';
import IdParam from '../types/RequestParams';

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
            roles,
        },
    });
});

/**
 * @desc 	Get a specific role
 * @route 	GET /api/roles/:
 */
const getRole = asyncHandler(async (req: Request<IdParam>, res: Response) => {
    const role = await Role.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            role,
        },
    });
});

/**
 * @desc 	Add a new role
 * @route 	POST /api/roles/
 */
const addRole = asyncHandler(async (req: Request, res: Response) => {
    const newRole = await Role.create(req.body);

    await res.status(201).json({
        status: 'success',
        data: {
            role: newRole,
        },
    });
});

/**
 * @desc 	Delete a specific role
 * @route 	DELETE /api/users/:id
 */
const deleteRole = asyncHandler(
    async (req: Request<IdParam>, res: Response) => {
        await Role.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    },
);

/**
 * @desc 	Edit a specific Role
 * @route 	PATCH /api/users/:id
 */
const updateRole = asyncHandler(async (req: Request, res: Response) => {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            role,
        },
    });
});

export { getAllRoles, getRole, deleteRole, addRole, updateRole };
