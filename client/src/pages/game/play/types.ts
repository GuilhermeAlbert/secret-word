import { FieldNameConstants } from "../../../app/constants/field-name.constants";

export interface CreateGameFormData {
  [FieldNameConstants.SECRET_WORD]: string;
  [FieldNameConstants.TIP]: string;
}
