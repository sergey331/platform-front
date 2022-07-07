<template>
   <div class="section">
      <div style="width: 50%;margin: auto">
         <form class="box">
            <b-field label="Name">
               <b-input name="name"  v-model="name"></b-input>
            </b-field>
            <b-field label="Email">
               <b-input name="email" type="email" v-model="email"></b-input>
            </b-field>
            <b-field label="Password">
               <b-input type="password"v-model="password" password-reveal></b-input>
            </b-field>
            <b-button type="is-primary" @click="signUp">Sign up</b-button>
         </form>
      </div>
   </div>
</template>

<script>
export default {
   name: "Register",
   auth: false,
   data() {
      return {
         name: '',
         email: '',
         password: '',
      }
   },
   methods: {
      signUp() {
         this.$axios.$post('/register',{
               name: this.name,
               email: this.email,
               password: this.password
         })
             .then(response => {
                this.$router.push('/login')
             })
      }
   }
}
</script>

<style scoped>

</style>
