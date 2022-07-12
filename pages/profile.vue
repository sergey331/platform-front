<template>
   <div class="section">
      <div class="box">
         <h1>Profile</h1>
         <div class="mt-5 columns">
            <div class="column">
               <div class="img">
                  <label for="upload" class="img_update">
                     <b-icon
                         icon="upload">
                     </b-icon>
                  </label>
                  <input type="file" @change="setImgs" style="display: none"  id="upload" />
                  <img v-if="!user.avatar" src="../assets/user.png" alt="">
                  <img v-else :src="userPath+$auth.user.avatar" alt="">
               </div>
               <hr>
            </div>
         </div>
         <div class="mt-5 columns">
            <div class="column">
               <b-field label="Name">
                  <b-input v-model="user.name"></b-input>
               </b-field>
               <b-field label="Phone">
                  <b-input v-model="user.phone"></b-input>
               </b-field>
            </div>
            <div class="column">
               <b-field label="Gender">
                  <b-radio
                      v-model="user.gender"
                      native-value="male"
                  >
                     Male
                  </b-radio>

                  <b-radio
                      v-model="user.gender"
                      native-value="female"
                  >
                     Female
                  </b-radio>


               </b-field>
               <b-field label="Select a date">
                  <b-datepicker
                      v-model="dateBirth"
                      :show-week-number="true"
                      :locale="locale"
                      placeholder="Click to select..."
                      :date-formatter="formatter"
                      icon="calendar-today"
                      :icon-right="dateBirth ? 'close-circle' : ''"
                      icon-right-clickable
                      @icon-right-click="clearDate"
                      trap-focus>
                  </b-datepicker>
               </b-field>
               <b-field label="Timezone">
                  <b-select v-model="user.timezone" placeholder="Select timezone">
                     <option v-for="(timezone,index) in timezones" :key="index" :value="timezone">{{ timezone }}</option>
                  </b-select>
               </b-field>
            </div>
         </div>
         <div class="mt-5 columns">
            <div class="column">
               <b-button @click="save" type="is-success" >
                  Save
               </b-button>
             </div>
         </div>

      </div>

   </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
   layout: "AppLayout",
   name: "profile",
   data() {
      return {
         userPath: process.env.userPath,
         user: Object.assign({}, this.$auth.user),
         dateBirth: null,
         img: null,
         locale: undefined
      }
   },
   computed: {
     ...mapGetters({
        timezones: "timezone/getTimezone"
     })
   },
   methods: {
      clearDate() {
         this.dateBirth = null
      },
      formatter(date) {
         return this.$moment(date).format('YYYY-MM-DD')
      },
      setImgs(e) {
        this.img = e.target.files[0];
      },
      save() {
         let newBirth = (this.dateBirth !== null) ? this.$moment(this.dateBirth).format('YYYY-MM-DD') : null;
         const data = new FormData();
         data.append('name',this.user.name)
         data.append('phone',this.user.phone)
         data.append('gender',this.user.gender)
         data.append('date_of_birth',newBirth)
         data.append('avatar',this.img)
         data.append('timezone',this.user.timezone)
         this.$axios.$post('/update/profile',data,{
            headers: { "Content-Type": "multipart/form-data" },
         }).then(response => {
            this.$toast.success(response.message).goAway(6000);
            this.$auth.setUser(response.user);
         })

      }
   },
   mounted() {
      (this.user.date_of_birth !== null) ? this.dateBirth = new Date(this.user.date_of_birth) : null
   }
}
</script>

<style scoped>
   .img {
      position: relative;
      width: 180px;
      height: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid;
      border-radius: 50%;
      padding: 10px;
   }
   .img img {
      width: 80%;
      height: 80%;
      object-fit: cover;
   }
   .img_update {
      position: absolute;
      width: 26px;
      height: 26px;
      /* border: solid 1px; */
      top: 13px;
      right: 17px;
      border-radius: 50%;
      cursor: pointer;
      background: azure;
   }
</style>
