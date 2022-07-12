export const state = () => ({
    workspaces: [],
    inviteWorkspaces: []
})

export const getters = {
    getWorkspace(state) {
        return {
            workspaces: state.workspaces,
            invites: state.inviteWorkspaces
        }
    },
    getWorkspac: (state) => (id) => {
        let obj = state.workspaces.filter(e => {
            return e.id === +id
        })
        return obj[0]
    }
}

export const mutations = {
    changeWorkspaces(state, data) {
        state.workspaces = data.workspaces;
        if (data.inviteWorkspace) {
            state.inviteWorkspaces = data.inviteWorkspace
        }
    }
}

export const actions = {
    async getWorkspaces(context) {
        await this.$axios.$get('/workspaces')
            .then(response => {
                context.commit('changeWorkspaces', response)
            })
    },
    async createWorkspaces(context, name) {
        await this.$axios.$post('/workspace/create', {
            name: name
        })
            .then(response => {
                if (response.ok) {
                    this.$toast.success('Workspace created successfully').goAway(6000);
                    context.commit('changeWorkspaces', response)
                }
            })
    },
    async updateWorkspaces(context, data) {
        await this.$axios.$post('/workspace/' + data.id, {
            name: data.name
        }).then(response => {
            if (response.ok) {
                this.$toast.success('Workspace updated successfully').goAway(6000);
                context.commit('changeWorkspaces', response)
            }
        })
    }
}
