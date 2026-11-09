import { create } from "zustand";

export const useAlertStore = create((set) => ({
  isOpen: false,
  type: "success",
  title: "",
  message: "",
  buttonText: "OKE",
  onConfirm: null,

  showAlert: ({
    type = "success",
    title = "",
    message = "",
    buttonText = "OKE",
    onConfirm = null,
  }) => {
    set({
      isOpen: true,
      type,
      title,
      message,
      buttonText,
      onConfirm,
    });
  },

  closeAlert: () => {
    set({ isOpen: false });
  },
}));

