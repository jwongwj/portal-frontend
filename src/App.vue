<template>
  <v-app class="rootClass">

    <NavBar />

    <v-content>
      <router-view></router-view>
      <Alert />
    </v-content>
  </v-app>
</template>

<script>
import Alert from '@/components/Alert.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: {
    Alert,
    NavBar,
  },
  data: () => ({
    //
  }),
};
</script>
