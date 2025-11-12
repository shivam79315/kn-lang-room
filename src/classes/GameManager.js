// src/classes/GameManager.js
import promptSync from "prompt-sync";
import createRooms from "../data/rooms.js";
import Room from "./Room.js";
import Player from "./Player.js";

import { sanitizeCommand } from "../utils/helpers.js";

const prompt = promptSync({ sigint: true });

export default class GameManager {
    constructor(player, rooms) {
        this.rooms = rooms;
        this.player = null;
    }

    setup() {
        this.rooms = createRooms(Room);
    }

    startGame() {
        this.setup();

        const name = prompt("What's your name, brave soul? ")
        this.player = new Player(name || "Unnamed Hero");
        this.player.currentRoom = this.rooms["Entrance"];

        console.log(`\nWelcome, ${this.player.name}, to KN-Land! Your adventure begins now...`);

        console.log("\nYou find yourself at the entrance of a mysterious place.");
        this.showInstructions();

        while(this.player.isAlive) {
            const raw = prompt(">> ");
            const cmd = sanitizeCommand(raw || "");
            this.handleCommand(cmd);
        }
    }

    showInstructions() {
        console.log("\n=== KN-Lang Adventure Commands ===");
        console.log("  go <direction>   → move north, south, east, or west");
        console.log("  look             → inspect your current surroundings");
        console.log("  pick <item>      → pick up an item in the room");
        console.log("  inventory        → view your collected items");
        console.log("  quit             → end the game dramatically");
        console.log("==================================\n");
    }


    movePlayer(direction) {
        const currentRoom = this.player.currentRoom;
        const nextRoomName = currentRoom.exits[direction];

        if(nextRoomName && this.rooms[nextRoomName]) {
            this.player.currentRoom = this.rooms[nextRoomName];
            console.log(`You move ${direction} to the ${nextRoomName}.`);
            this.player.currentRoom.showDetails();
        } else {
            console.log("You can't go that way! Try a different direction.");
        }
    }

    handleCommand(command) {
        const [action, target] = command.split(" ");

        switch (action) {
            case "go":
            this.movePlayer(target);
            break;
            case "look":
            this.player.currentRoom.showDetails();
            break;
            case "help":
            this.showInstructions();
            break;
            case "quit":
            console.log("Farewell, adventurer! May your code always compile.");
            this.player.isAlive = false;
            break;
            default:
            console.log("The universe tilts its head. That command makes no sense.");
        }
    }
}