import axios from 'axios'
import 'jquery'

const csrfToken = document.querySelector('[name=csrf-token]').content;
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

document.addEventListener('turbo:load', () => {
  const dataset = $('#account-show').data()
  const userId = dataset.userId

  $('.unfollow-btn').on('click', () => {
    axios.post(`/accounts/${userId}/unfollow`)
      .then((response) => {
        if (response.data) {
          $('.unfollow-btn').addClass('hidden')
          $('.follow-btn').removeClass('hidden')
          updateFollowerAndFollowingCounts(response.data.follower_count, response.data.following_count)
        }
      })
  })

  $('.follow-btn').on('click', () => {
    axios.post(`/accounts/${userId}/follow`)
      .then((response) => {
        if (response.data) {
          $('.unfollow-btn').removeClass('hidden')
          $('.follow-btn').addClass('hidden')
          updateFollowerAndFollowingCounts(response.data.follower_count, response.data.following_count)
        }
      })
  })

  function updateFollowerAndFollowingCounts(followerCount, followingCount) {
    $('.follower-count').text(`${followerCount}`)
    $('.following-count').text(`${followingCount}`)
  }

  axios.get(`/accounts/${userId}/status`)
    .then((response) => {
      if (response.data) {
        $('.unfollow-btn').removeClass('hidden')
      } else {
        $('.follow-btn').removeClass('hidden')
      }
    })
})