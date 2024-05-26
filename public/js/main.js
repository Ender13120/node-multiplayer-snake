import GameController from "./controller/game-controller.js";

document.addEventListener("DOMContentLoaded", () => {
  function isMetaMaskInstalled() {
    return typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
  }

  const verificationButton = document.getElementById("verificationButton");
  const verificationOverlay = document.getElementById("verificationOverlay");

  verificationButton.addEventListener("click", function () {
    verificationOverlay.style.display = "none";
  });

  const gameController = new GameController();
  gameController.connect(io);

  async function connectMetaMask() {
    if (isMetaMaskInstalled()) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected accounts:", accounts);
        return accounts[0]; // Use the first account
      } catch (error) {
        console.error("Failed to connect MetaMask", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  // Listen for account and network changes
  ethereum.on("accountsChanged", function (accounts) {
    console.log("Accounts changed:", accounts);
  });

  ethereum.on("chainChanged", (chainId) => {
    console.log("Chain changed:", chainId);
    window.location.reload();
  });

  // Setup the connect button
  const connectButton = document.getElementById("connectButton");
  connectButton.addEventListener("click", connectMetaMask);
});
