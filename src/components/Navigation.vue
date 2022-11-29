<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          <button @click="goBack">Back</button>
        </a>

        <a class="navbar-item">
          <button>
            <router-link to="/">Home</router-link>
          </button>
        </a>
<!-- 
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div> -->
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light" @click="handlSignOut" v-if="isLoggedIn">
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>  
  <!-- <router-link to=''
  <router-link to='/'>Home</router-link>
  <router-link to='/profile'>Profile</router-link> -->
</template>
<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
    handlSignOut () {
      signOut(auth).then(() => {
        router.push("/register")
      })
    }
  }
}
</script>