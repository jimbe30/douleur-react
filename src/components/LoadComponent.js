import React from 'react'
import { Loader, Message } from 'semantic-ui-react'


const LoadComponent = function (props) {

  const { loadedObject, render, children, ...rest } = props

  const loader = <Loader active style={{ top: '30%' }}>Chargement en cours ... veuillez patienter</Loader>
  const error = errorMessage => errors([errorMessage])
  const errors = errorList => {
    if (Array.isArray(errorList)) {
      return <Message error {...rest}>{
        errorList.map(
          (error, index) => {
            let key = index, message = error
            if (error.key) {
              key = error.key
            }
            if (error.message) {
              message = (error.key ? error.key + ': ' : index + '. ') + error.message
            }
            return <div key={key}>{message}</div>
          }
        )}
      </Message>
    }
  }

  if (!loadedObject) {
    return loader
  } else if (loadedObject.error) {
    return error(loadedObject.error)
  } else if (loadedObject.errors) {
    return errors(loadedObject.errors)
  } else if (render) {
    return render
  } else if (children) {
    return children
  } else {
    return <div className='center'><h1>???</h1></div>
  }
}

export default LoadComponent