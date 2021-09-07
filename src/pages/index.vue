<template>
  <div id="app">
    <input type="text" v-model="fioCl" placeholder="ФИО" />
    <input type="text" v-model="telCl" placeholder="Номер телефона" />
    <input type="text" v-model="adrCl" placeholder="Адрес" />
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
      fioCl: "",
      telCl: "",
      adrCl: "",
    };
  },
  beforeMount() {
    //this.inpCount();
  },
  methods: {
    inpCount(event, index) {
      let currentCount = event.target.value;
      this.$store.commit("inpCount", { currentCount, index });
    },
    sendOrder() {
      if (!this.validate_inp()) {
        return false;
      }
      let objCl = {
        fioCl: this.fioCl,
        telCl: this.telCl,
        adrCl: this.adrCl,
        ordCl: this.orders,
      };
      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(objCl),
      })
        .then((Response) => Response.JSON())
        .then((result) => console.log(JSON.stringify(result, null, 2)));
    },
    validate_inp() {
      let valid = true;
      if (this.fioCl == "") {
        alert("Пожалуйста заполните ФИО");
        valid = false;
      }
      let numtel = this.telCl;
      if (numtel == "") {
        console.log("Пожалуйста заполните номер телефона");
        valid = false;
      }
      let regex = /^[\]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im;
      if (!numtel.match(regex)) {
        console.log("Пожалуйста заполните номер телефона");
        valid = false;
      }
      if (this.adrCl == "") {
        console.log("Пожалуйста заполните адресс");
        valid = false;
      }
      return valid;
    },
  },
  computed: {
    getSum() {
      return this.$store.state.orders.reduce(
        (infOrd, orders) => {
          infOrd.min = infOrd.min > orders.sum ? orders.sum : infOrd.min;
          infOrd.max = infOrd.max < orders.sum ? orders.sum : infOrd.max;
          infOrd.sum = +orders.sum + infOrd.sum;
          infOrd.total = +orders.total + infOrd.total;
          return infOrd;
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
