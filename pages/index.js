import { useState, useEffect } from "react";
import {
  useMetamask,
  useDisconnect,
  useAddress,
  useNetworkMismatch,
  useEditionDrop,
} from "@thirdweb-dev/react";
/** Components */
import Layout from "../components/Layout";

export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const isMismatched = useNetworkMismatch();
  const editionDrop = useEditionDrop("0x935bC28891D4587B5c534feA90347c7636908a32");
  const [ownedTokenData, setOwnedTokenData] = useState();

  useEffect(() => {
    const getNftInfoForAddress = async () => {
      if (address && editionDrop) {
        const allTokens = await editionDrop.getAll();
        const addressTokens = await editionDrop.getOwned(address);
        const totalCount = await editionDrop.getTotalCount();
        console.log("getAll", allTokens);
        console.log("getOwned", addressTokens);
        console.log("getTotalCount", totalCount.toNumber());
        setOwnedTokenData(addressTokens[0]);
      }
    };

    getNftInfoForAddress();
  }, [address, editionDrop]);

  return (
    <Layout>
      <h1>Decentrament Web App</h1>

      {isMismatched && <p className="text-red-500">Please change your network to Polygon Mumbai</p>}

      {!address ? <h1>Not connected</h1> : <h1>Connected: {address}</h1>}
      {!address ? (
        <button className="p-2 bg-orange-400" onClick={connectWithMetamask}>
          Connect Metamask
        </button>
      ) : (
        <button className="p-2 bg-gray-400" onClick={disconnectWallet}>
          Disconnect
        </button>
      )}

      {ownedTokenData && (
        <div>
          <video loop autoPlay muted className="object-cover h-128 w-full">
            <source src={ownedTokenData?.metadata?.image} type="video/mp4" />
          </video>
          <p>Token ID: {ownedTokenData.metadata.id.toNumber()}</p>
        </div>
      )}
    </Layout>
  );
}
