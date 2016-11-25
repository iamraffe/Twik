class Users::RegistrationsController < Devise::RegistrationsController
  # skip_before_action :authenticate_user_from_token!
  def new
    redirect_to root_path
  end

  def create
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { super }
    end
  end
end
