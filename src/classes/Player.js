export default class Player {
    constructor(name ="Unnamed Player") {
        this.name = name;
        this.inventory = [];
        this.currentRoom = null;
        this.isAlive = true;
    }

    pickUpItem(item) {
        if(!item) return;
        this.inventory.push(item);
        console.log(`You picked up: ${item.name}. Confidence level +10!`);
    }
}