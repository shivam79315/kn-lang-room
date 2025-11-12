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

        this.showInstructions();

        while(this.player.isAlive) {
            const raw = prompt(">> ");
            const cmd = sanitizeCommand(raw || "");
            this.handleCommand(cmd);
        }
    }

    showInstructions() {
        console.log("\n=== KN-Lang Game Commands ===");
        console.log("  look             → inspect your current surroundings");
        console.log("  go <direction>   → move north, south, east, or west");
        console.log("  pick <item>      → pick up an item in the room");
        console.log("  inventory        → view your collected items");
        console.log("  score            → view your current score");
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
            console.log("You can't go that way! Try a different direction.\n");
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

            case "pick":
                if (!target) {
                    console.log("Pick what? You must name the item, hero.");
                    break;
                }
                this.pickUpItemCheck(target);
                break;

            case "inventory":
                this.player.showInventory();
                break;

            case "score":
                this.player.showScore();
                break;

            case "help":
                this.showInstructions();
                break;

            case "quit":
                console.log("Farewell, adventurer! May your code always compile :)");
                this.player.isAlive = false;
                break;

            default:
                console.log("\n This command makes no sense. Type 'help' for a list of valid commands.");
        }
    }

    // helper fns
    pickUpItemCheck(itemName) {
        const currentRoom = this.player.currentRoom;
        const currentItems = currentRoom.items;

        const itemIndex = currentItems.indexOf(itemName);

        if (itemIndex !== -1) {
            this.player.pickUpItem(itemName);
            currentItems.splice(itemIndex, 1);
        } else {
            console.log(`There is no "${itemName}" here. Maybe try 'look'? 👀`);
        }
    }
}