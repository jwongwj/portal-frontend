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
            <v-row> Date Modified </v-row>
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
        </v-card-actions>

        <v-divider
          class="topbottom10"
          v-if="isAdmin"
        />
        <v-row class="justify-space-around">
          <v-col>
            <v-text-field
              v-model="jobdetail.title"
              label="Job Title"
              outline
              :value="jobdetail.title"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="jobdetail.dateposted"
              label="Date Last Modified"
              outline
              :value="jobdetail.dateposted"
              disabled
            > </v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-space-around">
          <v-col>
            <v-text-field
              v-model="jobdetail.company"
              label="Company Name"
              outline
              :value="jobdetail.company"
            > </v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-space-around">
          <v-col>
            <v-text-field
              v-model="jobdetail.location"
              label="Location"
              outline
              :value="jobdetail.location"
            ></v-text-field>
          </v-col>

        </v-row>
        <v-row>
          <v-col class="font-weight-black smallfont">Job Description</v-col>
        </v-row>
        <v-row class="justify-space-around">
          <v-col>
            <TextEditor
              ref="editor"
              eventname="jobdetailsquill"
              :value="value"
            />
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
      v-if="isAdmin && !edit"
      class="listAdminControl"
    >
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            class="col-12 bottommargin10"
            v-bind="attrs"
            v-on="on"
            @click="add"
          >
            <v-icon>
              mdi-plus
            </v-icon>

          </v-btn>
        </template>
        <span>Add New Job</span>
      </v-tooltip>

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="warning"
            @click="editjob()"
            class="col-12 bottommargin10"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-pencil
            </v-icon>

          </v-btn>
        </template>
        <span>Edit Job</span>
      </v-tooltip>

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="accent"
            class="col-12 bottommargin10"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-account-check-outline
            </v-icon>

          </v-btn>
        </template>
        <span>Check Applicants</span>
      </v-tooltip>

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red darken-4"
            class="col-12 bottommargin10"
            v-bind="attrs"
            v-on="on"
            @click="deletejob(jobdetail.id)"
          >
            <v-icon color="white">
              mdi-delete-variant
            </v-icon>
            <label style="color: white"> </label>
          </v-btn>
        </template>
        <span>Delete Job</span>
      </v-tooltip>

    </v-col>
    <v-col
      v-else-if="isAdmin && edit"
      class="listAdminControl"
    >
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            class="col-12 bottommargin10"
            v-bind="attrs"
            v-on="on"
            @click="save(jobdetail)"
          >
            <v-icon>
              mdi-content-save
            </v-icon>

          </v-btn>
        </template>
        <span>Save</span>
      </v-tooltip>

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red darken-4"
            class="col-12 bottommargin10"
            @click="cancel"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="white">
              mdi-cancel
            </v-icon>
            <label style="color: white"> </label>
          </v-btn>
        </template>
        <span>Cancel</span>
      </v-tooltip>

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
      value: '',
      oldJobDetails: {},
    };
  },
  methods: {
    populateJobDetails (jobid) {
      axios.get(`${StringConstants.API_BACKEND_BASE_URL}getjobbyid?id=${jobid}`).then((response) => {
        this.jobdetail = response.data;
        this.value = this.jobdetail.description;
      });
    },
    editjob () {
      this.jobedit('Edit Job', this.jobdetail.description, false);
    },
    add () {
      this.jobedit('Add Job', '', true);
    },
    jobedit (task, editorvalue, isNewJob) {
      this.edit = true;
      Object.assign(this.oldJobDetails, this.jobdetail);
      if (isNewJob) this.jobdetail = {};
      this.task = task;
      this.value = editorvalue;
    },
    cancel () {
      this.edit = false;
      Object.assign(this.jobdetail, this.oldJobDetails);
      this.oldJobDetails = {};
    },
    save (job) {
      job.dateposted = this.getDate();
      job.description = this.$refs.editor.text;
      axios.post(`${StringConstants.API_BACKEND_BASE_URL}savejob`, job).then(() => {
        this.$eventHub.$emit('updatedjob', true);
      });
      this.edit = false;
      this.oldJobDetails = {};
    },
    getDate () {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = months[today.getMonth()];
      const yyyy = today.getFullYear();

      today = `${dd} ${mm} ${yyyy}`;
      return today;
    },
    deletejob (jobid) {
      axios.post(`${StringConstants.API_BACKEND_BASE_URL}deletejob?id=${jobid}`).then(() => {
        this.$eventHub.$emit('updatedjob', false);
      });
    },
  },
  props: {
    isAdmin: Boolean,
  },
  created () {
    this.$eventHub.$on('selectedJobDetails', this.populateJobDetails);
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
