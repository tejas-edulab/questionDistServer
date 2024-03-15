import Joi from 'joi';
import customJOIMessages from '../../../validator/customJoiMessage';


export const examSchema = Joi.object({
   examId: Joi.number().optional()
} ).options({ messages: customJOIMessages });