import { questions } from "../data/questions.js";
import { SCORE_RULES, HUMOR } from "../config/constants.js";
import Player from "./Player.js";

export default class QuizMaster {
    constructor(prompt) {
        this.prompt = prompt;
        this.questions = questions;
        this.player = null;
        this.selectedCategory = "";
        this.selectedDifficulty = "";
    }

    start() {
        console.log("=== Welcome to the KN-Lang Quiz Challenge! ===");

        const name = this.prompt("What's your name, challenger? ") || "Quizzer";
        this.player = new Player(name, 0);

        // Main game loop — keeps running until player quits
        let keepPlaying = true;

        while (keepPlaying) {

            this.chooseCategory();
            this.chooseDifficulty();
            this.startQuiz();
            this.showFinalResults();

            // Ask if they want to play again
            const again = this.prompt("\nWould you like to play again? (y/n): ").trim().toLowerCase();
            if (again !== "y") {
                console.log("\nFarewell, adventurer! May your brain cells rest well. 💻");
                keepPlaying = false;
            } else {
                console.log("\nRestarting the quiz... 🔁\n");
            }
        }
    }

    // choose category
    chooseCategory() {
        const categories = [...new Set(this.questions.map(q => q.category))];
        console.log("\nChoose a category:");
        categories.forEach((cat, i) => console.log(`${i + 1}. ${cat}`));

        const choice = parseInt(this.prompt("Enter your choice: "));
        this.selectedCategory = categories[choice - 1] || categories[0];
        console.log(`\nYou chose category: ${this.selectedCategory}`);
    }

    // choose difficulty
    chooseDifficulty() {
        const levels = [...new Set(this.questions.map(q => q.difficulty))];
        console.log("\nChoose difficulty:");
        levels.forEach((lvl, i) => console.log(`${i + 1}. ${lvl}`));

        const choice = parseInt(this.prompt("Enter your choice: "));
        this.selectedDifficulty = levels[choice - 1] || "Easy";
        console.log(`\nDifficulty set to: ${this.selectedDifficulty}`);
    }

    startQuiz() {
        console.log("\nLet the quiz begin! 💥\n");

        const filtered = this.questions.filter(
            q => q.category === this.selectedCategory && q.difficulty === this.selectedDifficulty
        );

        if (filtered.length === 0) {
            console.log("No questions found for this category and difficulty! Try again later.");
            return;
        }

        // Pick up to 10 questions (or less if not enough)
        const quizSet = filtered.slice(0, 10);

        quizSet.forEach((qObj, index) => {
            console.log(`\nQ${index + 1}: ${qObj.qTxt}`);
            qObj.options.forEach((opt, i) => console.log(`  ${i + 1}. ${opt}`));

            const ans = parseInt(this.prompt("Your answer (1-4): "));
            this.evaluateAnswer(ans, qObj);
        });
    }

    evaluateAnswer(choice, questionObj) {
        if (isNaN(choice) || choice < 1 || choice > 4) {
            console.log("Please enter a valid number between 1 and 4!");
            return;
        }

        const correctIndex = questionObj.answer;
        const isCorrect = choice - 1 === correctIndex;

        const diff = this.selectedDifficulty;
        const { correct, wrong } = SCORE_RULES[diff];

        if (isCorrect) {
            this.player.currentScore += correct;
            this.commentOnAnswer(true);
        } else {
            this.player.currentScore += wrong;
            this.commentOnAnswer(false, questionObj);
        }

        console.log(`Current Score: ${this.player.currentScore}`);
    }

    commentOnAnswer(isCorrect, questionObj = null) {
        if (isCorrect) {
            console.log(`✅ ${HUMOR.correct}`);
        } else {
            console.log(`❌ ${HUMOR.wrong}`);
            console.log(`The correct answer was: ${questionObj.options[questionObj.answer]}`);
        }
    }

    showFinalResults() {
        const score = this.player.currentScore;
        console.log("\n=== GAME OVER ===");
        console.log(`Final Score: ${score}`);

        if (score >= 80) console.log("👑 Quiz Royalty has arrived!");
        else if (score >= 50) console.log("🧩 Quiz Master in training.");
        else console.log("😏 Better luck next time, genius.");
    }
}