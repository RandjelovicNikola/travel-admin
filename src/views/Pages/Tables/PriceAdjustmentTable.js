import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import usePriceAdjustmentApi from "util/api/aPriceAdjustment"

const PriceAdjustmentTable = () => {
  const api = usePriceAdjustmentApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable
          title={"PriceAdjustment"}
          api={api}
          actions={["Edit", "Delete"]}
        />
      </div>
    </React.Fragment>
  )
}

export default PriceAdjustmentTable
