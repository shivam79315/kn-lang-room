// src/data/rooms.js
export default function createRooms(RoomClass) {
  // === Room Definitions ===

  const entrance = new RoomClass(
    "Entrance",
    ["bulb", "map"],
    { north: "Dungeon" },
    "A dusty threshold to KN-Land. The air hums with... mild disappointment."
  );

  const dungeon = new RoomClass(
    "Dungeon",
    ["table", "chair", "harmonium"],
    { south: "Entrance", east: "Locked Door", west: "Library", north: "Armory" },
    "The walls whisper secrets you definitely didn’t ask for."
  );

  const lockedDoor = new RoomClass(
    "Locked Door",
    ["lock", "key"],
    { west: "Dungeon", east: "Treasure Room", north: "Observatory" },
    "A door so obviously locked that it practically laughs at you."
  );

  const library = new RoomClass(
    "Library",
    ["book", "pen", "glass"],
    { east: "Dungeon", north: "Armory", south: "Secret Tunnel" },
    "A room full of unread books and regret. Smells faintly of wisdom and coffee."
  );

  const armory = new RoomClass(
    "Armory",
    ["sword", "shield", "helmet"],
    { south: "Library", east: "Treasure Room", west: "Dungeon" },
    "So many weapons, yet none sharp enough to cut through your confusion."
  );

  const treasureRoom = new RoomClass(
    "Treasure Room",
    ["coin", "crown", "orb"],
    { west: "Armory", west2: "Locked Door", south: "Secret Tunnel", north: "Observatory" },
    "Gold everywhere, but you can’t pay rent with it. Typical."
  );

  const observatory = new RoomClass(
    "Observatory",
    ["telescope", "star", "cup"],
    { south: "Treasure Room", west: "Locked Door", east: "Crystal Cavern" },
    "The stars look down, unimpressed. You stare back, equally unimpressed."
  );

  const secretTunnel = new RoomClass(
    "Secret Tunnel",
    ["torch", "rope", "note"],
    { north: "Library", east: "Treasure Room", west: "Crystal Cavern", south: "Entrance" },
    "Dark, narrow, and smells like your last bad decision."
  );

  const crystalCavern = new RoomClass(
    "Crystal Cavern",
    ["crystal", "pickaxe"],
    { east: "Secret Tunnel", west: "Observatory" },
    "Glistening crystals mock your poverty."
  );

  // === Return All Rooms ===
  return {
    Entrance: entrance,
    Dungeon: dungeon,
    "Locked Door": lockedDoor,
    Library: library,
    Armory: armory,
    "Treasure Room": treasureRoom,
    Observatory: observatory,
    "Secret Tunnel": secretTunnel,
    "Crystal Cavern": crystalCavern,
  };
}