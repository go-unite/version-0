<template>
  <h1>Sign into an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="signIn">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign in with Google</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'
const email = ref("");
const password = ref("");
const errMsg = ref()
const router = useRouter();

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("successfully signed in!");
      router.push('/authHome')
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/wrong-password":
          errMsg.value = "Wrong password";
          break;
        case "auth/user-not-found":
          errMsg.value = "Account not found";
          break;
        default:
          errMsg.value = "Email or Password was incorrect";
          break;
      }
      alert(error.message);
    })

}
const signInWithGoogle = () => {

}
</script>