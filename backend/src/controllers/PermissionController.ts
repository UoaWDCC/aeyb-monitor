import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Permission from '../types/Perm';

/**
 * @desc 	Get all the roles
 * @route 	GET /api/permissions/
 */
const getAllPermissions = asyncHandler(async (req: Request, res: Response) => {
    const permissions = [];
    for (const enumMember in Permission) {
        const val = parseInt(enumMember);
        if (isNaN(val)) {
            permissions.push(enumMember);
        }
    }

    res.status(200).json({
        status: 'success',
        data: {
            permissions,
        },
    });
});

export { getAllPermissions };
