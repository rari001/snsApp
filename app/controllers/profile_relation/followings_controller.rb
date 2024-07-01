class ProfileRelation::FollowingsController < ApplicationController
  before_action :authenticate_user!

  def index
  end
end