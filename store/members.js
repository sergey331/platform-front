export const state = () => ({
    members: [],
    workspace_id: null
})

export const getters = {
    getMembers(state) {
        return state.members
    },
    getWorkspaceId(state) {
        return state.workspace_id
    }
}

export const mutations = {
    changeMembers(state,data) {
        state.members = data.members
    },
    changeWorkspaceId(state,id) {
        state.workspace_id = id
    }
}

export const actions = {
    async membersAction(context,id) {
        console.log(id)
        // await this.$axios.get('')
    }
}
