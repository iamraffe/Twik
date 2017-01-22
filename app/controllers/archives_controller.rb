class ArchivesController < ApplicationController
  def index
    @archives = Archive.where(menu_id: params[:menu_id])
  end

  def show
    @archive = Archive.where(menu_id: params[:menu_id]).where(id: params[:id])
  end
end
