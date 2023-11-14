import { FieldNames } from "../enums/field-name.enum";

export interface PlayFormData {
  [FieldNames.GUESS]: string;
  [FieldNames.ROOM]: string;
}
