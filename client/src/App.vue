<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
		cekLogin() {
      let token = localStorage.getItem('token')
      if(!token) {
        this.$router.push('auth/login')
      } else {
        // this.$router.push('/')
      }
    },
	},
	mounted() {
		this.cekLogin()
	}
}
</script>

<style lang="scss">
@import "sass/main";

body {
  height: 100%;
  #app {
    height: 100%;
  }
}
</style>
