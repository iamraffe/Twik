class ImagesController < ApplicationController
  def index
    @images = Image.search_by_title(params[:search_term])
    render json: @images.to_json
  end

  def create
    @image = current_user.images.create(image_params)
    render json: @image.to_json
  end

  private
    def image_params
      params.require(:image).permit(:file, :title, :private)
    end
end
