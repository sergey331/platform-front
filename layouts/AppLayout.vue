<template>
   <div>
      <v-app-bar
          color="deep-purple"
          dark
      >
         <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

         <v-toolbar-title>Platform</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn @click="logout">
            <v-icon>
               mdi-logout
            </v-icon>
         </v-btn>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
      >
         <v-list
             nav
             dense
         >
            <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
            >
               <v-list-item to="/home">
                  <v-list-item-icon>
                     <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Home</v-list-item-title>
               </v-list-item>

               <v-list-item >
                  <v-list-item-icon>
                     <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Account</v-list-item-title>
               </v-list-item>
            </v-list-item-group>
         </v-list>
      </v-navigation-drawer>
      <Nuxt />
   </div>
</template>

<script>
export default {
name: "AppLayout",
   data () {
      return {
         drawer: false,
         group: false,
      }
   },
   methods: {
      logout() {
         this.$auth.logout()
         this.$router.push('/login')
      }
   }
}
</script>

<style scoped>

</style>
