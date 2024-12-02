<template>
  <div class="hidden platform-viewport-breakpoint:block ">
    <HomePageStandard />
  </div>
  <div class="block platform-viewport-breakpoint:hidden">
    <HomePageMobile />
  </div>
</template>

<script>


import HomePageStandard from './views/HomePageStandard.vue'
import HomePageMobile from './views/HomePageMobile.vue'

export default {
  name: 'HomePage',
  components: {
    HomePageStandard,
    HomePageMobile
  },
}
</script>