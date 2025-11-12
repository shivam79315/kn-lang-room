// src/data/rooms.js
export default function createRooms(RoomClass) {
  // returns an object mapping roomName -> Room instance
  const entrance = new RoomClass("Entrance", "A dusty threshold to KN-Land.", [], { north: "Dungeon" });
  const dungeon = new RoomClass("Dungeon", "The air smells like sarcasm and mold.", ["rusty key"], { south: "Entrance", east: "Locked Door" });
  const lockedDoor = new RoomClass("Locked Door", "A stubborn wooden door with a keyhole.", [], { west: "Dungeon" });

  return {
    Entrance: entrance,
    Dungeon: dungeon,
    "Locked Door": lockedDoor
  };
}