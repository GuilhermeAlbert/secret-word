import { FieldNames } from "../../../app/enums/field-name.enum";

export interface CreateGameFormData {
  [FieldNames.SECRET_WORD]: string;
  [FieldNames.TIP]: string;
}
