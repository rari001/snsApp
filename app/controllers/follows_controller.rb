class FollowsController < ApplicationController
  before_action :authenticate_user!

  def create
    user = User.find(params[:account_id])
    current_user.follow!(user)
    
    render json: {success: true, follower_count: user.followers.count, following_count: user.followings.count}
  end
end