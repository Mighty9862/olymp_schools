import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IForm } from "../types/IForm.type";

interface RegistrationData {
  auth?: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  profile?: Partial<IForm>;
  currentStep?: number;
}

interface RegistrationStore {
  registrationData: RegistrationData;
  setRegistrationData: (data: RegistrationData) => void;
  clearRegistrationData: () => void;
}

export const useRegistrationStore = create<RegistrationStore>()(
  persist(
    (set) => ({
      registrationData: {},
      setRegistrationData: (data) => set({ registrationData: data }),
      clearRegistrationData: () => set({ registrationData: {} }),
    }),
    {
      name: "registration-storage",
    },
  ),
);
