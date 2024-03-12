import React from "react"
import MyTable from "../Components/MyTable"
import useCountryApi from "util/api/aCountry"

const CountryTable = () => {
  const api = useCountryApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"Country Table"} api={api} />
      </div>
    </React.Fragment>
  )
}

export default CountryTable
