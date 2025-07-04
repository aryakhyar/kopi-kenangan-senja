document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Americano Coffe", img: "produk1.jpg", price: 15000 },
      { id: 2, name: "Latte Coffe", img: "produk2.jpg", price: 15000 },
      { id: 3, name: "Black Coffe", img: "produk3.jpg", price: 15000 },
      { id: 4, name: "Esspresso Coffe", img: "produk4.jpg", price: 15000 },
      { id: 5, name: "Cappuccino Coffe", img: "produk5.jpg", price: 15000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    qty: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //
      if (!cartItem) {
        this.items.push({ ...newItem, qty: 1, total: newItem.price });
        this.qty++;
        this.total += newItem.price;
      } else {
        //
        this.items = this.items.map((item) => {
          //
          if (item.id !== newItem.id) {
            return item;
          } else {
            //
            item.qty++;
            item.total = item.price * item.qty;
            this.qty++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      //
      const cartItem = this.items.find((item) => item.id === id);

      //
      if (cartItem.qty > 1) {
        //
        this.items = this.items.map((item) => {
          //
          if (item.id !== id) {
            return item;
          } else {
            item.qty--;
            item.total = item.price * item.qty;
            this.qty--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.qty === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.qty--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Konversi Rupiah

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
