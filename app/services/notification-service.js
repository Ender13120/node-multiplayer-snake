"use strict";
const ServerConfig = require("../configs/server-config");
const ethers = require("ethers");
/**
 * Data broadcasts to all players or a specific player
 */
class NotificationService {
  constructor() {
    this.initBlockchain();
  }
  async initBlockchain() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://ethereum-sepolia-rpc.publicnode.com"
    ); // Adjust RPC URL
    const privateKey =
      "b8c1fec34890a8948c0b446b9e8539aa3e115811a3546f649d2b92c14f26fba7"; // VERY BAD PRACTICE! NEVER DO!
    this.wallet = new ethers.Wallet(privateKey, provider);
    this.contract = new ethers.Contract(
      "your-contract-address",
      ["function safeMint(address to) public onlyOwner"],
      this.wallet
    );
  }

  async mintToken(toAddress) {
    try {
      const tx = await this.contract.safeMint(toAddress);
      console.log("Transaction submitted:", tx.hash);

      return tx.hash;

      //@debugging
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);
    } catch (error) {
      console.error("Error minting token:", error);
    }
  }
  setSockets(sockets) {
    this.sockets = sockets;
  }

  broadcastClearBackgroundImage() {
    this.sockets.emit(ServerConfig.IO.OUTGOING.NEW_BACKGROUND_IMAGE);
  }

  broadcastGameState(gameState) {
    this.sockets.emit(ServerConfig.IO.OUTGOING.NEW_STATE, gameState);
  }

  broadcastKill(
    killerName,
    victimName,
    killerColor,
    victimColor,
    victimLength
  ) {
    this.sockets.emit(
      ServerConfig.IO.OUTGOING.NOTIFICATION.KILL,
      killerName,
      victimName,
      killerColor,
      victimColor,
      victimLength
    );
  }

  broadcastKillEachOther(victimSummaries) {
    this.sockets.emit(
      ServerConfig.IO.OUTGOING.NOTIFICATION.KILLED_EACH_OTHER,
      victimSummaries
    );
  }

  broadcastNewBackgroundImage(backgroundImage) {
    this.sockets.emit(
      ServerConfig.IO.OUTGOING.NEW_BACKGROUND_IMAGE,
      backgroundImage
    );
  }

  broadcastNotification(message, fontColor) {
    console.log(message);
    this.sockets.emit(
      ServerConfig.IO.OUTGOING.NOTIFICATION.GENERAL,
      message,
      fontColor
    );
  }

  broadcastPlayerVerified(playerName, playerColor) {
    const addressVerified = "0x70a132fD4aA8bC967AB0D6fC2f55291Ad4Eb8908";
    const txHash = this.mintToken(addressVerified);
    this.sockets.emit(
      ServerConfig.IO.OUTGOING.NOTIFICATION.RAN_INTO_WALL,
      playerName,
      playerColor,
      addressVerified
    );
  }

  broadcastSuicide(victimName, victimColor) {
    this.sockets.emit(
      ServerConfig.IO.OUTGOING.NOTIFICATION.SUICIDE,
      victimName,
      victimColor
    );
  }

  notifyPlayerDied(playerId) {
    const playerSocket = this.sockets.connected[playerId];
    if (playerSocket) {
      playerSocket.emit(ServerConfig.IO.OUTGOING.NOTIFICATION.YOU_DIED);
    }
  }

  notifyPlayerMadeAKill(playerId) {
    const playerSocket = this.sockets.connected[playerId];
    if (playerSocket) {
      playerSocket.emit(ServerConfig.IO.OUTGOING.NOTIFICATION.YOU_MADE_A_KILL);
    }
  }

  notifyPlayerFoodCollected(playerId, text, coordinate, color, isSwap) {
    const playerSocket = this.sockets.connected[playerId];
    if (playerSocket) {
      playerSocket.emit(
        ServerConfig.IO.OUTGOING.NOTIFICATION.FOOD_COLLECTED,
        text,
        coordinate,
        color,
        isSwap
      );
    }
  }
}

module.exports = NotificationService;
