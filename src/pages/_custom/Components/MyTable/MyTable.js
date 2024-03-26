import React, { useContext, useEffect, useRef, useState } from "react"
import { Card, CardBody, Col, Row, Table } from "reactstrap"
import MySeparator from "../../Common/MySeparator"
import { ModalContext } from "util/providers/ModalProvider"
import { Link } from "react-router-dom"
import { toCapitalized } from "util/tools/tDisplay"
import SearchInputComponent from "./SearchInputComponent"
import { QueryToObject } from "util/tools/tUri"

const MyTable = ({ title, api, actions }) => {
  const [isFirstFetch, setIsFirstFetch] = useState(true)
  const [data, setData] = useState()
  const [totalCount, setTotalCount] = useState(0)
  const [emptyModel, setEmptyModel] = useState()
  const [searchModel, setSearchModel] = useState(
    QueryToObject(window.location.search) ?? {}
  )

  const debounceTimeout = useRef(null)

  const {
    openModal,
    setModalType,
    refresh,
    setModalEmptyModel,
    setModalTitle,
  } = useContext(ModalContext)

  const handleFetch = () => {
    const filteredSearchModel = Object.fromEntries(
      Object.entries(searchModel).filter(([key, value]) => value !== null)
    )

    api.getAll(filteredSearchModel).then(res => {
      setData(res.list)
      setTotalCount(res.count)

      if (isFirstFetch) {
        setSearchModel(res.searchModel)
        setEmptyModel(res.emptyModel)
        setIsFirstFetch(false)
      }
    })
  }

  const handleClear = () => {
    setIsFirstFetch(true)
    setSearchModel({})
  }

  const handleAdd = () => {
    setModalEmptyModel(emptyModel)
    setModalTitle(`Add ${title}`)
    setModalType("add")

    var addData = {}
    Object.keys(emptyModel).map((x, i) => {
      addData[x] = null
    })

    openModal({ data: addData, api })
  }

  const handleEdit = item => {
    setModalEmptyModel(emptyModel)
    setModalTitle(`Edit ${title}`)
    setModalType("edit")
    openModal({ data: item, api })
  }

  const handleDelete = id => {
    setModalType("delete")
    openModal({ data: id, api })
  }

  const handleSearchChange = ({ key, value }) => {
    setSearchModel(currentData => ({
      ...currentData,
      [key]: value,
    }))
  }

  const handleSorting = sortBy => {
    setSearchModel({
      ...searchModel,
      sortOrder:
        searchModel.sortOrder == 1 || searchModel.sortBy != sortBy ? 0 : 1,
      sortBy,
    })
  }

  const handleLastPage = () => {
    setSearchModel({
      ...searchModel,
      page: searchModel.page - 1,
    })
  }

  const handleNextPage = () => {
    setSearchModel({
      ...searchModel,
      page: searchModel.page + 1,
    })
  }

  const handleSetPage = page => {
    setSearchModel({
      ...searchModel,
      page,
    })
  }

  const displayItemCount = () => {
    var currentStart =
      searchModel.page * searchModel.pageSize - searchModel.pageSize
    var currentEnd = searchModel.page * searchModel.pageSize

    if (currentEnd > totalCount) currentEnd = totalCount

    var any = !!totalCount

    return (
      <Col sm={12} md={5}>
        <div className="dataTables_info">
          Showing {any ? currentStart || 1 : 0} to {currentEnd} of {totalCount}{" "}
          items
        </div>
      </Col>
    )
  }

  useEffect(() => {
    if (isFirstFetch) {
      handleFetch()
    } else {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }

      debounceTimeout.current = setTimeout(() => {
        handleFetch()
      }, 500)

      return () => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current)
        }
      }
    }
  }, [refresh, searchModel])

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
                onClick={handleFetch}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Refresh
              </button>
              <MySeparator ver={false} />
              <button
                onClick={handleClear}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Clear
              </button>
            </div>
          </div>

          <MySeparator gap={20} />
          {!!searchModel && !!emptyModel && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                columnGap: 20,
              }}
            >
              {Object.entries(searchModel).map((x, i) => (
                <SearchInputComponent
                  key={i}
                  item={x}
                  emptyModel={emptyModel}
                  handleInputChange={handleSearchChange}
                />
              ))}
            </div>
          )}
          <MySeparator gap={20} />

          <div className="table-responsive">
            <Table className="align-middle mb-0 dataTable">
              <thead>
                {!!emptyModel && (
                  <tr>
                    {Object.keys(emptyModel).map((item1, index1) => {
                      return (
                        <th
                          key={index1}
                          onClick={() => handleSorting(toCapitalized(item1))}
                          className={`sorting ${
                            searchModel.sortBy?.toLowerCase() ==
                              item1.toLowerCase() && searchModel.sortOrder == 0
                              ? "sorting_asc"
                              : searchModel.sortBy?.toLowerCase() ==
                                  item1.toLowerCase() &&
                                searchModel.sortOrder == 1
                              ? "sorting_desc"
                              : ""
                          }`}
                        >
                          {toCapitalized(item1)}
                        </th>
                      )
                    })}
                    <th style={{ display: "flex", justifyContent: "end" }}>
                      Operations
                    </th>
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
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "end",
                            }}
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
                                      typeof action == "string"
                                        ? action == "Edit"
                                          ? () => handleEdit(item1)
                                          : action == "Delete"
                                          ? () => handleDelete(item1.id)
                                          : console.log(
                                              "Unknown action in the table"
                                            )
                                        : () => action.callback(item1)
                                    }
                                  >
                                    {typeof action == "string"
                                      ? action
                                      : action.name}
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

          <MySeparator gap={20} />

          <Row style={{ margin: "0 0" }}>
            {displayItemCount()}

            <Col sm={12} md={7}>
              <div className={"paginationWrapper"}>
                <ul className={"pagination"}>
                  <li
                    className={`paginate_button page-item previous ${
                      searchModel.page <= 1 ? "disabled" : ""
                    }`}
                  >
                    <Link to="#" className="page-link" onClick={handleLastPage}>
                      <i className="mdi mdi-chevron-left"></i>
                    </Link>
                  </li>
                  {searchModel &&
                    Array.from(
                      {
                        length:
                          totalCount / searchModel.pageSize < 1
                            ? 1
                            : totalCount % searchModel.pageSize > 0
                            ? totalCount / searchModel.pageSize + 1
                            : totalCount / searchModel.pageSize,
                      },
                      (_, index) => index + 1
                    ).map((x, i) => (
                      <li
                        key={i}
                        className={`paginate_button page-item ${
                          searchModel.page == x ? "active" : ""
                        }`}
                      >
                        <Link
                          to="#"
                          className="page-link"
                          onClick={() => handleSetPage(x)}
                        >
                          {x}
                        </Link>
                      </li>
                    ))}
                  <li
                    className={`paginate_button page-item next ${
                      searchModel.page * searchModel.pageSize >= totalCount
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <Link to="#" className="page-link" onClick={handleNextPage}>
                      <i className="mdi mdi-chevron-right"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  )
}

export default MyTable
