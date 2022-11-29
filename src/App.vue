<template>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";


const router = useRouter();
const isLoggedIn = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
const goBack = () => {
  router.go(-1)
}
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/register")
  })
}
</script>

<style setup>
@import 'bulma/css/bulma-rtl.min.css';

</style>