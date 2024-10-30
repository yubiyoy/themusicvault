// Collect the data from a HTML Form element
// (as an object that we can use as request body in REST)

export default function formDataCollector(form) {
  const data = {};
  for (let element of form.elements) {
    if (['submit', 'file'].includes(element.type)) { continue; }
    // skip elements with names starting with "repeaet"
    if (element.name.startsWith('repeat')) { continue; }
    // get value
    data[element.name] = element.value;
    // handle multiple selects
    if (element.type === 'select-multiple') {
      let arr = [];
      for (let option of element.options) {
        option.selected && arr.push(option.value);
      }
      data[element.name] = arr;
    }
  }
  return data;
}