import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "../components/wallet/connectors";

export default function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    console.log("connecting");
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
          console.log("connected");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, [activate]);

  return (
    <div className="flex flex-col items-center justify-center">
      {console.log(active)}
      {console.log(connector)}
      {console.log(library)}
      <button
        onClick={connect}
        className="w-56 py-2 mt-20 mb-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-800"
      >
        Connect to MetaMask
      </button>
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
      <button
        onClick={disconnect}
        className="w-56 py-2 mt-20 mb-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-800"
      >
        Disconnect
      </button>
    </div>
  );
}
