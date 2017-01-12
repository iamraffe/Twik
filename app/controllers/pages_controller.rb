class PagesController < ApplicationController
  skip_before_filter :authenticate_user!, only: :index
  # skip_before_filter :authenticate_user_from_token!
  # acts_as_token_authentication_handler_for User
  def dashboard
    @menus = Menu.all
  end
end
