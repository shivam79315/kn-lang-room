export default class Player {
    constructor(name ="Unnamed Player") {
        this.name = name;
        this.inventory = [];
        this.currentRoom = null;
        this.isAlive = true;
        this.score = 0;
    }

    pickUpItem(item) {
        if(!item) return;
        this.inventory.push(item);
        console.log(`You picked up: ${item}. Confidence level +10! \n`);
        this.score += 10;
    }

    showInventory() {
        console.log("\n=== Your Inventory ===");
        if(this.inventory.length > 0) {
            this.inventory.forEach(item => console.log(`- ${item}`));
        } else {
            console.log("Your inventory is empty.");
        }
        console.log("======================\n");
    }

    showScore() {
        console.log(`Your current score is: ${this.score}\n`);
    }
}