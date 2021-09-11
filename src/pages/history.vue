<template>
  <div>
    <p>{{ userOrders }}</p>
    <!-- <table>
      <tr>
        <td>#</td>
        <td>Order Numder</td>
        <td>Product Name</td>
        <td>Sum</td>
        <td>Count</td>
        <td>Summ Ord</td>
      </tr>
      <tr v-for="(item, index) in userOrders" :key="index">
        <td>{{ index }}</td>
        <td>{{ item.orderNumder }}</td>
        <td>{{ item.productName }}</td>
        <td>{{ item.sum }}</td>
        <td>{{ item.count }}</td>
        <td>{{ item.total }}</td>
      </tr>
    </table> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userOrders: fetch(
        "http://localhost:3000/userOrder?id=1@q" + this.$store.state.userEmail,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      ).then((response) => response.JSON()),
    };
  },
  methods: {
    /* getHisory(event, index) {
      fetch(
        "http://localhost:3000/userOrder/userOrder?id=" +
          this.$store.state.userEmail,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
        .then((Response) => Response.JSON())
        .then((result) => console.log(JSON.stringify(result, null, 2)));
    },*/
  },
};
</script>

<style>
</style>