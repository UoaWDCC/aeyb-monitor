import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

/**
 * @desc 	Get all the roles
 * @route 	GET /api/roles/
 */
const getAllRoles = asyncHandler(async (req: Request, res: Response) => {
    // TODO Fetch all roles

    res.status(200).json({
        message: 'Nice work, you just made a GET request! - getAllRoles',
    });
});

/**
 * @desc 	Get a specific role
 * @route 	GET /api/roles/:
 */
const getRole = asyncHandler(async (req: Request, res: Response) => {
    // TODO getRole

    res.status(200).json({
        message: 'Nice work, you just made a GET request! - getRole',
    });
});

/**
 * @desc 	Add a new role
 * @route 	POST /api/roles/
 */
const addRole = asyncHandler(async (req: Request, res: Response) => {
    // TODO add role

    res.status(200).json({
        message: 'Nice work, you just made a POST request! - addRole',
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
