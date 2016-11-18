class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show 
    @users = User.all
    @stripe_data = current_user.stripe_id.nil? ? nil : Stripe::Customer.retrieve(current_user.stripe_id)
    # byebug 
  end

  def update
    @user = User.find(params[:id])
    authorize @user
    if @user.update_attributes(user_params)
      redirect_to user_path(current_user), :notice => "User updated."
    else
      redirect_to user_path(current_user), :alert => "Unable to update user."
    end
  end

  def destroy
    @user = User.find(params[:id])
    authorize @user
    User.destroy(params[:id])
    flash[:notice] = "User deleted successfully"
    redirect_to users_path
  end

  def update_payment_method
    # byebug
    user = Stripe::Customer.retrieve(current_user.stripe_id)
    user.sources.retrieve(params['stripeCard']).delete
    user.sources.create(source: params['stripeToken'])
    # user.source = params['stripeToken']
    # user.save

    flash[:success] = "Your card details have been updated!"
    redirect_to user_path(current_user)

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to user_path(current_user)
  end

  def add_payment_method
    user = Stripe::Customer.retrieve(current_user.stripe_id)
    user.sources.create(source: params['stripeToken'])
    # user.save

    flash[:success] = "Your card has been added!"
    redirect_to user_path(current_user)

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to user_path(current_user)
  end

  def delete_payment_method
    user = Stripe::Customer.retrieve(current_user.stripe_id)
    # byebug
    user.sources.retrieve(params['stripeCard']).delete
    # user.save

    flash[:success] = "Your card has been deleted!"
    redirect_to user_path(current_user)

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to user_path(current_user)
  end

  private
    def user_params
      params.require(:user).permit(:role, :email, :name, :phone, :title, :avatar, :organization)
    end
end
