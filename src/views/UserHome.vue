<template>
  <v-layout class="maxHeight">
    <v-flex>
      <JobList :isAdmin="isAdmin()" />
    </v-flex>
    <v-flex>
      <JobDetails
        :edit="false"
        :isAdmin="isAdmin()"
      />
    </v-flex>
    <v-flex>
      <AdminControl :isAdmin="isAdmin()" />
    </v-flex>
  </v-layout>
</template>

<script>
import JobDetails from '@/components/JobDetails.vue';
import JobList from '@/components/JobList.vue';
import AdminControl from '@/components/AdminControl.vue';

const { sessionStorage } = window;

export default {
  name: 'UserHome',
  components: {
    JobDetails,
    JobList,
    AdminControl,
  },
  data () {
    return {
      filteredList: {
        name: 'test',
        description: 'desc',
        url: 's',
      },
    };
  },
  methods: {
    isAdmin () {
      if (sessionStorage.getItem('USER_IS_ADMIN') === 'true') {
        return true;
      }

      return false;
    },
  },
};
</script>

<style scoped>
.maxHeight {
}
</style>
