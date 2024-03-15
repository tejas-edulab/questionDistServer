import Joi from "joi";
import customJOIMessages from "../../../validator/customJoiMessage";

export const getUploadByUploadIdSchema = Joi.object({
    uploadId: Joi.number().required()
  }).options({ messages: customJOIMessages });