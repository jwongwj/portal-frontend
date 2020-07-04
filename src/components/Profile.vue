<template>
  <v-container>
    <v-flex class="logindiv">
      <v-img
        src="@/assets/ProfileBg.png"
        max-width="600"
        max-height="750"
        class="loginImage"
      >
        <div class="headerStyle">
          Edit Profile Details
        </div>
        <div class="loginSector">
          <v-flex class="loginoverlay">
            <v-form>
              <v-text-field
                label="Employee ID"
                v-model="userid"
                shaped
                prepend-inner-icon="mdi-card-account-details"
                disabled
              ></v-text-field>
              <v-text-field
                label="Email Address"
                v-model="employee.email"
                shaped
                prepend-inner-icon="mdi-email"
                type="email"
              ></v-text-field>
              <v-text-field
                label="Display Name"
                v-model="employee.employeename"
                shaped
                prepend-inner-icon="mdi-human"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="employee.password"
                shaped
                type="password"
                prepend-inner-icon="mdi-key"
              ></v-text-field>
              <v-btn
                rounded
                class="loginbutton"
                @click="saveprofile"
              >
                Save
              </v-btn>

            </v-form>
          </v-flex>
        </div>
      </v-img>

    </v-flex>
  </v-container>
</template>

<script>
import StringConstants from '@/constants/StringConstants';
import axios from 'axios';
import EventConstants from '@/constants/EventConstants';

const { sessionStorage } = window;
export default {
  name: 'ProfilePage',
  data () {
    return {
      employee: {},
      userid: sessionStorage.getItem('USER_ID'),
    };
  },
  created () {
    axios.post(`${StringConstants.API_BACKEND_BASE_URL}getEmployeeDetails`, sessionStorage.getItem('USER_ID'), { headers: { 'Content-Type': 'application/json' } }).then((response) => {
      this.employee = response.data;
    });
  },
  methods: {
    saveprofile () {
      axios.post(`${StringConstants.API_BACKEND_BASE_URL}updateEmployee`, this.employee, { headers: { 'Content-Type': 'application/json' } }).then(() => {
        this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, '', `User Record${StringConstants.SAVE_MESSAGE}`, StringConstants.SUCCESS_ALERT);
      });
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Simonetta');
.headerStyle {
  /* font-family: Simonetta, cursive; */
  /* font-weight: bold; */
  text-align: center;
  font-size: 35px;
  color: rgb(68, 81, 100);
  text-shadow: rgb(0, 0, 0) 2px 2px 2px;
  height: 10vh;
  justify-content: center;
  vertical-align: middle;
  line-height: 5;
}
</style>
