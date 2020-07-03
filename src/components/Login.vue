<template>
  <v-container>
    <v-flex class="logindiv">
      <v-img
        src="@/assets/LoginBg.png"
        max-width="600"
        max-height="750"
        class="loginImage"
      >
        <v-img
          src="@/assets/JobPortalLogo.png"
          max-width="200"
          max-height="200"
          class="loginlogo"
        ></v-img>
        <v-spacer />
        <div class="loginSector">
          <v-flex class="loginoverlay">
            <v-form>
              <v-text-field
                label="Username / Email Address"
                v-model="username"
                shaped
                prepend-inner-icon="mdi-account"
                type="email"
              ></v-text-field>
              <v-text-field
                label="Display Name"
                v-model="displayName"
                shaped
                prepend-inner-icon="mdi-human"
                v-if="!createUser"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                shaped
                type="password"
                prepend-inner-icon="mdi-key"
              ></v-text-field>
              <v-text-field
                label="Confirm Password"
                v-model="password2"
                shaped
                type="password"
                prepend-inner-icon="mdi-key"
                v-if="!createUser"
              ></v-text-field>
              <v-btn
                rounded
                class="loginbutton"
                @click="authenticate"
                v-if="createUser"
              >
                Login
              </v-btn>

            </v-form>
          </v-flex>
          <!-- <div
            class="hr-sect"
            v-if="createUser"
          >
            <div>Or</div>
          </div>
          <v-btn
            rounded
            class="createbutton"
            @click="userCreate"
          >
            Create User
          </v-btn>
          <div
            class="cancelDiv"
            v-if="!createUser"
          >

          </div>
          <v-btn
            rounded
            class="cancelButton"
            @click="cancel"
            v-if="!createUser"
          >
            Cancel
          </v-btn> -->
        </div>
      </v-img>

    </v-flex>

  </v-container>
</template>

<script>
import globalmixin from '@/mixins/GlobalMixins';
// import firebase from 'firebase';
import EventConstants from '@/constants/EventConstants';
import StringConstants from '@/constants/StringConstants';
import axios from 'axios';

export default {
  name: 'Login',
  mixins: [
    globalmixin,
  ],
  data: () => ({
    username: '',
    password: '',
    displayName: '',
    password2: '',
    createUser: true,
  }),
  created () {

  },
  methods: {
    authenticate () {
      const username = this.username.toLowerCase();
      const pass = this.password.toLowerCase();
      const userobj = {
        user: username,
        encrypt: pass,
      };
      axios.post(`${StringConstants.API_BACKEND_BASE_URL}authenticate`, userobj)
        .then((response) => {
          const responseObj = response.data;
          if (responseObj.userrole === 'admin') {
            this.$store.dispatch('authenticate', responseObj);
            this.$router.push('joblist');
            this.$eventHub.$emit('logStatus');
          } else if (responseObj.userrole === 'user') {
            this.$store.dispatch('authenticate', responseObj);
            this.$router.push('joblist');
            this.$eventHub.$emit('logStatus');
          } else if (responseObj.userrole === 'invaliduser') {
            this.$store.dispatch('cleartoken');
            this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, 'Invalid User', '', StringConstants.DELETED_ALERT);
          } else {
            this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, 'Unknown Error. Please check with administrator', '', StringConstants.DELETED_ALERT);
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    enter () {
      this.authenticate();
    },
    userCreate () {
      // if (this.createUser) {
      //   this.createUser = false;
      // } else {
      //   firebase
      //     .auth()
      //     .createUserWithEmailAndPassword(this.username, this.password)
      //     .then((data) => {
      //       data.user
      //         .updateProfile({
      //           displayName: this.displayName,
      //         })
      //         .then(() => { });
      //       if (data.additionalUserInfo.isNewUser) {
      //         this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, this.username, StringConstants.ADDED_MESSAGE, StringConstants.SUCCESS_ALERT);
      //         this.$eventHub.$emit('logStatus');
      //         this.$router.push('joblist');
      //       }
      //     })
      //     .catch((err) => {
      //       this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, err, '', StringConstants.DELETED_ALERT);
      //     });
      // }
    },
    cancel () {
      this.createUser = true;
      this.resetForm();
    },
    resetForm () {
      this.username = '';
      this.password = '';
      this.displayName = '';
      this.password2 = '';
    },
  },
};
</script>

<style>
.logindiv {
  text-align: -webkit-center;
  position: relative;
  z-index: 0;
}

.loginoverlay {
  z-index: 10;
}

.loginImage {
  border-radius: 15px;
  height: 30%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.loginSector {
  background-color: rgba(0, 0, 0, 0);
  width: 60%;
  margin-top: 15%;
  height: 50%;
}

.loginbutton {
  width: 100%;
  background: rgb(93, 223, 102);
  background: -moz-radial-gradient(
    circle,
    rgba(93, 223, 102, 0.6615021008403361) 0%,
    rgba(56, 184, 0, 0.29735644257703087) 100%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(93, 223, 102, 0.6615021008403361) 0%,
    rgba(56, 184, 0, 0.29735644257703087) 100%
  );
  background: radial-gradient(
    circle,
    rgba(93, 223, 102, 0.6615021008403361) 0%,
    rgba(56, 184, 0, 0.29735644257703087) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#5ddf66",endColorstr="#38b800",GradientType=1);
  color: white;
  bottom: 0;
}

.createbutton {
  width: 100%;
  background: rgb(42, 196, 255);
  background: -moz-radial-gradient(
    circle,
    rgba(42, 196, 255, 1) 0%,
    rgba(123, 142, 255, 1) 100%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(42, 196, 255, 1) 0%,
    rgba(123, 142, 255, 1) 100%
  );
  background: radial-gradient(
    circle,
    rgba(42, 196, 255, 1) 0%,
    rgba(123, 142, 255, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2ac4ff",endColorstr="#7b8eff",GradientType=1);
  color: white;
  bottom: 0;
}

.loginlogo {
  margin-top: 20%;
}

.hr-sect {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  margin: 8px 0px;
}
.hr-sect::before,
.hr-sect::after {
  content: '';
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.35);
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 8px;
}

.cancelDiv {
  height: 24px;
}

.cancelButton {
  background: rgb(223, 93, 93);
  background: -moz-radial-gradient(
    circle,
    rgba(223, 93, 93, 0.711922268907563) 0%,
    rgba(184, 0, 0, 0.6895133053221288) 100%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(223, 93, 93, 0.711922268907563) 0%,
    rgba(184, 0, 0, 0.6895133053221288) 100%
  );
  background: radial-gradient(
    circle,
    rgba(223, 93, 93, 0.711922268907563) 0%,
    rgba(184, 0, 0, 0.6895133053221288) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#df5d5d",endColorstr="#b80000",GradientType=1);
  color: white;
  width: 100%;
}
</style>
