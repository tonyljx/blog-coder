import type { MetaFunction } from "react-router";
import { PlaceholderPage } from "~/components/placeholder-page";

export const meta: MetaFunction = () => [{ title: "Tweets – Tony Liang" }];

export default function Tweets() {
  return (
    <PlaceholderPage
      title="Tweets"
      blurb="A collection of my favourite threads and one-liners from X / Twitter."
    />
  );
}
