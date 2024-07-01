import "@hotwired/turbo-rails";
import axios from 'axios';
import 'jquery';
import "slick-carousel";

const csrfToken = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken

document.addEventListener('turbo:load', () => {

  const shareIcons = document.querySelectorAll('.share-icon')
  const commentIcons = document.querySelectorAll('.comment-icon')

  const stopPropagation = (event) => {
    event.stopPropagation()
  }

  shareIcons.forEach(icon => {
    icon.addEventListener('click', stopPropagation)
  })

  commentIcons.forEach(icon => {
    icon.addEventListener('click', stopPropagation)
  })

  $('.article').each(function() {
    const articleId = $(this).data('article-id')
    const $inactiveHeart = $(this).find('.inactive-heart')
    const $activeHeart = $(this).find('.active-heart')

    axios.get(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data) {
          $inactiveHeart.addClass('hidden')
          $activeHeart.removeClass('hidden')
        } else {
          $activeHeart.addClass('hidden')
          $inactiveHeart.removeClass('hidden')
        }
      })

    $inactiveHeart.on('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      axios.post(`/articles/${articleId}/like`)
        .then((response) => {
          if (response.data) {
            $inactiveHeart.addClass('hidden')
            $activeHeart.removeClass('hidden')
          }
        })
    })

    $activeHeart.on('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      axios.delete(`/articles/${articleId}/like`)
        .then((response) => {
          if (response.data) {
            $activeHeart.addClass('hidden')
            $inactiveHeart.removeClass('hidden')
          }
        })
    })
   })
  

  $('#choose_avatar_button').on('click', (e) => {
    e.preventDefault()
    $('#avatar_upload').trigger('click');
  });

  $('#avatar_upload').on('change', (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      $('#upload_button').trigger('click')
    }
  });

  // Initialize slick slider
  $('.slick-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false
  })
})
