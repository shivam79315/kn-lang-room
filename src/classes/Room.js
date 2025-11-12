export default class Room {
    constructor(name ="Unnamed Room", description ="No description available.", items = [], exits = {}) {
        this.name = name;
        this.description = description;
        this.items = items;
        this.exits = exits;
    }

    showDetails() {
        console.log(`\n=== ${this.name} ===`);
        console.log(this.description);
        if(this.items.length > 0) {
            console.log("Items here are:");
            console.log(this.items);
            this.items.forEach(item => console.log(`- ${item.name}`));
        } else {
            console.log("It's empty... suspiciously empty.");
        }
        console.log("Exits: " + Object.keys(this.exits).join(", "));
    }
}