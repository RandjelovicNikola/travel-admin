import React, { useCallback, memo, useState, useEffect } from "react"
import { Row } from "reactstrap"
import { useApi } from "util/api/base/aBase"
import MyTextInput from "../MyInput/MyTextInput"
import MyNumberInput from "../MyInput/MyNumberInput"
import MyCheckboxInput from "../MyInput/MyCheckboxInput"
import MySelectInput from "../MyInput/MySelectInput"
import Enums from "util/constants/enums"
import MyDateInput from "../MyInput/MyDateInput"

const SearchInputComponent = memo(({ item, emptyModel, handleInputChange }) => {
  const [data, setData] = useState(null)
  const [isEnum, setIsEnum] = useState(emptyModel[item[0]]?.startsWith("e"))

  const handleChange = useCallback(
    value => {
      handleInputChange({
        key: item[0],
        value: value != "None" ? value : null,
      })
    },
    [item, handleInputChange]
  )

  useEffect(() => {
    if (isEnum) {
      console.log(item[0])
      setData(
        Object.entries(Enums[emptyModel[item[0]]]).map(x => ({
          id: x[0],
          name: x[1],
        }))
      )
    } else if (item[0].endsWith("Id")) {
      var api = useApi(item[0].slice(0, -2))

      api.getAll({ dropdown: true }).then(res => {
        setData(res.list)
      })
    }
  }, [])

  if (isEnum || item[0].endsWith("Id")) {
    return (
      <MySelectInput
        item={item}
        data={data}
        handleChange={handleChange}
        expand={true}
        isEnum={isEnum}
      />
    )
  } else {
    switch (emptyModel[item[0]]) {
      case "string":
        return (
          <MyTextInput item={item} handleChange={handleChange} expand={true} />
        )
      // case "boolean":
      //   return (
      //     <MyCheckboxInput
      //       item={item}
      //       handleChange={handleChange}
      //       expand={true}
      //     />
      //   )
      case "int16":
      case "int32":
      case "int64":
      case "double":
      case "float":
      case "decimal":
        return (
          <MyNumberInput
            item={item}
            handleChange={handleChange}
            expand={true}
          />
        )
      case "dateTime":
        return (
          <MyDateInput
            item={item}
            handleChange={handleChange}
            range={false}
            expand={true}
          />
        )
      default:
        null
    }
  }
})

// const MySearchSelectInput = memo(({ controller, handleChange, isEnum }) => {
//   const [data, setData] = useState(null)

//   const api = useApi(!isEnum ? controller : "common/enum")

//   const handleChangeLocal = item => {
//     handleChange(item.id)
//   }

//   useEffect(() => {
//     api
//       .getAll(!isEnum ? {} : { name: controller })
//       .then(res => setData(res.list))
//   }, [])

//   return (
//     <Row className="mb-3">
//       <label className="col-md-3 col-form-label">{controller}</label>

//       <div className="col-md-9">
//         <select className={"form-select"}>
//           {(!!data &&
//             data.map((x, i) => (
//               <option key={i} onClick={() => handleChangeLocal(x)}>
//                 {x.id} - {x.name}
//               </option>
//             ))) || <option>No items</option>}
//         </select>
//       </div>
//     </Row>
//   )
// })

SearchInputComponent.displayName = "SearchInputComponent"
// MySearchSelectInput.displayName = "MySearchSelectInput"

export default SearchInputComponent
