"use strict";

const ServerConfig = {
  MIN_FPS: 8,
  STARTING_FPS: 8,
  MAX_FPS: 60,
  PLAYER_STARTING_LENGTH: 10,
  SPAWN_TURN_LEEWAY: 10,
  DEFAULT_STARTING_BOTS: 0,
  MAX_BOTS: 20,
  BOT_CHANGE_DIRECTION_PERCENT: 0.1,
  FOOD: {
    DEFAULT_AMOUNT: 25,
    NORMAL: {
      TYPE: "NORMAL",
      COLOR: "red",
      POINTS: 1,
      GROWTH: 1,
    },
    SUPER: {
      TYPE: "SUPER",
      COLOR: "green",
      POINTS: 5,
      GROWTH: 5,
      SPAWN_RATE: 0.1,
    },
    GOLDEN: {
      TYPE: "GOLDEN",
      COLOR: "yellow",
      POINTS: 25,
      GROWTH: 25,
      SPAWN_RATE: 0.01,
    },
    SWAP: {
      TYPE: "SWAP",
      COLOR: "blue",
      POINTS: 1,
      GROWTH: 1,
      SPAWN_RATE: 0.05,
    },
  },
  IO: {
    DEFAULT_CONNECTION: "connection",
    INCOMING: {
      BOT_CHANGE: "bot change",
      COLOR_CHANGE: "player changed color",
      FOOD_CHANGE: "food change",
      SPEED_CHANGE: "speed change",
      START_LENGTH_CHANGE: "start length change",
      JOIN_GAME: "join game",
      SPECTATE_GAME: "spectate game",
      CLEAR_UPLOADED_BACKGROUND_IMAGE: "clear uploaded background image",
      BACKGROUND_IMAGE_UPLOAD: "background image upload",
      CLEAR_UPLOADED_IMAGE: "clear uploaded image",
      IMAGE_UPLOAD: "image upload",
      NEW_PLAYER: "new player",
      NAME_CHANGE: "player changed name",
      KEY_DOWN: "key down",
      CANVAS_CLICKED: "canvas clicked",
      DISCONNECT: "disconnect",
    },
    OUTGOING: {
      NEW_STATE: "game update",
      NEW_PLAYER_INFO: "new player info",
      NEW_BACKGROUND_IMAGE: "new background image",
      BOARD_INFO: "board info",
      NOTIFICATION: {
        GENERAL: "general notification",
        FOOD_COLLECTED: "food collected",
        KILL: "kill notification",
        KILLED_EACH_OTHER: "killed each other notification",
        RAN_INTO_WALL: "ran into wall notification",
        SUICIDE: "suicide notification",
        YOU_DIED: "you died",
        YOU_MADE_A_KILL: "you made a kill",
        SUCCESSFULLY_VERIFIED: "You have proven your Gamerhood",
      },
    },
  },
  INCREMENT_CHANGE: {
    INCREASE: "increase",
    DECREASE: "decrease",
    RESET: "reset",
  },
};

module.exports = ServerConfig;
