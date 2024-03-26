import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import useBlogPostApi from "util/api/aBlogPost"

const BlogPostTable = () => {
  const api = useBlogPostApi()

  const handleCommentsClick = post => {
    window.open(`/blog-comments?blogPostId=${post.id}`)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable
          title={"BlogPost"}
          api={api}
          actions={[
            { name: "Comments", callback: handleCommentsClick },
            "Edit",
            "Delete",
          ]}
        />
      </div>
    </React.Fragment>
  )
}

export default BlogPostTable
