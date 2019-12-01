import React from 'react'
import { Loader, Message } from 'semantic-ui-react'


const LoadComponent = function (props) {

  const { loadedObj, renderer, children } = props
  const loader = <Loader active style={{ top: '30%' }}>Chargement en cours ... veuillez patienter</Loader>
  const error = errorMessage => <Message error>{errorMessage}</Message>

  if (!loadedObj) {
    return loader
  } else if (loadedObj.error) {
    return error(loadedObj.error)
  } else if (renderer) {
    return renderer
  } else if (children) {
    return children
  } else {
    return <div className='center'><h1>???</h1></div>
  }
}

export default LoadComponent