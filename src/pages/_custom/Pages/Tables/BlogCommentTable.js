import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import useBlogCommentApi from "util/api/aBlogComment"
import { useLocation } from "react-router-dom"

const BlogCommentTable = () => {
  const api = useBlogCommentApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"BlogComment"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default BlogCommentTable
