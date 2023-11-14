import { Socket } from "socket.io";
import { Events } from "../enums/event.enum";
import { GameRoom } from "../entities/game-room.entity";
import { PlayFormData } from "../entities/play.entity";
import { Feedback } from "../entities/feedback.entity";
import { FeedbackTypes } from "../enums/feedback.enum";

function verifyGuess(guess: string, room: GameRoom): boolean {
  return guess === room.secretWord;
}

export function handleGuessGame(
  socket: Socket,
  rooms: Record<string, GameRoom>
) {
  socket.on(Events.SubmitGuess, (data: PlayFormData) => {
    const room = rooms[data.room];

    if (room) {
      const isCorrect = verifyGuess(data.guess, room);
      const feedback: Feedback = isCorrect
        ? {
            message: "Correct!",
            feedbackType: FeedbackTypes.Correct,
          }
        : {
            message: "Wrong!",
            feedbackType: FeedbackTypes.Wrong,
          };

      socket.emit(Events.GuessFeedback, feedback);
    } else {
      socket.emit(Events.GuessFeedback, {
        message: "Error: Room not found.",
        feedbackType: FeedbackTypes.RoomNotFound,
      });
    }
  });
}
