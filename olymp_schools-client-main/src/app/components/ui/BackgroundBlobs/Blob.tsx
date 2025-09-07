import { m, Variants } from "framer-motion";

const blobAnimations: Record<string, Variants> = {
  rotating: {
    rotating: {
      rotate: 360,
      transition: {
        duration: 40,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },
  pulsing: {
    pulsing: {
      scale: [1, 1.2, 1],
      opacity: [0.8, 0.5, 0.8],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  floating: {
    floating: {
      y: ["0%", "-20%", "0%"],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  wave: {
    wave: {
      x: ["0%", "5%", "0%"],
      transition: {
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

interface BlobProps {
  type: keyof typeof blobAnimations;
  className: string;
}

export const Blob = ({ type, className }: BlobProps) => {
  return (
    <m.div
      initial={false}
      animate={type}
      variants={blobAnimations[type]}
      className={className}
    />
  );
};
