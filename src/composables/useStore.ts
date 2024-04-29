import dataKeyboard from "../assets/keyboard.json";
import { ref } from "vue";

import { IKeyboard } from "../interfaces";

const keyboards = ref<IKeyboard[]>(dataKeyboard);
const cart = ref<IKeyboard[]>([]);

export const useStore = () => {
  const addCart = (idKeyboard: number) => {
    const keyboardFound = ref(
      keyboards.value.find((keyboard) => keyboard.id === idKeyboard)
    );

    if (!keyboardFound.value) return;

    const keyboardCartIndex = ref(
      cart.value.findIndex(
        (keyboard) => keyboard.id === keyboardFound.value!.id
      )
    );

    if (keyboardCartIndex.value === -1) {
      keyboardFound.value.amount = 1;
      cart.value.push(keyboardFound.value);
    } else {
      keyboardFound.value.amount!++;
    }
  };

  return {
    keyboards,
    addCart,
    cart,
  };
};
