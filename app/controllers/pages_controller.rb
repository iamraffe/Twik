class PagesController < ApplicationController
  skip_before_filter :authenticate_user!, only: :index

  def dashboard
    @menus = Menu.all.order('updated_at desc')
  end
end
