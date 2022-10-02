import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Permission from '../shared/Types/utils/Permission';

/**
 * @desc 	Get all the roles
 * @route 	GET /api/permissions/
 */
const getAllPermissions = asyncHandler(async (req: Request, res: Response) => {
    const permissions = Object.values(Permission);

    res.ok({ permissions });
});

export { getAllPermissions };
