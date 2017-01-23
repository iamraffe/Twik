class ArchivesController < ApplicationController
  def index
    @archives = Archive.where(menu_id: params[:menu_id]).paginate(:page => params[:page], :per_page => 4)
  end

  def show
    @archive = Archive.where(menu_id: params[:menu_id]).where(id: params[:id])
  end
end
