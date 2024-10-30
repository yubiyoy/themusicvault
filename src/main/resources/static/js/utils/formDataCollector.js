// Collect the data from a HTML Form element
// (as an object that we can use as request body in REST)

export default function formDataCollector(form) {
  const data = {};
  for (let element of form.elements) {
    if (['submit', 'file'].includes(element.type)) { continue; }
    // handle multiple selects
    if (element.type === 'select-multiple') {
      console.log("HANDLING IT", element)
    }
    // skip elements with names starting with "repeaet"
    if (element.name.startsWith('repeat')) { continue; }
    data[element.name] = element.value;
  }
  return data;
}