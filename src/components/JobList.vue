<template>

  <v-card
    tile
    class="mx-auto overflow-y-auto listClass right"
  >
    <v-toolbar flat>

      <v-row>
        <v-col class="col-12">
          <v-text-field append-icon="mdi-magnify"> test

          </v-text-field>
        </v-col>
      </v-row>
      </v-flex>

    </v-toolbar>
    <v-list
      dense
      three-line
    >
      <v-list-item-group color="skyblue">
        <v-list-item
          v-for="(itemList, i) in filteredList"
          :key="i"
          class="listItemStyle"
          selectable
        >

          <v-list-item-content @click="selectJob(itemList)">
            <v-list-item-title
              class="titleFont"
              v-html="itemList.title"
            ></v-list-item-title>
            <v-list-item-subtitle v-html="itemList.company"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="itemList.dateposted"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-chip
              class="ma-2"
              :color="getStatusIcon(itemList.status).color"
              text-color="white"
            >
              <v-avatar left>
                <v-icon>{{getStatusIcon(itemList.status).icon}}</v-icon>
              </v-avatar>
              {{getStatusIcon(itemList.status).text}}
            </v-chip>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

</template>

<script>
import axios from 'axios';
import StringConstants from '@/constants/StringConstants';

export default {
  name: 'JobList',
  created () {
    axios.get(`${StringConstants.API_BACKEND_BASE_URL}getjoblist`).then((response) => {
      this.filteredList = response.data;
      if (this.filteredList.length > 0) { this.$eventHub.$emit('selectedJobDetails', this.filteredList[0].jobid); }
    });
  },
  data () {
    return {
      filteredList: {},
    };
  },
  methods: {
    selectItem () { },
    getImage () { },
    navigateURL () { },
    getStatusIcon (status) {
      if (status === 'applied') {
        return {
          icon: 'mdi-checkbox-marked-circle',
          color: 'success',
          text: 'Applied',
        };
      }

      return {
        icon: 'mdi-minus-circle',
        color: 'grey',
        text: 'Not Applied',
      };
    },
    selectJob (item) {
      this.$eventHub.$emit('selectedJobDetails', item.jobid);
    },
  },
};
</script>

<style>
.listClass {
  max-width: 800px;
  width: 25vw;
  height: 98%;
  overflow-y: hidden;
  max-height: 89vh;
  margin-top: 1vh;
  min-height: 89vh;
}

/* width */
.listClass::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.listClass::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px lightgrey;
  border-radius: 5px;
}

/* Handle */
.listClass::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
}

.listItemStyle {
  border: #e7e7e7 solid 1px;
  border-radius: 3px;
  padding-left: 20px;
}

.listDetails {
  max-width: 800px;
  width: 50vw;
  height: 98%;
  overflow-y: hidden;
  max-height: 89vh;
  margin-top: 1vh;
  min-height: 89vh;
}

/* width */
.listDetails::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.listDetails::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px lightgrey;
  border-radius: 5px;
}

/* Handle */
.listDetails::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
}

.titleFont {
  font-size: 18px !important;
  height: 40%;
  font-weight: 500;
  text-transform: uppercase;
  background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.listAdminControl {
  overflow-y: hidden;
  max-height: 89vh;
  margin-top: 1vh;
  min-height: 89vh;
  display: block;
  float: left;
  width: 5vw;
  height: 40px;
}
</style>
