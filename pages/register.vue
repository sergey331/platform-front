<template>
   <div>

   </div>
</template>

<script>
export default {
   name: "Register",
   data() {
      return {
         name: '',
         email: '',
         password: '',

      }
   },
   methods: {
      reg() {
         console.log('ok')
         this.$axios.$post('api/register',{
               name: this.name,
               email: this.email,
               password: this.password
         })
      }
   }
}
</script>

<style scoped>

</style>
