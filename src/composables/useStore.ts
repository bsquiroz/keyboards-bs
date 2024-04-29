import dataKeyboard from "../assets/keyboard.json";
import { ref, computed } from "vue";

import { IKeyboard } from "../interfaces";

export const useStore = () => {
  const keyboards = ref<IKeyboard[]>(dataKeyboard);

  return {
    keyboards,
  };
};
