import React from "react"
import MyTable from "../Components/MyTable"
import useBlogPostApi from "util/api/aBlogPost"

const BlogPostTable = () => {
  const api = useBlogPostApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"BlogPost"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default BlogPostTable