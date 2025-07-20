import { m } from "framer-motion";
import { Blob } from "./Blob";

export const BackgroundBlobs = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <Blob
        type="rotating"
        className="absolute -top-60 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-900/10 to-purple-900/10 blur-[100px]"
      />

      <Blob
        type="pulsing"
        className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-800/10 blur-[90px]"
      />

      <Blob
        type="floating"
        className="absolute top-1/4 left-1/3 h-40 w-40 rounded-full bg-purple-500/5 blur-[60px]"
      />

      <Blob
        type="wave"
        className="absolute -bottom-40 left-1/2 h-[300px] w-[600px] -skew-y-12 bg-gradient-to-r from-blue-700/10 to-purple-700/10 blur-[80px]"
      />

      <Blob
        type="floating"
        className="absolute top-2/4 right-20 h-32 w-32 rounded-full bg-cyan-400/10 blur-[50px]"
      />

      <Blob
        type="rotating"
        className="absolute bottom-1/4 left-20 h-28 w-28 rounded-full bg-indigo-500/10 blur-[40px]"
      />
    </m.div>
  );
};
