class PagesController < ApplicationController
  skip_before_filter :authenticate_user!, only: :index
  # skip_before_filter :authenticate_user_from_token!
  # acts_as_token_authentication_handler_for User
  def dashboard
    @grouped_menus = Menu.all.order(:updated_at).group_by(&:template_id)
    @templates = Template.find(@grouped_menus.keys)
  end
end
