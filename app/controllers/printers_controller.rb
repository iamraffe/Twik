class PrintersController < ApplicationController
  acts_as_token_authentication_handler_for User
  def index
    @printers = Printer.all
    respond_to do |format|
      format.html {  }
      format.json { render json: {printers: @printers} }
    end
  end

  def create
    @printer = Printer.create(printer_params)
    if @printer.valid?
      respond_to do |format|
        format.html { redirect_to user_path(current_user), notice: "Printer created." }
        format.json { render json: { printer: @printer, :message => "Printer created.", ok: true, status: 200}, :status => :ok }
      end
    else
      respond_to do |format|
        format.html { redirect_to user_path(current_user), alert: "Unable to create printer." }
        format.json { render json: { printer: @printer, errors: @printer.errors :message => "Unable to create printer.", ok: false, status: 422}, :status => :unprocessable_entity }
      end
    end
  end

  def update
    @printer = Printer.find(params[:id])
    if @printer.update_attributes(printer_params)
      respond_to do |format|
        format.html { redirect_to user_path(current_user), notice: "Printer updated." }
        format.json { render json: { printer: @printer, :message => "Printer updated.", ok: true, status: 200}, :status => :ok }
      end
    else
      respond_to do |format|
        format.html { redirect_to user_path(current_user), alert: "Unable to update printer." }
        format.json { render json: { printer: @printer, errors: @printer.errors :message => "Unable to update printer.", ok: false, status: 422}, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @printer = Printer.find(params[:id])
    @printer.destroy
    flash[:notice] = "Printer deleted successfully"
    respond_to do |format|
      format.html { redirect_to user_path(current_user) }
      format.json { render json: {printer: @printer, :message => "Printer deleted.", ok: true, status: 200}, :status => :ok }
    end
  end

  private
    def printer_params
      params.require(:printer).permit(:name, :contact, :email, :default)
    end
end
