import { useState, useEffect } from "react";
import { useAddress, useNetworkMismatch, useEditionDrop } from "@thirdweb-dev/react";
import { useQuery, useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
/** Components */
import BounceLoader from "react-spinners/BounceLoader";
import Layout from "../components/Layout";
import WrongNetwork from "../components/WrongNetwork";

export default function Home() {
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const editionDrop = useEditionDrop("0x935bC28891D4587B5c534feA90347c7636908a32");
  const [hasFetchedTokens, setHasFetchedTokens] = useState(false);
  const [ownedTokenData, setOwnedTokenData] = useState([]);
  const [isMinting, setIsMinting] = useState(false);

  const { data, isFetching, isSuccess } = useQuery(
    ["Owned Tokens"],
    () => editionDrop.getOwned(address),
    {
      enabled: !!(address && !hasFetchedTokens),
    },
  );

  useEffect(() => {
    if (data?.length && isSuccess) {
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
      setHasFetchedTokens(false);
      setOwnedTokenData([]);
    }
  }, [address]);

  const mintMutation = useMutation(() => editionDrop.claim("0", 1), {
    onMutate: () => setIsMinting(true),
    onSuccess: () => {
      setHasFetchedTokens(false);
      toast.success("You have successfully minted a Decentrament DAO NFT!");
    },
    onError: () => {
      toast.error("Error minting the NFT");
    },
    onSettled: () => setIsMinting(false),
  });

  if (isMismatched) {
    return <WrongNetwork />;
  }

  return (
    <Layout className="py-4 text-center">
      <ToastContainer autoClose={5000} closeOnClick={true} />

      <h1 className="text-3xl text-brand-3 font-bold mt-8 mb-8">Decentrament DAO</h1>

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
        <section className="mb-10">
          <p className="mb-3">Mint a Decentrament DAO NFT for 0.1 Matic</p>
          <button
            className="button sm:text-base"
            onClick={mintMutation.mutate}
            disabled={isMinting}
          >
            {!isMinting ? "Mint" : "Minting..."}
          </button>

          <BounceLoader
            color="#9d46eb"
            loading={isMinting}
            size={100}
            css={{
              display: "block",
              margin: "40px auto 0",
            }}
          />
        </section>
      )}

      {address &&
        ownedTokenData?.map((tokenData) => {
          return (
            <section key={tokenData.metadata.image}>
              <h2 className="text-xl font-semibold mb-2">{tokenData.metadata.name}</h2>
              <p className="mb-5 text-sm">{tokenData.metadata.description}</p>
              <video loop autoPlay muted className="w-full max-w-[400px] rounded-xl mx-auto">
                <source src={tokenData?.metadata?.image} type="video/mp4" />
              </video>
              <p className="mt-10">Total number of NFTs minted: {tokenData.supply.toString()}</p>
            </section>
          );
        })}
    </Layout>
  );
}
