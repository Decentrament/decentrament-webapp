import { useState, useEffect } from "react";
import { useAddress, useNetworkMismatch, useEditionDrop } from "@thirdweb-dev/react";
import { useQuery } from "react-query";
/** Components */
import Layout from "../components/Layout";
import WrongNetwork from "../components/WrongNetwork";

export default function Home() {
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const editionDrop = useEditionDrop("0x935bC28891D4587B5c534feA90347c7636908a32");
  const [hasFetchedTokens, setHasFetchedTokens] = useState(false);
  const [ownedTokenData, setOwnedTokenData] = useState([]);

  const { data, isFetching, isSuccess } = useQuery(
    ["Owned Tokens"],
    () => editionDrop.getOwned(address),
    {
      enabled: !!(address && !hasFetchedTokens),
    },
  );
  console.log("getOwned", address, data, isFetching, isSuccess);

  useEffect(() => {
    if (data.length && isSuccess) {
      console.log("ho");

      setOwnedTokenData(data);
    }
  }, [data]);

  useEffect(() => {
    if (address && isSuccess && !isFetching) {
      setHasFetchedTokens(true);
    }
  }, [address, isSuccess, isFetching]);

  useEffect(() => {
    if (!address) {
      console.log("hey");
      setHasFetchedTokens(false);
      setOwnedTokenData([]);
    }
  }, [address]);

  const onMint = async () => {
    try {
      const result = await editionDrop.claim("0", 1);
      console.log({ result });
    } catch (error) {
      console.error("Failed to mint NFT", error);
    }
  };

  if (isMismatched) {
    return <WrongNetwork />;
  }

  return (
    <Layout className="py-4">
      <h1 className="text-3xl font-bold text-center">Decentrament Web App</h1>

      {isFetching && <p>isFetching</p>}

      {address && !ownedTokenData.length && hasFetchedTokens && (
        <button className="" onClick={onMint}>
          Mint
        </button>
      )}

      {address &&
        ownedTokenData?.map((tokenData) => {
          return (
            <div key={tokenData.metadata.image}>
              <video loop autoPlay muted className="object-cover h-128 w-full">
                <source src={tokenData?.metadata?.image} type="video/mp4" />
              </video>
              <p>Token ID: {tokenData?.metadata?.id.toNumber()}</p>
            </div>
          );
        })}
    </Layout>
  );
}
