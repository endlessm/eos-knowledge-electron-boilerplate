import { connect } from 'react-redux'
import SearchEntry from '../components/searchentry'
import { remote } from 'electron'
const { Engine, QueryObject } = remote.require('eos-knowledge-content')

const mapStateToProps = (state) => {
  return {
    text: state.query
  }
}

const runQuery = async (query, dispatch) => {
  const engine = Engine.get_default()
  const queryObj = new QueryObject({
    query: query.trim(),
    limit: 10
  })
  const results = await engine.query(queryObj)
  dispatch({
    type: 'SEARCH_RESULTS_READY',
    query,
    results
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (event) => {
      const query = event.target.value
      dispatch({
        type: 'QUERY_CHANGED',
        query
      })
      runQuery(query, dispatch)
    }
  }
}

const AppSearchEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchEntry)

export default AppSearchEntry
