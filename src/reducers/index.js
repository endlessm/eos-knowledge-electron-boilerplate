const initialState = {
  currentPage: 'HOME',
  query: '',
  articleModel: null,
  searchState: 'FINISHED',
  searchResults: null
}

const knowledgeApp = (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_CLICKED':
      return initialState
    case 'QUERY_CHANGED':
    case 'DBUS_LOAD_QUERY':
      return Object.assign({}, state, {
        query: action.query,
        searchResults: null,
        searchState: action.query ? 'PENDING' : 'FINISHED',
        articleModel: null
      })
    case 'ARTICLE_CLICKED':
      return Object.assign({}, state, {
        currentPage: 'ARTICLE',
        articleModel: action.model
      })
    case 'DBUS_LOAD_ITEM':
      return Object.assign({}, state, {
        query: action.query,
        currentPage: 'ARTICLE',
        articleModel: action.model
      })
    case 'SEARCH_RESULTS_READY':
      if (action.query !== state.query) return state
      return Object.assign({}, state, {
        searchResults: action.results,
        searchState: 'FINISHED'
      })
    case 'SEARCH_RESULTS_ERROR':
      if (action.query !== state.query) return state
      return Object.assign({}, state, {
        searchState: 'ERROR'
      })
    default:
      return state
  }
}

export default knowledgeApp
