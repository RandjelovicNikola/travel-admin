import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import useFAQApi from "util/api/aFAQ"

const FAQTable = () => {
  const api = useFAQApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"FAQ"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default FAQTable
