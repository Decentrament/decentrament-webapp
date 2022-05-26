import Head from "next/head";

export default function Layout({ title, keywords, description, children, className = "" }) {
  return (
    <div className="font-poppins bg-darkblue min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <div
        className={`text-white overflow-x-hidden min-h-screen max-w-2xl mx-auto border ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

Layout.defaultProps = {
  title: "Decentrament | Decentralized Autonomous Venture Capital",
  description:
    "Our vision is to decentralize the world. We invest early and we help teams to build the next cutting-edge technologies in the Web3 space.",
  keywords: "blockchain, dao, investing, decentrament, web3, vc, venture capital",
};
