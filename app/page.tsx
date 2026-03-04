import Auth from "./(Auth)/Auth/(Auth-Conponent)/Auth";
import PublicRoute from "./Router/PublicRoute";

export default function Home() {
  return (
    <PublicRoute publicPage>
      <Auth />
    </PublicRoute>
  );
}