<template xmlns="http://www.w3.org/1999/html">
   <v-responsive>
      <v-card-text>
         <h1> My workspace</h1>
         <v-container>
            <v-row>
               <v-col md="6">
                  <NuxtLink to="/workspace/create"> create workspace</NuxtLink>
               </v-col>
            </v-row>
         </v-container>

      </v-card-text>
   </v-responsive>
</template>

<script>
export default {
   layout: 'AppLayout',
   name: "Home",
   middleware: ['auth'],
   data() {
     return {
        workspaces: []
     }
   },
   mounted() {
      this.getData();
   },
   methods: {
      getData() {
         this.$axios.$get('/workspaces')
             .then(response => {
                this.workspaces = response.workspaces
             })

      }
   }
}
</script>
