import { FeedbackTypes } from "../enums/feedback.enum";

export interface Feedback {
  feedbackType: FeedbackTypes;
  message: string;
}
