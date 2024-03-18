import React from "react"
import MyTable from "../Components/MyTable/MyTable"
import useImageApi from "util/api/aImage"

const ImageTable = () => {
  const api = useImageApi()

  return (
    <React.Fragment>
      <div className="page-content">
        ~
        <MyTable title={"Image"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default ImageTable
