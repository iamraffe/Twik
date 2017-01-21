class UsersController < ApplicationController
  # acts_as_token_authentication_handler_for User
  def index
    @users = User.all.select(User.attribute_names - ["authentication_token", "invitation_token"])
    respond_to do |format|
      format.html {  }
      format.json { render json: {users: @users} }
    end
  end

  def show
    @users = User.all.select(User.attribute_names - ["authentication_token", "invitation_token"])
    # byebug
    @stripe_data = current_user.stripe_id.nil? ? nil : Stripe::Customer.retrieve(current_user.stripe_id)
    @printers = Printer.all
    # byebug
  end

  def update
    @user = User.find(params[:id])
    # authorize @user
    if @user.update_attributes(user_params)
      respond_to do |format|
        format.js { }
        format.html { redirect_to :back , :notice => "User updated." }
        format.json { render json: {user: @user, :message => "User updated.", ok: true, status: 200}, :status => :ok }
      end
    else
      respond_to do |format|
        format.js { }
        format.html { redirect_to :back, :alert => "Unable to update user." }
        format.json { render json: {user: @user, :message => "Unable to update user.", ok: false, status: 422}, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @user = User.find(params[:id])
    # authorize @user
    User.destroy(params[:id])
    flash[:notice] = "User deleted successfully"
    respond_to do |format|
      format.html { redirect_to users_path }
      format.json { render json: {user: @user, :message => "User deleted.", ok: true, status: 200}, :status => :ok }
    end
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
      params.require(:user).permit(:role, :email, :name, :phone, :title, :avatar, :organization, :subdomain)
    end
end
