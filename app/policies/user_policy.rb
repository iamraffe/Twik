class UserPolicy
  attr_reader :current_user, :user

  def initialize(current_user, user)
    @current_user = current_user
    @user = user
  end

  def update?
    @current_user.owner?
  end

  def edit?
    @current_user.owner?
  end

  def change_role?
    @current_user.owner? && @user != @current_user && @user.confirmed?
  end
  def destroy?
    @current_user.owner? && @user != @current_user
  end
end
