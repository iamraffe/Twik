class MenusController < ApplicationController

  def index
    @menus = Menu.all
  end

  def new
    @templates = Template.all
  end

  def create
    if(params[:society][:id].nil?)
      @society = Society.create(society_params)
    else
      @society = Society.find(params[:society][:id])
    end
    # authorize Menu
    @menu = Menu.create(menu_params)
    @menu.update_attributes(society_id: @society.id)
    # byebug
    render json: @menu
  end

  def show
    @menu = Menu.find(params[:id])
    @template = @menu.template
  end

  def edit
    @menu = Menu.find(params[:id])
    @template = @menu.template
  end

  def update
    @menu = Menu.find(params[:id])
    @menu.update_attributes(menu_params)
    @menu
  end

  def destroy
    @menu = Menu.find(params[:id])
    Menu.destroy(params[:id])
    authorize @menu
    @menu
  end

  def export
    @html = params[:html]
    @meta = JSON.parse(params[:meta])
    # byebug
    # byebug
    # @menu = Menu.find(params[:menu_id]) || {}
    @filename = "#{@meta['title'].parameterize}-#{@meta['id']}-#{Time.now.to_i}"
    # @fonts = @menu.fonts
    # @svg = params[:export]
    # @orientation = @menu.width > @menu.height ? "Landscape" : "Portrait"
    pdf = render_to_string pdf: @filename, zoom: 0.97, template: "menus/export.pdf.erb", page_size: @meta['size'], encoding: "UTF-8", javascript_delay: 50, orientation: @meta['orientation'], lowquality: false, no_pdf_compression: true, margin:  { top:0, bottom: 0, left: 0, right: 0 }
    Menu.export(@filename, pdf)
    render json: {path: "/pdf/#{@filename}.pdf"}
    # redirect_to "/pdf/#{@filename}.pdf"
  end

  private
    def menu_params
      params.required(:menu).permit(:name, :orientation, :template_id, :layout, :size, :title, :meta, :sections)
    end

    def society_params
      params.required(:society).permit(:name)
    end
end
