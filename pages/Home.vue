<template>
   <div>
   </div>
</template>

<script>
export default {
   layout: 'AppLayout',
   name: "Home",
   middleware: ['auth'],
   data() {
     return {
        workspaces: []
     }
   }
}
</script>
