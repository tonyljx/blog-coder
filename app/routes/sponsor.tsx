import type { MetaFunction } from "react-router";
import { PlaceholderPage } from "~/components/placeholder-page";

export const meta: MetaFunction = () => [{ title: "Sponsor – Tony Liang" }];

export default function Sponsor() {
  return (
    <PlaceholderPage
      title="Sponsor"
      blurb="Get your brand in front of my audience across YouTube and the web."
    />
  );
}
