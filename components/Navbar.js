import { useMetamask, useDisconnect, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { truncateString } from "../utils/strings";

const Navbar = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (
    <nav className="content flex justify-between overflow-x-hidden py-2 border-b">
      <Link href="/">
        <a className="flex items-center w-10">
          <img src="/logo.png" alt="Decentrament logo" />
        </a>
      </Link>

      <div className="flex items-center justify-end">
        {address && (
          <p className="hidden sm:block mr-3 text-sm tracking-widest uppercase">
            {truncateString(address)}
          </p>
        )}
        {!address ? (
          <button className="button" onClick={connectWithMetamask}>
            Connect
          </button>
        ) : (
          <button className="button bg-gray-400 hover:bg-gray-500" onClick={disconnectWallet}>
            Disconnect
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
