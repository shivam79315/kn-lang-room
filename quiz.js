import promptSync from "prompt-sync";
import QuizMaster from "./src/quiz-master/classes/QuizMaster.js";

const prompt = promptSync({ sigint: true });
const quiz = new QuizMaster(prompt);
quiz.start();