import React, { useContext, useEffect, useState } from "react"
import { Card, CardBody, Col, Table } from "reactstrap"
import Separator from "../Common/Separator"
import MyModal from "./MyModal"
import { ModalContext } from "util/providers/ModalProvider"

const MyTable = ({ title, api, actions }) => {
  const [data, setData] = useState()
  const [emptyModel, setEmptyModel] = useState()
  const [editModalOpen, setEditModalOpen] = useState(false)

  const { openModal, setModalType } = useContext(ModalContext)

  const handleDelete = id => {
    api.remove(id).then(res => {
      if (res)
        api.getAll().then(res => {
          setData(res.data)
        })
    })
  }

  const handleEdit = item => {
    setModalType("edit")
    openModal({ data: item, api })
  }

  useEffect(() => {
    api.getAll().then(res => {
      setData(res.data)
      setEmptyModel(res.emptyModel)
      console.log(res)
    })
  }, [])

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <h4 className="card-title">{title}</h4>

          <div className="table-responsive">
            <Table className="align-middle mb-0">
              <thead>
                {!!emptyModel && (
                  <tr>
                    {Object.keys(emptyModel).map((item1, index1) => {
                      return <th key={index1}>{item1}</th>
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
                              {item2 ? item2.toString() : "-"}
                            </td>
                          )
                        })}
                        <td>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            {actions.map((action, index1) => {
                              return (
                                <>
                                  <button
                                    key={index1}
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
                                  {actions.length > index1 + 1 && (
                                    <Separator ver={false} gap={5} />
                                  )}
                                </>
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
