import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout({ title, keywords, description, children, className = "" }) {
  return (
    <div className="font-poppins bg-darkblue text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Navbar />

      <div className={`overflow-x-hidden min-h-screen content ${className}`}>{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: "Decentrament | Decentralized Autonomous Venture Capital",
  description:
    "Our vision is to decentralize the world. We invest early and we help teams to build the next cutting-edge technologies in the Web3 space.",
  keywords: "blockchain, dao, investing, decentrament, web3, vc, venture capital",
};
