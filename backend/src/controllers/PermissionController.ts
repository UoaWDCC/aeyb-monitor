import asyncHandler from 'express-async-handler';
import { Request } from 'express';
import Permission from '../shared/Types/utils/Permission';
import { TypedResponse } from '../types/UtilTypes';
import { GetAllPermissionsData } from '../shared/Types/responses/PermissionResponsesData';

/**
 * @desc 	Get all the roles
 * @route 	GET /api/permissions
 */
const getAllPermissions = asyncHandler(async (req: Request, res: TypedResponse<GetAllPermissionsData>) => {
    const permissions = Object.values(Permission);

    res.ok({ permissions });
});

export { getAllPermissions };
