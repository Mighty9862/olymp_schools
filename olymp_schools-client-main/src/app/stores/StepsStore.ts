import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StepStore {
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

export const useStepStore = create<StepStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      resetStep: () => set({ currentStep: 1 }),
    }),
    {
      name: "step-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
