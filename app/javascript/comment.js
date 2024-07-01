import axios from 'axios'
import 'jquery'

const csrfToken = document.querySelector('[name=csrf-token]').content;
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

const appendComment = (comment) => {
  $('.comment').append(`
    <li class="comment__row">
      <div class="comment__image">
        <img src="${comment.user.avatar_image_url}" alt="Avatar" class="comment__image-img">
      </div>
      <div class="comment__content">
        <h2 class="comment__user-name">${comment.user.account}</h2>
        <p class="comment__text">${comment.content}</p>
      </div>
    </li>
  `)
}

document.addEventListener('turbo:load', () => {
  const dataset = $('#article-show').data()
  const articleId = dataset.articleId

  $('.comment__submit').on('click', () => {
    const content = $('#comment_content').val()
    if (!content) {
      window.alert('コメントを入力してください！')
    } else {
      axios.post(`/articles/${articleId}/comments`, {
        comment: {content: content}
      })
        .then((response) => {
          const comment = response.data
          appendComment(comment)
          $('#comment_content').val('')
        })
    }
  })

  axios.get(`/articles/${articleId}/comments`)
    .then((response) => {
      const comments = response.data

      comments.forEach(function(comment) {
        appendComment(comment)
      })
    })
})