import React from 'react'
import AppArticleHTML from '../containers/apparticlehtml'
import AppLogo from './applogo'
import AppSearchEntry from '../containers/appsearchentry'
import AppSearchResults from '../containers/appsearchresults'
import AppTopBar from '../containers/apptopbar'

const App = () => (
  <div className='app'>
    <AppTopBar />
    <div className='window-conents'>
      <AppLogo />
      <AppSearchEntry />
      <AppSearchResults />
      <AppArticleHTML />
    </div>
  </div>
)

export default App
