import * as Yup from "yup";
import { FieldNames } from "../../../app/enums/field-name.enum";

export const PlayValidationSchema = Yup.object({
  [FieldNames.GUESS]: Yup.string().required("This field is required"),
});
