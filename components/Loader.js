// Barcode scanner loader — bars inspired by Code-128 pattern
const BARS = [
  { x: 0,   w: 3 },
  { x: 5,   w: 8 },
  { x: 15,  w: 2 },
  { x: 19,  w: 5 },
  { x: 26,  w: 8 },
  { x: 36,  w: 3 },
  { x: 41,  w: 2 },
  { x: 45,  w: 6 },
  { x: 53,  w: 3 },
  { x: 58,  w: 8 },
  { x: 68,  w: 2 },
  { x: 72,  w: 5 },
  { x: 79,  w: 3 },
  { x: 84,  w: 8 },
  { x: 94,  w: 2 },
  { x: 98,  w: 6 },
  { x: 106, w: 3 },
  { x: 111, w: 8 },
];

const Loader = () => (
  <div className="loader">
    <div className="loader__wrap">
      <svg
        viewBox="0 0 122 48"
        width="200"
        height="80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {BARS.map(({ x, w }, i) => (
          <rect key={i} x={x} y="0" width={w} height="48" fill="#d6f31f" />
        ))}
      </svg>
      <div className="loader__scanner" />
    </div>
  </div>
);

export default Loader;
