<template>
  <vuestic-navbar>
    <header-selector slot="selector" :isOpen.sync="valueProxy"/>
    <span slot="logo">
      <vuestic-icon-vuestic/>
    </span>
    <span slot="center">
      {{$t('Stop Hoax & Provokasi')}}&nbsp;<a href="mailto:info@antihoax.com">info@antihoax.com</a>
    </span>

    <profile-dropdown class="col nav-item">
      <img src="https://pngimage.net/wp-content/uploads/2018/05/admin-png-4.png"/>
    </profile-dropdown>
  </vuestic-navbar>

</template>

<script>
import VuesticIconVuestic
  from '../../../vuestic-theme/vuestic-components/vuestic-icon/VuesticIconVuestic'
import VuesticNavbar
  from '../../../vuestic-theme/vuestic-components/vuestic-navbar/VuesticNavbar'
import HeaderSelector from './components/HeaderSelector'

import LanguageDropdown from './components/dropdowns/LanguageDropdown'
import ProfileDropdown from './components/dropdowns/ProfileDropdown'
import NotificationDropdown from './components/dropdowns/NotificationDropdown'
import MessageDropdown from './components/dropdowns/MessageDropdown'

export default {
  name: 'app-navbar',

  components: {
    VuesticIconVuestic,
    VuesticNavbar,
    HeaderSelector,
    MessageDropdown,
    NotificationDropdown,
    LanguageDropdown,
    ProfileDropdown,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    valueProxy: {
      get () {
        return this.isOpen
      },
      set (opened) {
        this.$emit('toggle-menu', opened)
      },
    },
  },
}
</script>
