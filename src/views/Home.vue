<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world msg="Welcome to Your Vue.js App" />
    <h1 style="color: peru">
      {{ getUsers }}
    </h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      firebaseData: null,
      imageUrl: null
    };
  },
  computed: mapGetters("user", ["getUsers"]),
  created() {
    this.$store.dispatch("user/bindUsersRef");
  }
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
