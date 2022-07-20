<template>
   <div class="section">
      <div class="box">
         <div class="workspace_head">
            <NuxtLink to="/workspace/create"> Create new workspace</NuxtLink>
         </div>
         <div class="workspace" v-if="getWorkspace.workspaces.length" v-for="workspace in getWorkspace.workspaces" :key="workspace.id">
            <div class="workspace_name"> {{ workspace.name }}</div>
            <div class="workspace_action">
               <nuxt-link :to="'/workspace/'+workspace.id" class="button">Open</nuxt-link>
               <b-button @click="openModal(workspace)">Edit</b-button>
            </div>
         </div>
         <div class="workspace" v-if="getWorkspace.joinWorkspaces.length" v-for="workspace in getWorkspace.joinWorkspaces" :key="workspace.id">
            <div class="workspace_name"> {{ workspace.name }}</div>
            <div class="workspace_action">
               <nuxt-link :to="'/workspace/'+workspace.id" class="button">Open</nuxt-link>
            </div>
         </div>
         <div class="workspace" v-if="getWorkspace.invites.length" v-for="invite in getWorkspace.invites" :key="invite.id">
            <div class="workspace_name"> {{ invite.workspace.name }}</div>
            <div class="workspace_action">
               <b-button @click="accept(invite.workspace_id)" type="is-success">Accept</b-button>
               <b-button @click="reject(invite.workspace_id)" type="is-danger">Reject</b-button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import {mapGetters} from 'vuex'
import WorkspaceModal from "@/components/WorkspaceModal";

export default {
   layout: 'AppLayout',
   head() {
      return {
         title: "Workspace",
      };
   },
   name: "Home",
   computed: {
      ...mapGetters({
         getWorkspace: 'workspace/getWorkspace'
      })
   },
   mounted() {
      this.$store.commit('members/changeWorkspaceId','')
   },
   data() {
      return {
         workspaces: []
      }
   },
   beforeCreate() {
      this.$store.dispatch('workspace/getWorkspaces');
   },
   methods: {
      openModal(workspace) {
         this.$buefy.modal.open({
            component: WorkspaceModal,
            props: {
               workspace: workspace
            },
            events: {
               update: (data) => {
                  this.$store.dispatch('workspace/updateWorkspaces',data)
               }
            }
         })
      },
      accept(id) {
         this.$axios.$post('/invite-accept',{
            "workspace_id": id
         }).then(response => {
            if (response.ok) {
               this.$toast.success(response.message).goAway(6000);
            }
         })
      },
      reject(item) {

      },
   }
}
</script>

<style scoped>
.workspace {
   height: 88px;
   margin-bottom: 10px;
   background: linear-gradient(90.09deg, #BD7AE3 2.21%, #4156F6 98.06%);
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
   border-radius: 16px;
   display: flex;
   padding: 0 20px;
   justify-content: space-between;
   align-items: center;
}

.workspace_name {
   color: white;
   font-style: normal;
   font-weight: 700;
   font-size: 18px;
}

.workspace_head {
   display: flex;
   justify-content: end;
   margin-bottom: 25px;
}

.workspace_head a {
   color: #100f0f;
   font-style: normal;
   font-weight: 700;
   font-size: 18px;
}
</style>
