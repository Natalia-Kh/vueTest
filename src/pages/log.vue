<template>
  <div>
    <input type="text" v-model="userEmail" placeholder="Email" />
    <input type="text" v-model="password" placeholder="Пароль" />
    <button @click="login">Войти</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      userEmail: "",
    };
  },
  methods: {
    login() {
      if (!this.validate_user()) {
        return false;
      }
      let arrUs = [
        { email: "1@q", password: "1" },
        { email: "2@q", password: "2" },
        { email: "3@q", password: "3" },
      ];
      let user = arrUs.find((el) => el.email == this.userEmail);
      if (user == undefined) {
        console.log("Пользователь ненайден");
        return false;
      }
      if (user.password != this.password) {
        console.log("Пароль неверный");
        return false;
      }

      this.$store.commit("addEmail", { userEmail: this.userEmail });

      if (this.$store.state.orders.length == 0) {
        this.$router.push("/");
      } else {
        this.$router.push("/index");
      }
    },
    validate_user() {
      let valid = true;
      if (this.userEmail == "") {
        window.location.search.split("redirectURL=")[1];
        console.log("Пожалуйста заполние Email");
        valid = false;
      }
      if (this.password == "") {
        console.log("Пожалуйста заполние пароль");
        valid = false;
      }
      return valid;
    },
  },
};
</script>

<style>
</style>