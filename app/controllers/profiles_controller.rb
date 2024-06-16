class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @profile = current_user.prepare_profile
  end

  def create
    @profile = current_user.build_profile(profile_params)

    if @profile.save
      redirect_to profile_path, notice: '保存できました！'
    else
      render :show
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:avatar)
  end
end
