import type { MetaFunction } from "react-router";
import { PlaceholderPage } from "~/components/placeholder-page";

export const meta: MetaFunction = () => [
  { title: "Inspiration – Tony Liang" },
];

export default function Inspiration() {
  return (
    <PlaceholderPage
      title="Inspiration"
      blurb="People and products whose design taste keeps me reaching higher."
    />
  );
}
