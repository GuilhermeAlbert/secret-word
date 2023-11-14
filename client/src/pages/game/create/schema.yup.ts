import * as Yup from "yup";
import { FieldNames } from "../../../app/enums/field-name.enum";

export const CreateGameValidationSchema = Yup.object({
  [FieldNames.SECRET_WORD]: Yup.string()
    .required("This field is required")
    .min(3, "Must be at least 3 characters long"),
  [FieldNames.TIP]: Yup.string()
    .required("This field is required")
    .min(5, "Must be at least 5 characters long"),
});
