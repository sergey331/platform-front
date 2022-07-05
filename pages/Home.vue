<template>
   <div class="section">
      <div class="box">
         <div class="workspace_head">
            <NuxtLink to="/workspace/create"> Create new workspace</NuxtLink>
         </div>
         <div class="workspace" v-if="getWorkspace.length" v-for="workspace in getWorkspace" :key="workspace.id">
            <div class="workspace_name"> {{ workspace.name }}</div>
            <div class="workspace_action">
               <b-button>Open</b-button>
               <b-button @click="openModal(workspace)">Edit</b-button>
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
   name: "Home",
   middleware: ['auth'],
   computed: {
      ...mapGetters({
         getWorkspace: 'workspace/getWorkspace'
      })
   },
   data() {
      return {
         workspaces: []
      }
   },
   beforeCreate() {
      this.$store.dispatch('workspace/getWorkspaces');
   },
   mounted() {
      console.log(this.getWorkspace)
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
      }
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
