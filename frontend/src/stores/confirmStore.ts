import { create } from "zustand";
import { persist } from "zustand/middleware";

const ActionType = {
  DELETE_PROJECT: "DELETE_PROJECT",
  DELETE_TASK: "DELETE_TASK",
} as const;

export type ActionType = (typeof ActionType)[keyof typeof ActionType];

interface ConfirmState {
  skippedActions: ActionType[];
  isVisible: boolean;
  message: string;
  actionType: ActionType | null; 
  onConfirm: () => void;
  hideModal: () => void;
  showModal: (message: string, onConfirm: () => void, actionType?: ActionType) => void;
  skipAction: (action: ActionType) => void;
}

const useConfirmStore = create<ConfirmState>()(
  persist(
    (set, get) => ({
      isVisible: false,
      message: "",
      skippedActions: [],
      actionType: null,
      onConfirm: () => {},
      showModal: (message, onConfirm, actionType) => {
        if (actionType && get().skippedActions.includes(actionType)) {
          onConfirm();
          return;
        }

        set({ message, isVisible: true, onConfirm, actionType });
      },
      hideModal: () => {
        set({ isVisible: false, message: "", onConfirm: () => {}, actionType: null });
      },
      skipAction: (action) => {
        set((state) => ({
          skippedActions: [...(state.skippedActions || []), action],
        }));
      },
    }),
    {
      name: "confirm-store",
      partialize: (state) => ({ skippedActions: state.skippedActions }),
    }
  )
);

export default useConfirmStore;
