class Users::RegistrationsController < Devise::RegistrationsController
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
