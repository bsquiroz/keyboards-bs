import dataKeyboard from "../assets/keyboard.json";
import { ref, computed, watch } from "vue";

import { IKeyboard } from "../interfaces";

const keyboards = ref<IKeyboard[]>(
  JSON.parse(localStorage.getItem("keyboards")!) || dataKeyboard
);

const cart = ref<IKeyboard[]>(JSON.parse(localStorage.getItem("cart")!) || []);

const keyboardSelect = ref<IKeyboard>();

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
    const res = confirm("Seguro quieres eliminar este producto?");
    if (!res) return;

    const indexDelete = cart.value.findIndex(({ id }) => id === idKeyboard);
    cart.value.splice(indexDelete, 1);
  };

  const buyCart = () => {
    const res = confirm("Seguro quieres hacer la compra?");
    if (!res) return;

    const cartObj = cart.value.reduce((ac: Record<number, IKeyboard>, cu) => {
      ac[cu.id] = { ...cu };
      return ac;
    }, {});

    keyboards.value = keyboards.value.map((keyboard) => {
      const keyBoardId = keyboard.id;

      return keyBoardId === cartObj[keyBoardId]?.id
        ? {
            ...keyboard,
            stock: keyboard.stock - cartObj[keyBoardId].amount!,
          }
        : keyboard;
    });

    cart.value = [];

    localStorage.setItem("cart", JSON.stringify(cart.value));
    localStorage.setItem("keyboards", JSON.stringify(keyboards.value));
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

  const handleShowModalKeyboard = (id?: number) => {
    if (!id) return (keyboardSelect.value = undefined);

    const keyboard = keyboards.value.find((keyboard) => keyboard.id === id);
    keyboardSelect.value = keyboard;
  };

  watch(cart, () => localStorage.setItem("cart", JSON.stringify(cart.value)), {
    deep: true,
  });

  return {
    keyboards,
    addCart,
    restCart,
    deleteCart,
    buyCart,
    cart,
    infoCart,
    keyboardSelect,
    handleShowModalKeyboard,
  };
};
