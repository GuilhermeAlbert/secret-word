import * as Yup from "yup";
import { FieldNameConstants } from "../../../app/constants/field-name.constants";

export const CreateGameValidationSchema = Yup.object({
  [FieldNameConstants.SECRET_WORD]: Yup.string()
    .required("This field is required")
    .min(3, "Must be at least 3 characters long"),
  [FieldNameConstants.TIP]: Yup.string()
    .required("This field is required")
    .min(5, "Must be at least 5 characters long"),
});
