<template>
  <v-flex>
    <v-card class="mx-auto overflow-y-auto left listDetails">
      <v-card-text
        v-if="!edit"
        class="padding30"
      >

        <v-row class="justify-space-around">
          <v-col
            v-if="isAdmin"
            class="largefont col-10"
          >{{ jobdetail.title }}</v-col>
          <v-col
            v-if="!isAdmin"
            class="largefont col-8"
          >{{ jobdetail.title }}</v-col>
          <v-col class="col-2">
            <v-row> Date Posted </v-row>
            <v-row>{{ jobdetail.dateposted }}</v-row>
          </v-col>
          <v-col
            class="col-2"
            v-if="!isAdmin"
          >
            <v-btn class="applybutton">Apply Now</v-btn>
          </v-col>
        </v-row>
        <v-row class="">

          <v-col class="font-italic mediumfont">{{jobdetail.company}}</v-col>

        </v-row>
        <v-row>
          <v-col class="font-italic mediumfont">{{jobdetail.location}}</v-col>
        </v-row>
        <v-row class="justify-space-around">
          <v-col class="font-weight-black smallfont">Job Description</v-col>
        </v-row>
        <v-row class="justify-space-around">
          <v-col>
            <div v-html="jobdetail.description"> </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-else>
        <v-card-actions
          v-if="isAdmin"
          class="justify-space-around"
        >
          <label class="largefont">{{task}}</label>
          <v-btn color="success">
            <v-icon>
              mdi-plus
            </v-icon>
            Save
          </v-btn>
          <v-btn
            color="red darken-4"
            @click="cancel()"
          >
            <v-icon color="white">
              mdi-delete-variant
            </v-icon>
            <label style="color: white"> Cancel </label>
          </v-btn>
        </v-card-actions>

        <v-divider
          class="topbottom10"
          v-if="isAdmin"
        />
        <v-row class="justify-space-around">
          <v-col>
            <v-text-field
              label="Job Title"
              outline
            > Title</v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Date Posted"
              outline
            > Title</v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-space-around">
          <v-col>
            <v-text-field
              label="Company Name"
              outline
            > Title</v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-space-around">
          <v-col>
            <v-text-field
              label="Location"
              outline
            > Title</v-text-field>
          </v-col>

        </v-row>
        <v-row>
          <v-col class="font-weight-black smallfont">Job Description</v-col>
        </v-row>
        <v-row class="justify-space-around">
          <v-col>
            <TextEditor />
          </v-col>
        </v-row>
      </v-card-text>
      <!-- <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Learn More
      </v-btn>
    </v-card-actions> -->
    </v-card>
    <v-col
      v-if="isAdmin"
      class="listAdminControl"
    >
      <v-spacer />
      <v-btn
        color="success"
        class="col-12 bottommargin10"
      >
        <v-icon>
          mdi-plus
        </v-icon>

      </v-btn>
      <v-btn
        color="warning"
        @click="editjob()"
        class="col-12 bottommargin10"
      >
        <v-icon>
          mdi-pencil
        </v-icon>

      </v-btn>
      <v-btn
        color="accent"
        class="col-12 bottommargin10"
      >
        <v-icon>
          mdi-account-check-outline
        </v-icon>

      </v-btn>
      <v-btn
        color="red darken-4"
        class="col-12 bottommargin10"
      >
        <v-icon color="white">
          mdi-delete-variant
        </v-icon>
        <label style="color: white"> </label>
      </v-btn>
    </v-col>
  </v-flex>
</template>

<script>
import TextEditor from '@/components/TextEditor.vue';
import axios from 'axios';
import StringConstants from '@/constants/StringConstants';

export default {
  name: 'Job-Details',
  components: {
    TextEditor,
  },
  data () {
    return {
      jobdetail: {},
      edit: false,
      task: '',
    };
  },
  methods: {
    populateJobDetails (jobid) {
      axios.get(`${StringConstants.API_BACKEND_BASE_URL}getjobbyid?id=${jobid}`).then((response) => {
        this.jobdetail = response.data;
      });
    },
    editjob () {
      this.edit = true;
      this.task = 'Edit Job';
    },
    cancel () {
      this.edit = false;
    },
  },
  props: {
    isAdmin: Boolean,
  },
  created () {
    this.$eventHub.$on('selectedJobDetails', this.populateJobDetails);
    this.populateJobDetails(1);
  },
};
</script>

<style>
.right {
  float: right;
}

.left {
  float: left;
}

.applybutton {
  /* width: 100%; */
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
  color: white !important;
}

.mediumfont {
  font-size: 16px;
}

.smallfont {
  font-size: 14px;
}

.topbottom10 {
  margin-top: 6px;
  margin-bottom: 6px;
}

.padding30 {
  padding-left: 30px;
  padding-right: 30px;
}

.padding10 {
  padding-top: 10px;
}

.bottommargin10 {
  margin-bottom: 10px;
}
</style>
