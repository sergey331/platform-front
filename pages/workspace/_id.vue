<template>
   <div class="section">
      <div v-if="work" class="box">
         <h1 >{{ work.name }}</h1>
      </div>
      <div v-else class="loading">
         <img  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="">
      </div>
   </div>
</template>

<script>
export default {
   layout: 'AppLayout',
   name: "workspace-id",
   data() {
      return {
         id: this.$route.params.id
      }
   },
   mounted() {
      if (!this.work) {
         this.$store.dispatch('workspace/getWorkspaces');
      }
   },
   computed: {
      work(){
         return this.$store.getters["workspace/getWorkspac"](this.$route.params.id);
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
