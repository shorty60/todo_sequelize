let form =
  document.querySelector('#register-form') ||
  document.querySelector('#login-form')

if (!form) {
  form = document.querySelector('#todo-form')
}

const button = document.querySelector('.submit-button')
button.addEventListener('click', () => {
  form.classList.add('was-validated')
})

form.addEventListener('submit', event => {
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    alert('有些欄位沒有填寫喔!')
  }
})
