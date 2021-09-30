<template>
  <div id="app">
    <input type="text" v-model="fullName" placeholder="ФИО" />
    <input type="text" v-model="phoneNumber" placeholder="Номер телефона" />
    <input type="text" v-model="address" placeholder="Адрес" />
    <table>
      <tr>
        <td>#</td>
        <td>Order Numder</td>
        <td>Product Name</td>
        <td>Sum</td>
        <td>Count</td>
        <td>Summ Ord</td>
      </tr>
      <tr v-for="(item, index) in orders" :key="index">
        <td>{{ index }}</td>
        <td>{{ item.orderNumder }}</td>
        <td>{{ item.productName }}</td>
        <td>{{ item.sum }}</td>
        <td>
          <input
            v-model="item.count"
            type="number"
            class="inpCoun"
            @input="inpCount($event, index)"
          />
        </td>
        <td>{{ item.total }}</td>
      </tr>
      <tr>
        <td>min : {{ getSum.min }}</td>
        <td>max : {{ getSum.max }}</td>
        <td>sum : {{ getSum.sum }}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{{ getSum.total }}</td>
      </tr>
    </table>
    <button id="sendOrder" @click="sendOrder">Отправить заказ</button>
    <button id="getHistory" @click="getHistory">
      Показать историю заказов
    </button>
    <button id="logout" @click="logout">Выйти</button>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      orders: this.$store.state.orders,
      total: 0,
      fullName: "",
      phoneNumber: "",
      address: "",
    };
  },
  beforeMount() {
    //this.inpCount();
  },
  methods: {
    inpCount(event, index) {
      let currentCount = event.target.value;
      this.$store.commit("inpCount", { currentCount, index });
      let userOrder = {
        id: this.$store.state.userEmail,
        orders: this.$store.state.orders,
      };
      let strurl =
        "http://localhost:3000/userLog/" + this.$store.state.userEmail;
      fetch(strurl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userOrder),
      })
        .then((response) => response.json())
        .then((result) => console.log(JSON.stringify(result, null, 2)));
    },
    logout() {
      fetch("http://localhost:3000/userLog/" + this.$store.state.userEmail, {
        method: "DELETE",
      });

      this.$store.commit("addEmail", { userEmail: "" });
      this.$router.push("/log");
    },
    getHistory() {
      this.$router.push("/history");
    },
    sendOrder() {
      if (!this.validate_inp()) {
        return false;
      }
      let userOrder = {
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        address: this.address,
        id: this.$store.state.userEmail,
        orders: this.orders,
      };

      fetch("http://localhost:3000/userOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userOrder),
      })
        .then((Response) => Response.JSON())
        .then((result) => console.log(JSON.stringify(result, null, 2)));
    },
    validate_inp() {
      let valid = true;
      if (this.fullName == "") {
        alert("Пожалуйста заполните ФИО");
        valid = false;
      }
      let num = this.phoneNumber;
      if (num == "") {
        console.log("Пожалуйста заполните номер телефона");
        valid = false;
      }
      let regex = /^[\]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im;
      if (!num.match(regex)) {
        console.log("Пожалуйста заполните номер телефона");
        valid = false;
      }
      if (this.address == "") {
        console.log("Пожалуйста заполните адресс");
        valid = false;
      }
      return valid;
    },
  },
  computed: {
    getSum() {
      return this.$store.state.orders.reduce(
        (userOrder, orders) => {
          userOrder.min =
            userOrder.min > orders.sum ? orders.sum : userOrder.min;
          userOrder.max =
            userOrder.max < orders.sum ? orders.sum : userOrder.max;
          userOrder.sum = +orders.sum + userOrder.sum;
          userOrder.total = +orders.total + userOrder.total;
          return userOrder;
        },
        {
          min:
            this.$store.state.orders.length == 0
              ? 0
              : this.$store.state.orders[0].sum,
          max: 0,
          sum: 0,
          total: 0,
        }
      );
    },
  },
};
</script>

<style>
#app {
}
</style>
