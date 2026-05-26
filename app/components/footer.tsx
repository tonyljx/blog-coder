import Container from "./container";
import { ExternalLink } from "./external-link";

const SHOW_SIGNATURE = false;

export const Footer = () => {
  return (
    <Container className="pb-10">
      <footer className="my-8 flex flex-col items-center gap-4">
        {SHOW_SIGNATURE ? <Signature /> : null}
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-foreground/40 text-center text-sm text-balance">
            Built by yours truly. Here's the{" "}
            <ExternalLink href="https://github.com/manuarora700/manuarora.in">
              code
            </ExternalLink>{" "}
            and{" "}
            <ExternalLink href="https://www.youtube.com/@manuarora">
              video
            </ExternalLink>{" "}
            explaining it.
          </p>
          <p className="text-foreground/40 text-sm text-balance">
            Website heavily inspired by{" "}
            <ExternalLink href="https://designerdada.com">
              Akash Bhadange
            </ExternalLink>
          </p>
        </div>
      </footer>
    </Container>
  );
};

const Signature = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="95.78 34.62 864.22 455.94"
      role="img"
      aria-labelledby="svg-title svg-desc"
      className="mx-auto h-16 w-auto sm:h-20"
    >
      <title id="svg-title">Hand-Writing SVG Generator Output</title>
      <desc id="svg-desc">
        Animated SVG generated from multiple hand-drawn canvas strokes.
      </desc>
      <g>
        <path
          id="7d906538-1659-45c4-a728-409ba6c75cfe"
          d="M 129.8 87.2 Q 129.8 87.2 233 77.9 Q 336.2 68.6 302.85 80.75 Q 269.5 92.9 259.35 99.4 Q 249.2 105.9 252.65 151.6 Q 256.1 197.3 249.25 274.95 Q 242.4 352.6 307.5 292.55 Q 372.6 232.5 361.3 256.45 Q 350 280.4 347.9 294.65 Q 345.8 308.9 351.6 308.1 Q 357.4 307.3 364.45 302.05 Q 371.5 296.8 390.95 275.6 Q 410.4 254.4 416.45 243.1 Q 422.5 231.8 425.95 217.75 Q 429.4 203.7 424.8 203.65 Q 420.2 203.6 407.9 214.65 Q 395.6 225.7 394.2 235.4 Q 392.8 245.1 404.3 242.4 Q 415.8 239.7 444.05 221.9 Q 472.3 204.1 473.45 232.25 Q 474.6 260.4 484.05 238.65 Q 493.5 216.9 498.5 212.85 Q 503.5 208.8 511.85 224.45 Q 520.2 240.1 539 218.25 Q 557.8 196.4 594.15 166.65 Q 630.5 136.9 636.6 127.85 Q 642.7 118.8 635.1 243.9 Q 627.5 369 618.25 400.9 Q 609 432.8 602.65 439.9 Q 596.3 447 579.5 451.8 Q 562.7 456.6 518.7 451.5 Q 474.7 446.4 460.2 441.95 Q 445.7 437.5 461.3 423.55 Q 476.9 409.6 536.1 380.85 Q 595.3 352.1 742.7 309.5 Q 890.1 266.9 925.05 252.3 L 960 237.7"
          fill="none"
          stroke="#161a1d"
          strokeWidth="12.00"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2474.12 2474.12"
          strokeDashoffset="2474.12"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            begin="0.000s"
            dur="0.001s"
            from="0"
            to="1"
            fill="freeze"
          />
          <animate
            attributeName="stroke-dashoffset"
            begin="0.000s"
            dur="1.237s"
            from="2474.12"
            to="0"
            fill="freeze"
            calcMode="spline"
            keySplines="0.65 0 0.35 1"
            keyTimes="0;1"
          />
        </path>
      </g>
    </svg>
  );
};
