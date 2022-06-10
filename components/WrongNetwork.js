import Layout from "./Layout";

export default function WrongNetwork() {
  return (
    <Layout className="py-4 text-center">
      <h1 className="text-3xl text-brand-3 font-bold mt-8 mb-8">Decentrament DAO</h1>

      <h2 className="text-xl text-red-500">Please change your network to Polygon Mumbai</h2>
    </Layout>
  );
}
