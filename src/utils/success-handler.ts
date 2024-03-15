import {  Request, Response } from 'express';

// Define a success middleware function
function sendSuccessResponse<T>(req: Request, res: Response,  data: T) {

    const response = {
        status: 200,
        data: data,
        error: null,
    };

    return res.status(200).json(response);

}

export default sendSuccessResponse;