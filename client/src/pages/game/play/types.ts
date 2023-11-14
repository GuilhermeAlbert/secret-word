import { FieldNames } from "../../../app/enums/field-name.enum";

export interface PlayFormData {
  [FieldNames.GUESS]: string;
  [FieldNames.ROOM]: string;
}
