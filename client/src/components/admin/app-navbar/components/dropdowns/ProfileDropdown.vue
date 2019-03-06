<template>
  <div class="profile-dropdown flex-center">
    <span class="profile-dropdown__avatar-container">
      <slot/>
    </span>
    <vuestic-dropdown
      v-model="isShown"
      position="bottom"
    >
      <div
        v-for="option in options"
        :key="option.name"
        class="dropdown-item plain-link-item"
      >
        <a @click.prevent="doLogout" class="plain-link"
          href="#">
          {{ $t(`user.${option.name}`) }}
        </a>
      </div>
    </vuestic-dropdown>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'profile-section',
  data () {
    return {
      isShown: false,
    }
  },
  props: {
    options: {
      type: Array,
      default: () => [
        {
          name: 'logout',
          redirectTo: 'login',
        },
      ],
    },
  },
  methods: {
    ...mapActions(['logout']),
    doLogout () {
      console.log(`masuk`)
      this.$store.dispatch('logout')
    },
  },
}
</script>

<style lang="scss">
@import '../../../../../vuestic-theme/vuestic-sass/resources/resources';

.profile-dropdown {
  cursor: pointer;

  &__avatar-container {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid $lighter-gray;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
