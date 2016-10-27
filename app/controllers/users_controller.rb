class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def update
    @user = User.find(params[:id])
    authorize @user
    if @user.update_attributes(user_params)
      redirect_to users_path, :notice => "User updated."
    else
      redirect_to users_path, :alert => "Unable to update user."
    end
  end

  def destroy
    @user = User.find(params[:id])
    authorize @user
    User.destroy(params[:id])
    flash[:notice] = "User deleted successfully"
    redirect_to users_path
  end

  private
    def user_params
      params.require(:user).permit(:role)
    end
end
