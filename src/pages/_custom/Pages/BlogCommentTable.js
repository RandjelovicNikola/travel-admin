import React from "react"
import MyTable from "../Components/MyTable/MyTable"
import useBlogCommentApi from "util/api/aBlogComment"

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
