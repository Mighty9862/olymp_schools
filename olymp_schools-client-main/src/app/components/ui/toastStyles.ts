export const getCustomToastStyle = (isDarkMode: boolean) => ({
  style: {
    background: isDarkMode
      ? "linear-gradient(to right, oklch(42.4% 0.199 265.638), oklch(37.9% 0.146 265.522)"
      : "linear-gradient(to bottom right, rgb(239, 246, 255, 0.95), rgba(219, 234, 254, 0.98), rgb(191, 219, 254))",

    color: isDarkMode ? "white" : "#0f172a",
  },
});
