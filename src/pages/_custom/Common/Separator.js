import React from "react"

const Separator = ({ ver = true, gap = 10 }) => {
  return <div style={ver ? { height: gap } : { width: gap }}></div>
}

export default Separator
