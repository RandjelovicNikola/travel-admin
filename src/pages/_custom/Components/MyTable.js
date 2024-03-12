import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Table } from "reactstrap"

const MyTable = ({ title, api }) => {
  const [data, setData] = useState()
  const [emptyModel, setEmptyModel] = useState()

  useEffect(() => {
    api.getAll().then(res => {
      setData(res.data)
      setEmptyModel(res.emptyModel)
      console.log(res.data)
    })
  }, [])

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <h4 className="card-title">{title}</h4>
          {/* <p className="card-title-desc">
            Table cells in <code>&lt;tbody&gt;</code> inherit their alignment
            from <code>&lt;table&gt;</code> and are aligned to the the top by
            default. Use the vertical align classes to re-align where needed.
          </p> */}

          <div className="table-responsive">
            <Table className="align-middle mb-0">
              <thead>
                <tr>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {!!data &&
                  data.map((x, xi) => {
                    return (
                      <tr key={xi}>
                        {Object.values(x).map((y, yi) => {
                          return <td key={yi}>{y}</td>
                        })}
                        {/* <td>
                              <button type="button" className="btn btn-light btn-sm">
                                View
                              </button>
                            </td> */}
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default MyTable