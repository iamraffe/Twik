class PagesController < ApplicationController
  skip_before_filter :authenticate_user!, only: :index
  acts_as_token_authentication_handler_for User
  def dashboard

  end
end
