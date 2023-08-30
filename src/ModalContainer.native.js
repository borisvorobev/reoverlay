import React, { useEffect, useState, Fragment } from 'react'
import { View } from 'react-native'

import { eventManager } from './utils'
import { EVENT } from './constants'

const ModalContainer = () => {
  const [modals, setModals] = useState([])

  useEffect(() => {
    eventManager.on(EVENT.CHANGE_MODAL, (derivedModals) => {
      setModals(derivedModals)
    })

    return () => {
      eventManager.off()
    }
  }, [modals])

  if (!modals.length) return null
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        width: '100%',
        height: '100%',
      }}
    >
      {modals.map(({ modalKey, component, props }) => {
        const Component = component
        return (
          <Fragment key={`id-${modalKey}`}>
            <Component {...props} />
          </Fragment>
        )
      })}
    </View>
  )
}

export default ModalContainer
