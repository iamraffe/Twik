class PrintersController < ApplicationController
  def create
    @printer = Printer.create(printer_params)
    respond_to do |format|
      format.html { redirect_to user_path(current_user) }
      format.json { render :json => @printer.to_json }
    end
  end

  def update
    @printer = Printer.find(params[:id])
    @printer.update_attributes(printer_params)
    respond_to do |format|
      format.html { redirect_to user_path(current_user) }
      format.json { render :json => @printer.to_json }
    end
  end

  def destroy
    @printer = Printer.find(params[:id])
    @printer.destroy
    flash[:notice] = "Printer deleted successfully"
    respond_to do |format|
      format.html { redirect_to user_path(current_user) }
      format.json { render :json => @printer.to_json }
    end
  end

  private
    def printer_params
      params.require(:printer).permit(:name, :contact, :email, :default)
    end
end
