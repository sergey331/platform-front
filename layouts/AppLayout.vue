<template>
   <div>
      <nav
          class="navbar header has-shadow is-primary"
          role="navigation"
          aria-label="main navigation"
      >
         <div class="navbar-brand">
            <nuxt-link
                class="navbar-item"
                to="/home"
            >
               Platform
            </nuxt-link>

            <div class="navbar-burger">
               <span/>
               <span/>
               <span/>
            </div>
         </div>
         <div class="navbar-end">
            <b-navbar-dropdown :label="user.name">
               <nuxt-link to="/profile" class="navbar-item">
                  Profile
               </nuxt-link>
               <b-navbar-item @click="logout">
                  Logout
               </b-navbar-item>
            </b-navbar-dropdown>
         </div>
      </nav>

      <section class="main-content columns">
         <aside class="column is-2 section">
            <p class="menu-label is-hidden-touch">
               General
            </p>
            <ul class="menu-list">
               <li
                   v-for="(item, key) of items"
                   :key="key"
               >
                  <NuxtLink
                      :to="item.to"
                      exact-active-class="is-active"
                  >
                     <b-icon :icon="item.icon"/>
                     {{ item.title }}
                  </NuxtLink>
               </li>
            </ul>
            {{ members }}
         </aside>

         <div class="container">
            <Nuxt/>
         </div>
      </section>
   </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {

   name: "AppLayout",
   data() {
      return {
         items: [
            {
               title: 'Home',
               icon: 'home',
               to: '/home'
            }
         ],
         user: this.$auth.user,
      }
   },
   computed: {
     ...mapGetters({
        members: "members/getMembers",
        workspace_id: "members/getWorkspaceId"
     })
   },
   methods: {
      logout() {
         this.$auth.logout();
      }
   },
   mounted() {
      if (!this.user) {
         this.$router.push('/login')
      }
   },
   watch: {
     workspace_id(id) {
        if (id !== '') {
           this.$store.dispatch('members/membersAction',id);
        } else {
           this.members = [];
        }
     }
   },
   created() {

   }
}
</script>

<style scoped>

</style>
