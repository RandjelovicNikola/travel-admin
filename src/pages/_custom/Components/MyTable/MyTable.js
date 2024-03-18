import React, { useContext, useEffect, useState } from "react"
import { Card, CardBody, Col, Table } from "reactstrap"
import MySeparator from "../../Common/MySeparator"
import { ModalContext } from "util/providers/ModalProvider"

const MyTable = ({ title, api, actions }) => {
  const [data, setData] = useState()
  const [emptyModel, setEmptyModel] = useState()

  const { openModal, setModalType, refresh, setModalEmptyModel } =
    useContext(ModalContext)

  const handleRefresh = () => {
    api.getAll().then(res => {
      setData(res.list)
    })
  }

  const handleAdd = () => {
    setModalEmptyModel(emptyModel)
    setModalType("add")

    var addData = {}
    Object.keys(emptyModel).map((x, i) => {
      addData[x] = null
    })

    openModal({ data: addData, api })
  }

  const handleEdit = item => {
    setModalEmptyModel(emptyModel)
    setModalType("edit")
    openModal({ data: item, api })
  }

  const handleDelete = id => {
    setModalType("delete")
    openModal({ data: id, api })
  }

  useEffect(() => {
    api.getAll().then(res => {
      setData(res.list)
      setEmptyModel(res.emptyModel)
    })
  }, [refresh])

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4 className="card-title">{title}</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "5px 5px 0 0",
              }}
            >
              <button
                onClick={handleAdd}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Add
              </button>
              <MySeparator ver={false} />
              <button
                onClick={handleRefresh}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <Table className="align-middle mb-0">
              <thead>
                {!!emptyModel && (
                  <tr>
                    {Object.keys(emptyModel).map((item1, index1) => {
                      return (
                        <th key={index1}>
                          {item1[0].toUpperCase() + item1.slice(1)}
                        </th>
                      )
                    })}
                    <th>Operations</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {!!data &&
                  data.map((item1, index1) => {
                    return (
                      <tr key={index1}>
                        {Object.values(item1).map((item2, index2) => {
                          return (
                            <td key={index2}>
                              {item2 != null ? item2.toString() : "-"}
                            </td>
                          )
                        })}
                        <td>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            {actions.map((action, index1) => {
                              return (
                                <div
                                  key={index1}
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  {index1 != 0 && (
                                    <MySeparator ver={false} gap={5} />
                                  )}
                                  <button
                                    type="button"
                                    className="btn btn-light btn-sm"
                                    onClick={
                                      action == "Edit"
                                        ? () => handleEdit(item1)
                                        : action == "Delete"
                                        ? () => handleDelete(item1.id)
                                        : console.log(
                                            "Unknown action in the table"
                                          )
                                    }
                                  >
                                    {action}
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        </td>
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
