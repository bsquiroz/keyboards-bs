import dataKeyboard from "../assets/keyboard.json";
import { ref, computed, watch } from "vue";

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
    const keyboardCart = cart.value.find((item) => item.id === idKeyboard);

    if (!keyboardCart) return;

    if (keyboardCart.amount === 1) {
      deleteCart(idKeyboard);
    } else {
      cart.value = cart.value.map((item) =>
        item.id === idKeyboard ? { ...item, amount: item.amount! - 1 } : item
      );
    }
  };

  const deleteCart = (idKeyboard: number) => {
    const indexDelete = cart.value.findIndex(({ id }) => id === idKeyboard);
    cart.value.splice(indexDelete, 1);
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

  watch(cart, () => localStorage.setItem("cart", JSON.stringify(cart.value)), {
    deep: true,
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
