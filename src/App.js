import React, { useEffect, useState } from "react";
import "./App.css";
import contract from "./contracts/Legionx.json";
import { ethers } from "ethers";
const axios = require("axios").default;

const contractAddress = "0x9c906fa40cdf41068d894143d868b0ca2e001d97";
const abi = contract.abi;
console.log(abi);
function App() {
  const { ethereum } = window;

  const [currentAccount, setCurrentAccount] = useState(null);

  const [provider, setProvider] = useState({});

  const [requestAccounts, setRequestAccounts] = useState([]);
  const signer = provider.getSigner();

  useEffect(() => {
    onMountFunction();
  }, []);

  const onMountFunction = async () => {
    if (!ethereum) {
      console.log("please install metamask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    //================================
    //================================
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found a valid account ", account);
      setCurrentAccount(account);
    } else {
      console.log("No valid account");
    } //we take men hayde currentAccount

    //================================
    //================================
    const requestAccounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Found an account! Address: ", accounts[0]);
    setCurrentAccount(accounts[0]);
    if (ethereum) {
    }
  };

  // =================================
  // =================================
  // =================================
  // =================================
  // =================================
  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Please install metamask");
      return;
    } else {
      console.log("Wallet exists");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found a valid account ", account);
      setCurrentAccount(account);
    } else {
      console.log("No valid account");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const legionx = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await legionx.mint(1, {
          value: ethers.utils.parseEther("0.1"),
        });

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const makeAPICAll = () => {
    const url =
      "https://fiwb3gpwt2.execute-api.eu-west-1.amazonaws.com/Genysis/";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    return axios
      .get(url + signer)
      .then(function (response) {
        // handle success
        console.log("response", response);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .then(function () {
        // always executed
      });
  };

  const preSale = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);

        if (signer) {
          const legionx = new ethers.Contract(contractAddress, abi, signer);
          makeAPICAll();
          let nftTxn = await legionx.setPublicSalePhase(10);
          await nftTxn.wait();
        } else {
          console.log("no signer error");
        }
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const setWhitelistPhase = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const legionx = new ethers.Contract(contractAddress, abi, signer);
        let nftTxn = await legionx.setWhitelistPhase(
          10,
          "0x91fbb24ffc5eaad05dfd2ee5fb824f9d2ee423050452a27ec82eca70800d1069",
          10
        );
        await nftTxn.wait();
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const setPaused = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const legionx = new ethers.Contract(contractAddress, abi, signer);
        let nftTxn = await legionx.setPaused(false);
        await nftTxn.wait();
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className="cta-button mint-nft-button">
        Mint NFT
      </button>
    );
  };
  const setPauseButton = () => {
    return (
      <button onClick={setPaused} className="cta-button set-Pause-button">
        Set pause
      </button>
    );
  };
  const setPresaleButton = () => {
    return (
      <button onClick={preSale} className="cta-button set-Presale-button">
        Set Presale
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="main-app">
      <h1>mint button</h1>
      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
        {setPauseButton()}
        {setPresaleButton()}
        <button onClick={makeAPICAll}>for george</button>
      </div>
    </div>
  );
}

export default App;
