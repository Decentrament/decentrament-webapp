import { useState, useEffect } from "react";
import { useAddress, useNetworkMismatch, useEditionDrop } from "@thirdweb-dev/react";
import { useQuery } from "react-query";
/** Components */
import Layout from "../components/Layout";
import WrongNetwork from "../components/WrongNetwork";
import BounceLoader from "react-spinners/BounceLoader";

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
    if (data?.length && isSuccess) {
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
    <Layout className="py-4 text-center">
      <h1 className="text-3xl text-brand-3 font-bold mb-8">Decentrament DAO</h1>

      <BounceLoader
        color="#9d46eb"
        loading={isFetching}
        size={150}
        css={{
          display: "block",
          margin: "40px auto 0",
        }}
      />

      {address && !ownedTokenData.length && hasFetchedTokens && (
        <section>
          <p className="mb-3">Mint a Decentrament DAO NFT for 0.1 Matic</p>
          <button className="sm:text-base" onClick={onMint}>
            Mint
          </button>
        </section>
      )}

      {address &&
        ownedTokenData?.map((tokenData) => {
          return (
            <div key={tokenData.metadata.image}>
              <h2 className="text-xl font-semibold mb-2">{tokenData.metadata.name}</h2>
              <p className="mb-5">{tokenData.metadata.description}</p>
              <video loop autoPlay muted className="max-w-[400px] rounded-xl mx-auto">
                <source src={tokenData?.metadata?.image} type="video/mp4" />
              </video>
            </div>
          );
        })}
    </Layout>
  );
}
