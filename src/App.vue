<template>
  <v-app>
    <v-content>
      <NavBar />
      <CardNews />
    </v-content>
  </v-app>
</template>

<script>

import NavBar from './views/NavBar'
import CardNews from './views/CardNews'

export default {
  name: 'App',
  components: {
    NavBar,
    CardNews
  }
};
</script>
