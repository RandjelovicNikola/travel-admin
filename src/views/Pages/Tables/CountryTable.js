import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import useCountryApi from "util/api/aCountry"

const CountryTable = () => {
  const api = useCountryApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"Country"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default CountryTable
