class MenusController < ApplicationController
  # before_filter :blob_preview_to_png, :only => [:create, :update]

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
    @menu = Menu.new(menu_params)
    @filename = "#{@menu.name.parameterize}-#{Time.now.to_i}"
    Tempfile.open([@filename, ".png"] , Rails.root.join('tmp')) do |f|
      f << Base64.decode64(params[:preview]['data:image/png;base64,'.length..-1]).force_encoding('UTF-8')
      @menu.preview = f
    end
    @html = params[:rendered_pdf]
    @meta = JSON.parse(params[:menu][:meta])
    pdf = render_to_string pdf: @filename, zoom: 1, dpi: '120', template: "menus/export.pdf.erb", layout: 'layouts/pdf.html.erb', page_size: @meta['size'], encoding: "UTF-8", javascript_delay: 50, orientation: @meta['orientation'], lowquality: false, no_pdf_compression: true, margin:  { top:0, bottom: 0, left: 0, right: 0 }, print_media_type: true, disable_smart_shrinking: true
    Menu.export(@filename, pdf)
    @menu.rendered_pdf = File.open(Rails.root.join('public/pdf',"#{@filename}.pdf"))
    @menu.society_id = @society.id
    @menu.subdomain = current_user.subdomain
    @menu.save
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
    @menu.assign_attributes(menu_params)
    @filename = "#{@menu.name.parameterize}-#{Time.now.to_i}"
    Tempfile.open([@filename , ".png"] , Rails.root.join('tmp')) do |f|
      f << Base64.decode64(params[:preview]['data:image/png;base64,'.length..-1]).force_encoding('UTF-8')
      @menu.preview = f
    end
    @html = params[:rendered_pdf]
    @meta = JSON.parse(params[:menu][:meta])
    pdf = render_to_string pdf: @filename, zoom: 1, dpi: '120', template: "menus/export.pdf.erb", layout: 'layouts/pdf.html.erb', page_size: @meta['size'], encoding: "UTF-8", javascript_delay: 50, orientation: @meta['orientation'], lowquality: false, no_pdf_compression: true, margin:  { top:0, bottom: 0, left: 0, right: 0 }, print_media_type: true, disable_smart_shrinking: true
    Menu.export(@filename, pdf)
    @menu.rendered_pdf = File.open(Rails.root.join('public/pdf',"#{@filename}.pdf"))
    @menu.save
    render json: @menu
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
    @filename = "#{@meta['name'].parameterize}-#{@meta['id']}-#{Time.now.to_i}"
    pdf = render_to_string pdf: @filename, zoom: 1, dpi: '120', template: "menus/export.pdf.erb", layout: 'layouts/pdf.html.erb', page_size: @meta['size'], encoding: "UTF-8", javascript_delay: 50, orientation: @meta['orientation'], lowquality: false, no_pdf_compression: true, margin:  { top:0, bottom: 0, left: 0, right: 0 }, print_media_type: true, disable_smart_shrinking: true
    Menu.export(@filename, pdf)
    render json: {path: "/pdf/#{@filename}.pdf"}
  end

  private
    def menu_params
      params.required(:menu).permit(:name, :orientation, :template_id, :layout, :size, :meta, :sections, :components)
    end

    def society_params
      params.required(:society).permit(:name)
    end
end
