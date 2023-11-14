import { useFormik } from "formik";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FieldNames } from "../../../app/enums/field-name.enum";
import { useApp } from "../../../app/contexts/app/hooks/app.hook";
import { GameRoom } from "../../../app/entities/game-room.entity";
import { Events } from "../../../app/enums/event.enum";
import { AppRoutes } from "../../../app/enums/route.enum";
import useSocket from "../../../app/hooks/socket.hook";
import { PrimaryButton } from "../../../components/buttons/primary";
import { Card } from "../../../components/card";
import { TextInput } from "../../../components/formulary/inputs/text";
import { Header } from "../../../components/header";
import { CreateGameValidationSchema } from "./schema.yup";
import { CreateGameFormData } from "./types";

export function CreateGamePage(): JSX.Element {
  const [gameRoom, setGameRoom] = useState<GameRoom>();

  const { state: appState } = useApp();
  const socket = useSocket();
  const navigate: NavigateFunction = useNavigate();

  const formik = useFormik({
    initialValues: {
      [FieldNames.SECRET_WORD]: "",
      [FieldNames.TIP]: "",
    },
    validationSchema: CreateGameValidationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(data: CreateGameFormData): Promise<void> {
    try {
      const roomName = uuidv4();

      if (socket && appState.userIdentifier) {
        const payload: GameRoom = {
          userId: appState.userIdentifier,
          secretWord: data.secret_word,
          tip: data.tip,
          roomName: roomName,
        };

        socket.emit(Events.CreateGame, payload);

        setGameRoom(payload);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header title={gameRoom ? "Your game" : "Create game"} />

      {gameRoom ? (
        <Card
          title={gameRoom.tip}
          subtitle={gameRoom.roomName}
          onClick={() =>
            navigate(AppRoutes.PlayGame, {
              state: {
                room: gameRoom.roomName,
                tip: gameRoom.tip,
              },
            })
          }
        />
      ) : (
        <form
          className="w-full"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <TextInput
              id={FieldNames.SECRET_WORD}
              name={FieldNames.SECRET_WORD}
              label={"Secret word"}
              placeholder={"Type your secret word"}
              value={formik.values[FieldNames.SECRET_WORD]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors[FieldNames.SECRET_WORD]}
            />

            <TextInput
              id={FieldNames.TIP}
              name={FieldNames.TIP}
              label={"Tip"}
              placeholder={"Type the tip"}
              value={formik.values[FieldNames.TIP]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors[FieldNames.TIP]}
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
