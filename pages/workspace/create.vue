<template>
   <div class="section">
      <div class="box">
         <div>
            <div >
               <b-field
                   label="Name"
               >
                  <b-input v-model="name">

                  </b-input>
               </b-field>
            </div>

         </div>
         <div class="mt-5">
            <b-button @click="save">
               Create
            </b-button>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   layout: 'AppLayout',
   name: "Create",
   middleware: ['auth'],
   data() {
      return {
         name: ''
      }
   },
   methods: {
      save() {
         this.$store.dispatch('workspace/createWorkspaces',this.name);
         this.$router.push('/home')
      }
   }
}
</script>

<style scoped>

</style>
