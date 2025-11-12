export default class Room {
    constructor(name ="Unnamed Room", items = [], exits = {}, description = "No description available.") {
        this.name = name;
        this.items = items;
        this.exits = exits;
        this.description = description;
    }

    showDetails() {
        console.log(`\n=== ${this.name} Room ===`);
        console.log(`Description: ${this.description} \n`);
        if(this.items.length > 0) {
            console.log("Items here are:");
            this.items.forEach(item => console.log(`- ${item}`));
        } else {
            console.log("Oh no! Empty room.");
        }
        console.log("Exits: " + Object.keys(this.exits).join(", "));
        console.log("=====================\n");
    }
}