import React, { useState, useMemo } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

export default () => {
  const [hideOnScroll, setHideOnScroll] = useState(true)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) {
        setHideOnScroll(isShow)
      }
    },
    [hideOnScroll]
  )

  return useMemo(
    () => (
      <>
        <div show={hideOnScroll}>
          <div className="pageTitle normalText">George FE test</div>
        </div>
      </>
    ),
    [hideOnScroll]
  )
}
