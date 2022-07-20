<template>
   <div class="column">
      <div class="card">
         <header class="card-header">
            <p class="card-header-title has-text-grey">
               Invite User To Workspace
            </p>
         </header>
         <div class="card-content">
            <div class="content has-text-centered" style="width: 50%; margin: auto">
               <b-field label="Email">
                  <label style="color: red" v-if="error !== '' ">{{error}}</label>
                  <b-taginput
                      v-model="emails"
                      :data="filteredData"
                      autocomplete
                      :allow-new="true"
                      :open-on-focus="true"
                      icon="label"
                      @typing="searchEmails"
                  ></b-taginput>

               </b-field>
            </div>
         </div>
         <footer class="card-footer">
            <div class="card-footer-item">
               <div class="mr-4">
                  <b-button @click="$emit('close')">Close</b-button>
               </div>
               <div class="mr-4">
                  <b-button type="is-success" @click="invite">Invite</b-button>
               </div>
            </div>
         </footer>
      </div>
   </div>
</template>

<script>
export default {
   name: "SearchEmailModal",
   props: ['workspace_id','axios'],
   data() {
      return {
         emails: [],
         filteredData: [],
         count: 0,
         error: ''
      }
   },
   methods: {
      searchEmails(text) {
         this.count++;
         if (this.count % 2 !== 0) return;
         this.filteredData = [];
         this.axios.$post('/search-email',{email: text})
             .then(response => {
                if (!response.length) return;
                response.forEach(item => {
                   this.filteredData.push(item.email)
                })
             })

      },
      invite() {
         let check = false;
         this.error = '';
         this.emails.forEach(email => {
            let checkEmail = this.looksLikeMail(email)
            if (checkEmail === false) {
               this.error = "please select a valid email"
               check = true
            }
         })
         if (check) return;

         this.axios.$post('/invite-process',{
            workspace_id: this.workspace_id,
            emails: this.emails
         }).then(response => {
            if (response.ok) {
               this.$emit('done',{
                  errors: response.errors,
                  success: response.success,
               })
               this.$emit('close')
            }
         })

      },
      looksLikeMail(email) {
         let lastAtPos = email.lastIndexOf('@');
         let lastDotPos = email.lastIndexOf('.');
         return (lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2);
      }
   }
}
</script>

<style scoped>

</style>
