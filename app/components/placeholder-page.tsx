import Container from "./container";
import { Subheading } from "./subheading";

export const PlaceholderPage = ({
  title,
  blurb,
}: {
  title: string;
  blurb: string;
}) => {
  return (
    <Container className="pt-6">
      <Subheading>{title}</Subheading>
      <p className="text-foreground/70 mt-4 text-base text-balance">{blurb}</p>
      <p className="text-foreground/40 mt-2 font-mono text-sm">Coming soon.</p>
    </Container>
  );
};
