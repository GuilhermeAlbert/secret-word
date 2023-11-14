import { useFormik } from "formik";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FieldNameConstants } from "../../../app/constants/field-name.constants";
import { useApp } from "../../../app/contexts/app/hooks/app.hook";
import { GameRoom } from "../../../app/entities/game-room.entity";
import { Events } from "../../../app/enums/event.enum";
import useSocket from "../../../app/hooks/socket.hook";
import { PrimaryButton } from "../../../components/buttons/primary";
import { TextInput } from "../../../components/formulary/inputs/text";
import { Header } from "../../../components/header";
import { CreateGameValidationSchema } from "./schema.yup";
import { CreateGameFormData } from "./types";

export function CreateGamePage(): JSX.Element {
  const [gameRoom, setGameRoom] = useState<GameRoom>();

  const { state: appState } = useApp();
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {
      [FieldNameConstants.SECRET_WORD]: "",
      [FieldNameConstants.TIP]: "",
    },
    validationSchema: CreateGameValidationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(data: CreateGameFormData): Promise<void> {
    try {
      const roomName = uuidv4();
      const password = uuidv4();

      if (socket && appState.userIdentifier) {
        const payload: GameRoom = {
          userId: appState.userIdentifier,
          secretWord: data.secret_word,
          tip: data.tip,
          roomName: roomName,
          password: password,
        };

        console.log("payload", payload);

        socket.emit(Events.CreateGame, payload);

        setGameRoom(payload);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {gameRoom ? (
        <div>
          <p>Room name: {gameRoom.roomName}</p>
          <p>Password: {gameRoom.password}</p>
        </div>
      ) : (
        <form
          className="w-full"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <Header title={"Secret word"} />

            <TextInput
              id={FieldNameConstants.SECRET_WORD}
              name={FieldNameConstants.SECRET_WORD}
              label={"Secret word"}
              placeholder={"Type your secret word"}
              value={formik.values[FieldNameConstants.SECRET_WORD]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors[FieldNameConstants.SECRET_WORD]}
            />

            <TextInput
              id={FieldNameConstants.TIP}
              name={FieldNameConstants.TIP}
              label={"Tip"}
              placeholder={"Type the tip"}
              value={formik.values[FieldNameConstants.TIP]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors[FieldNameConstants.TIP]}
            />
          </div>

          <div className="flex flex-wrap">
            <div className="w-full">
              <PrimaryButton title={"Create game"} type="submit" />
            </div>
          </div>
        </form>
      )}
    </>
  );
}
