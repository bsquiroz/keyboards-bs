import dataKeyboard from "../assets/keyboard.json";
import { ref, computed } from "vue";

import { IKeyboard } from "../interfaces";

const keyboards = ref<IKeyboard[]>(
  JSON.parse(localStorage.getItem("keyboards")!) || dataKeyboard
);

const cart = ref<IKeyboard[]>(JSON.parse(localStorage.getItem("cart")!) || []);

function findItem(id: number) {
  return ref(keyboards.value.find((keyboard) => keyboard.id === id));
}

export const useStore = () => {
  const addCart = (idKeyboard: number) => {
    const keyboardFound = findItem(idKeyboard);

    if (!keyboardFound.value) return;

    if (validationStock()) return alert("No tenemos mas en stock");

    const keyboardCartIndex = ref(
      cart.value.findIndex(
        (keyboard) => keyboard.id === keyboardFound.value!.id
      )
    );

    if (keyboardCartIndex.value === -1) {
      cart.value.push({
        ...keyboardFound.value,
        amount: 1,
      });
    } else {
      cart.value = cart.value.map((item) =>
        item.id === keyboardFound.value!.id
          ? { ...item, amount: item.amount! + 1 }
          : item
      );
    }

    localStorage.setItem("cart", JSON.stringify(cart.value));

    function validationStock() {
      const keyboardInStock = keyboards.value.find(
        (item) => item.id === keyboardFound.value!.id
      );

      const keyboardInCart = cart.value.find(
        (item) => item.id === keyboardFound.value!.id
      );

      return keyboardInCart?.amount! >= keyboardInStock?.stock!;
    }
  };

  const restCart = (idKeyboard: number) => {
    const keyboardFound = findItem(idKeyboard);

    if (!keyboardFound.value) return;

    if (keyboardFound.value.amount === 1) {
      deleteCart(keyboardFound.value?.id);
    } else {
      keyboardFound.value.amount!--;
    }

    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const deleteCart = (idKeyboard: number) => {
    const indexDelete = cart.value.findIndex(({ id }) => id === idKeyboard);
    cart.value.splice(indexDelete, 1);

    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const infoCart = computed(() => {
    return cart.value.reduce(
      (ac, cu) => {
        if (cu.amount) {
          ac.totalItem += cu.amount;
          ac.totalPrice += cu.amount * cu.price;
        }

        return ac;
      },
      {
        totalItem: 0,
        totalPrice: 0,
      }
    );
  });

  return {
    keyboards,
    addCart,
    restCart,
    deleteCart,
    cart,
    infoCart,
  };
};
