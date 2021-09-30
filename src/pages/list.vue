<template>
  <div>
    <ul>
      <li v-for="(prod, index) in prodList" :key="index">
        {{ prod.productName }} : {{ prod.sum }}
        <button
          v-if="prod.prodState === 'push'"
          v-on:click="addNew($event, index)"
        >
          Добавить в кoрзину
        </button>
        <button
          v-if="prod.prodState === 'del'"
          v-on:click="addOne($event, index)"
        >
          Добавить 1
        </button>
        <button
          v-if="prod.prodState === 'del'"
          v-on:click="delProd($event, index)"
        >
          Удалить из кoрзины
        </button>
      </li>
    </ul>
    <button id="goBasket" @click="goBasket">Перейти в корзину</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prodList: [
        { productName: "petr", sum: 1000, prodState: "push" },
        { productName: "ukr", sum: 5000, prodState: "push" },
        { productName: "makar", sum: 3000, prodState: "push" },
        { productName: "p", sum: 4500, prodState: "push" },
        { productName: "tom", sum: 2000, prodState: "push" },
      ],
      nextId: 1,
      userOrders: [],
    };
  },
  methods: {
    addNew(event, index) {
      let prod = this.prodList[index];
      this.$store.commit("addNew", { prod, nextId: this.nextId++ });
      prod.prodState = "del";
      this.writedb("PUT");
    },
    addOne(event, index) {
      let prod = this.prodList[index];
      this.$store.commit("addOne", { prod });
      this.writedb("PATCH");
    },
    delProd(event, index) {
      let prod = this.prodList[index];
      this.$store.commit("delProd", { prod });
      prod.prodState = "push";
      this.writedb("PATCH");
    },
    goBasket() {
      if (this.$store.state.userEmail === "") {
        //let url = new URL('login.html');
        //url.searchParams.set('redirectURL', 'order.html');
        this.$router.push("/log");
        //window.open(url, "_self")
      } else {
        this.$router.push("/index");
      }
    },
    writedb(meth) {
      let userOrder = {
        id: this.$store.state.userEmail,
        orders: this.$store.state.orders,
      };
      let strurl =
        "http://localhost:3000/userLog/" + this.$store.state.userEmail;
      fetch(strurl, {
        method: meth,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userOrder),
      })
        .then((response) => response.json())
        .then((result) => console.log(JSON.stringify(result, null, 2)));
    },
  },
};
</script>

<style>
</style>