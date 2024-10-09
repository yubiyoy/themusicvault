export default function formDataCollector(form) {
  const data = {};
  for (let element of form.elements) {
    if (['submit', 'file'].includes(element.type)) { continue; }
    data[element.name] = element.value;
  }
  return data;
}