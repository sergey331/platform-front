<template>
   <div class="column">
      <div class="card">
         <header class="card-header">
            <p class="card-header-title has-text-grey">
              Edit workspace
            </p>
         </header>
         <div class="card-content">
            <div class="content has-text-centered" style="width: 50%; margin: auto">
              <b-field label="Name">
                 <b-input v-model="name"></b-input>
              </b-field>
            </div>
         </div>
         <footer class="card-footer">
            <div class="card-footer-item">
               <div class="mr-4">
                  <b-button @click="$emit('close')">Close</b-button>
               </div>
               <div class="mr-4">
                  <b-button type="is-success" @click="update">Save</b-button>
               </div>
            </div>
         </footer>
      </div>
   </div>
</template>

<script>

export default {
   name: "WorkspaceModal",
   props: ['workspace'],
   data() {
      return {
         name: this.workspace.name
      }
   },
   methods: {
      update() {

         this.$emit('update',{
            id: this.workspace.id,
            name: this.name
         })
         this.$emit('close')
      },

   }
}
</script>
