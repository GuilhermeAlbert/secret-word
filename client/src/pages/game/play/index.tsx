import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { Location, useLocation } from "react-router-dom";
import { Feedback } from "../../../app/entities/feedback.entity";
import { Events } from "../../../app/enums/event.enum";
import { FeedbackTypes } from "../../../app/enums/feedback.enum";
import { FieldNames } from "../../../app/enums/field-name.enum";
import useSocket from "../../../app/hooks/socket.hook";
import { Badge } from "../../../components/badge";
import { TextInput } from "../../../components/formulary/inputs/text";
import { Header } from "../../../components/header";
import { PlayValidationSchema } from "./schema.yup";
import { PlayFormData } from "./types";

export function PlayGamePage(): JSX.Element {
  const [feedback, setFeedback] = useState<Feedback>();

  const socket = useSocket();
  const location: Location = useLocation();
  const tip = location.state?.tip;

  const [room, setRoom] = useState<string | undefined>(location.state?.room);

  const formik = useFormik({
    initialValues: {
      [FieldNames.GUESS]: "",
      [FieldNames.ROOM]: room ?? "",
    },
    validationSchema: PlayValidationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(
    data: PlayFormData,
    { resetForm }: FormikHelpers<PlayFormData>
  ): Promise<void> {
    try {
      if (socket) {
        socket.emit(Events.SubmitGuess, data);

        socket.on(Events.GuessFeedback, (response: Feedback) => {
          setFeedback(response);
        });

        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header title={"Play!"} />

      {room && feedback?.feedbackType !== FeedbackTypes.RoomNotFound ? (
        <form
          className="w-full"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          {tip && (
            <div className="mb-4">
              Tip: <Badge title={tip} />
            </div>
          )}

          <div className="flex flex-wrap -mx-3 mb-6">
            <TextInput
              id={FieldNames.GUESS}
              name={FieldNames.GUESS}
              label={"Your guess"}
              placeholder={"Type your guess"}
              value={formik.values[FieldNames.GUESS]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors[FieldNames.GUESS]}
            />
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap -mx-3 mb-6">
          <TextInput
            id={FieldNames.ROOM}
            name={FieldNames.ROOM}
            label={"The game code"}
            placeholder={"Type the game"}
            value={room}
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
      )}

      {feedback && (
        <div className="mt-4">
          <Badge title={feedback.message} />
        </div>
      )}
    </>
  );
}
