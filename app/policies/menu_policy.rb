class MenuPolicy
  attr_reader :current_user, :menu

  def initialize(current_user, menu)
    @current_user = current_user
    @menu = menu
  end

  def create?
    is_creative?
  end

  def new?
    is_creative?
  end

  def destroy?
    @current_user.owner?
  end

  def is_creative?
    @current_user.owner? || @current_user.designer?
  end

  private

end
