<template>
   <v-form>
      <v-container>
         <v-row >
            <v-col
                cols="12"
                sm="12"
            >
               <v-text-field
                   v-model="name"
                   label="Name"
                   clearable
               ></v-text-field>
            </v-col>

         </v-row>
         <v-col>
            <v-btn @click="save">
               Create
            </v-btn>
         </v-col>
      </v-container>
   </v-form>
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
         this.$axios.$post('/workspace/create',{
            name: this.name
         })
             .then(response => {
                if (response.ok) {
                   this.$toast.success('Workspace created successfully').goAway(6000);
                   this.$router.push('/home')
                }
             })
      }
   }
}
</script>

<style scoped>

</style>
