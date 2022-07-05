export const state = () => ({
    workspaces: []
})

export const getters = {
    getWorkspace(state) {
        return state.workspaces
    }
}

export const mutations = {
    changeWorkspaces(state,workspaces) {
        state.workspaces = workspaces
    }
}

export const actions = {
    async getWorkspaces(context) {
       await this.$axios.$get('/workspaces')
            .then(response => {
                context.commit('changeWorkspaces',response.workspaces)
            })
    },
    async createWorkspaces(context,name) {
       await this.$axios.$post('/workspace/create',{
           name: name
       })
           .then(response => {
               if (response.ok) {
                   this.$toast.success('Workspace created successfully').goAway(6000);
                   context.commit('changeWorkspaces',response.workspaces)
               }
           })
    },
    async updateWorkspaces(context,data) {
        console.log(data)
       await this.$axios.$post('/workspace/'+data.id,{
           name: data.name
       })
           .then(response => {
               if (response.ok) {
                   this.$toast.success('Workspace updated successfully').goAway(6000);
                   context.commit('changeWorkspaces',response.workspaces)
               }
           })
    }
}
