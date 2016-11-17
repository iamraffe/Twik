class SocietiesController < ApplicationController
  def index
    render json: Society.all
  end
end
