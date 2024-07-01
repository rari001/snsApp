class StatusesController < ApplicationController
  before_action :authenticate_user!

  def show
    user = User.find(params[:account_id])
    following_status = current_user.has_followed?(user)

    render json: following_status
  end
end