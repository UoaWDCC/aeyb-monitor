import asyncHandler from 'express-async-handler';
import { Request } from 'express';
import { TypedResponse } from '../types/UtilTypes';
import { GetAllPermissionsData } from '@shared/responses/PermissionResponsesData';

/**
 * @desc 	Get all the roles
 * @route 	GET /api/permissions
 */
const getAllPermissions = asyncHandler(async (req: Request, res: TypedResponse<GetAllPermissionsData>) => {
    // not yet implemented
    res.sendStatus(501);
});

export { getAllPermissions };
