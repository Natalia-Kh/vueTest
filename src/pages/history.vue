<template>
  <div>
    <p>{{ userOrders.fullName }}</p>
    <table v-for="(item, index) in userOrders" :key="index">
      <tr>
        <td>#</td>
        <td>Order Numder</td>
        <td>Product Name</td>
        <td>Sum</td>
        <td>Count</td>
        <td>Summ Ord</td>
      </tr>
      <tr v-for="(itemt, indext) in userOrders[index].orders" :key="indext">
        <td>{{ indext }}</td>
        <td>{{ itemt.orderNumder }}</td>
        <td>{{ itemt.productName }}</td>
        <td>{{ itemt.sum }}</td>
        <td>{{ itemt.count }}</td>
        <td>{{ itemt.total }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userOrders: [],
    };
  },
  mounted() {
    let strurl =
      "http://localhost:3000/userOrder?" + this.$store.state.userEmail;
    fetch(strurl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log("data", data);
        this.userOrders = data;
      });
  },
};
</script>

<style>
</style>