const navbarReducer = (state, action) => {
    switch (action.type) {
        case 'OPENING_NAV_OVERLAY':
            return ({
                navIconState: false,
                dropdownState: {
                    value: state.dropdownState.value
                },
                profileOptionsState: state.profileOptionsState,
                navContainerClassState: "navbar-overlay open",
                queryString: {
                    keyword: state.queryString.keyword,
                    page: state.queryString.page,
                },
                profileAvtarState: {
                    public_id: state.profileAvtarState.public_id,
                    error: state.profileAvtarState.error
                }
            })
        case 'CLOSING_NAV_OVERLAY':
            return ({
                navIconState: true,
                dropdownState: {
                    value: state.dropdownState.value
                },
                profileOptionsState: state.profileOptionsState,
                navContainerClassState: "navbar-overlay close",
                queryString: {
                    keyword: state.queryString.keyword,
                    page: state.queryString.page,
                },
                profileAvtarState: {
                    public_id: state.profileAvtarState.public_id,
                    error: state.profileAvtarState.error
                }
            })
        case 'SET_DROPDOWN_VALUE':
            return ({
                navIconState: state.navIconState,
                dropdownState: {
                    value: action.payload.value
                },
                profileOptionsState: state.profileOptionsState,
                navContainerClassState: state.navContainerClassState,
                queryString: {
                    keyword: state.queryString.keyword,
                    page: state.queryString.page,
                },
                profileAvtarState: {
                    public_id: state.profileAvtarState.public_id,
                    error: state.profileAvtarState.error
                }
            })
        case 'OPEN_PROFILE_OPTIONS':
            return ({
                navIconState: state.navIconState,
                dropdownState: {
                    value: state.dropdownState.value
                },
                profileOptionsState: true,
                navContainerClassState: state.navContainerClassState,
                queryString: {
                    keyword: state.queryString.keyword,
                    page: state.queryString.page,
                },
                profileAvtarState: {
                    public_id: state.profileAvtarState.public_id,
                    error: state.profileAvtarState.error
                }
            })
        case 'CLOSE_PROFILE_OPTIONS':
            return ({
                navIconState: state.navIconState,
                dropdownState: {
                    value: state.dropdownState.value
                },
                profileOptionsState: false,
                navContainerClassState: state.navContainerClassState,
                queryString: {
                    keyword: state.queryString.keyword,
                    page: state.queryString.page,
                },
                profileAvtarState: {
                    public_id: state.profileAvtarState.public_id,
                    error: state.profileAvtarState.error
                }
            })
        case 'SET_QUERY_STRING':
            return ({
                navIconState: state.navIconState,
                dropdownState: {
                    value: state.dropdownState.value
                },
                profileOptionsState: state.profileOptionsState,
                navContainerClassState: state.navContainerClassState,
                queryString: {
                    keyword: action.payload.value,
                    page: state.queryString.page,
                },
                profileAvtarState: {
                    public_id: state.profileAvtarState.public_id,
                    error: state.profileAvtarState.error
                }
            })
        case 'PROFILE_AVTAR_SUCCESS':
            return ({
                navIconState: state.navIconState,
                dropdownState: {
                    value: state.dropdownState.value
                },
                profileOptionsState: state.profileOptionsState,
                navContainerClassState: state.navContainerClassState,
                queryString: {
                    keyword: state.queryString.keyword,
                    page: state.queryString.page,
                },
                profileAvtarState: {
                    public_id: action.payload.public_id,
                    error: false
                }
            })
        case 'PROFILE_AVTAR_FAILED':
            return ({
                navIconState: state.navIconState,
                dropdownState: {
                    value: state.dropdownState.value
                },
                profileOptionsState: state.profileOptionsState,
                navContainerClassState: state.navContainerClassState,
                queryString: {
                    keyword: state.queryString.keyword,
                    page: state.queryString.page,
                },
                profileAvtarState: {
                    public_id: "",
                    error: action.payload.error
                }
            })
        case 'PREVIOUS_PAGE':
            return ({
                navIconState: state.navIconState,
                dropdownState: {
                    value: state.dropdownState.value
                },
                profileOptionsState: state.profileOptionsState,
                navContainerClassState: state.navContainerClassState,
                queryString: {
                    keyword: state.queryString.keyword,
                    page: state.queryString.page - 1,
                },
                profileAvtarState: {
                    public_id: state.profileAvtarState.public_id,
                    error: state.profileAvtarState.error
                }
            })
        case 'NEXT_PAGE':
            return ({
                navIconState: state.navIconState,
                dropdownState: {
                    value: state.dropdownState.value
                },
                profileOptionsState: state.profileOptionsState,
                navContainerClassState: state.navContainerClassState,
                queryString: {
                    keyword: state.queryString.keyword,
                    page: state.queryString.page + 1,
                },
                profileAvtarState: {
                    public_id: state.profileAvtarState.public_id,
                    error: state.profileAvtarState.error
                }
            })
        default: return state
    }
}
export default navbarReducer