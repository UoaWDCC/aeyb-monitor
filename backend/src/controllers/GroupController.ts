import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Group from '../models/GroupModel';

/**
 * @desc 	Get all the roles
 * @route 	GET /api/groups/
 */
const getAllGroups = asyncHandler(async (req: Request, res: Response) => {
    const groups = await Group.find();

    res.status(200).json({
        status: 'success',
        data: {
            groups,
        },
    });
});

export { getAllGroups };
