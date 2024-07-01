class UnfollowsController < ApplicationController
  before_action :authenticate_user!

  def create
    user = User.find(params[:account_id])
    current_user.unfollow!(user)
    
    render json: {success: true, follower_count: user.followers.count, following_count: user.followings.count}
  end
end