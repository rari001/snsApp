class AccountsRelation::FollowingsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.find(params[:account_id])
  end
end