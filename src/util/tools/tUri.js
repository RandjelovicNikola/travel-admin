export function ObjectToQuery(obj) {
  if (obj) {
    return `${Object.entries(obj)
      .map(([name, value], index) =>
        index === 0 ? `?${name}=${value}` : `&${name}=${value}`
      )
      .join("")}`;
  }

  return "";
}
