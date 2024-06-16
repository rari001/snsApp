import "@hotwired/turbo-rails"
import axios from 'axios'
import $ from 'jquery'

const csrfToken = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken

document.addEventListener('turbo:load', () => {
  $('#choose_avatar_button').on('click', (e) => {
    e.preventDefault()
    $('#avatar_upload').trigger('click')
  })

  $('#avatar_upload').on('change', (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      $('#upload_button').trigger('click')
    }
  })
})