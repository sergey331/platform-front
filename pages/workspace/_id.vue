<template>
   <div class="section">
      <div v-if="work" class="box">
         <div class="columns">
            <div class="column">
               <h1 >{{ work.workspace.name }}</h1>
            </div>`
            <div class="column" v-if="work.role === 'owner' ">
               <b-button @click="openInviteModal">
                  Invite User
               </b-button>

            </div>
         </div>

      </div>
      <div v-else class="loading">
         <img  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="">
      </div>
   </div>
</template>

<script>
import SearchEmailModal from "@/components/SearchEmailModal";
export default {
   layout: 'AppLayout',
   name: "workspace-id",
   data() {
      return {
         id: this.$route.params.id
      }
   },
   mounted() {
      this.$store.commit('members/changeWorkspaceId',this.id)
      if (!this.work) {
         this.$store.dispatch('workspace/getWorkspaces');
      }
   },
   computed: {
      work(){
         return this.$store.getters["workspace/getWorkspac"](this.$route.params.id);
      }
   },
   methods: {
      openInviteModal() {
         this.$buefy.modal.open({
            component: SearchEmailModal,
            props: {
               workspace_id: this.id,
               axios: this.$axios
            },
            events: {
               done: (data) => {
                  if (data.errors.length) {
                     data.errors.forEach(error => {
                        this.$toast.error(error).goAway(6000);
                     })
                  }
                  if (data.success.length) {
                     data.success.forEach(suc => {
                        this.$toast.success(suc).goAway(6000);
                     })
                  }
               }
            }
         })
      }
   }

}
</script>

<style scoped>
   .loading {
      margin: auto;
      width: 100%;
      display: flex;
      justify-content: center;
   }
</style>
