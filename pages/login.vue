<template>
   <div class="section">
      <div style="width: 50%;margin: auto">
         <form class="box">
            <b-field label="Email">
               <b-input name="email" type="email" v-model="email"></b-input>
            </b-field>
            <b-field label="Password">
               <b-input type="password"v-model="password" password-reveal></b-input>
            </b-field>


            <b-button type="is-primary" @click="signIn">Sign in</b-button>
         </form>
      </div>
   </div>
</template>

<script>
export default {
   name: "Login",
   data() {
      return {
         email: "",
         password: ''
      }
   },
   methods: {
      signIn() {
         this.$auth.loginWith('laravelJWT', {data: {
            email: this.email,
            password: this.password
            }})
         this.$router.push('/home')
      }
   }
}
</script>

<style scoped>

</style>
