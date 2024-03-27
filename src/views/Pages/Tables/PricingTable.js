import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import usePricingApi from "util/api/aPricing"

const PricingTable = () => {
  const api = usePricingApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"Pricing"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default PricingTable
