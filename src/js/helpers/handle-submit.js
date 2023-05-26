export function handleSubmit(formData, eventName, form) {
  const formObj = Object.fromEntries(formData);
  console.log(formObj);

  form.dispatchEvent(
    new CustomEvent(eventName, {
      bubbles: true,
      detail: { data: formObj },
    })
  );
}
