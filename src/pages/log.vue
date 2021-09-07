<template>
  <div>
    <input type="text" v-model="emailCl" placeholder="Email" />
    <input type="text" v-model="passCl" placeholder="Пароль" />
    <button @click="onlk">Войти</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passCl: "",
      emailCl: "",
    };
  },
  methods: {
    onlk() {
      if (!this.validate_inp()) {
        return false;
      }
      let arrUs = [
        { emailCL: "1@q", pass: "1" },
        { emailCL: "2@q", pass: "2" },
        { emailCL: "3@q", pass: "3" },
      ];
      let userCL = arrUs.find((el) => el.emailCL == this.emailCl);
      if (userCL == undefined) {
        console.log("Пользователь ненайден");
        return false;
      }
      if (userCL.pass != this.passCl) {
        console.log("Пароль неверный");
        return false;
      }

      this.$store.commit("addEmail", { emailCl: this.emailCl });

      if (this.$store.state.orders.length == 0) {
        this.$router.push("/");
      } else {
        this.$router.push("/index");
      }
    },
    validate_inp() {
      let valid = true;
      if (this.emailCL == "") {
        window.location.search.split("redirectURL=")[1];
        console.log("Пожалуйста заполние Email");
        valid = false;
      }
      if (this.passCl == "") {
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