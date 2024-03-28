import Joi from "joi";
import { IRoles, ICreateRoles } from "../user/user.types";

export const getSingleUserSchema = Joi.object({
  id: Joi.number().required().messages({
    "any.required": "id is required",
  }),
});
