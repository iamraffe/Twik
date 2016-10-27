class UploadsController < ApplicationController
  def create
    @upload = Upload.create(upload_params)
  end

  private

    def upload_params
      params.require(:upload).permit(:mediable)
    end
end
