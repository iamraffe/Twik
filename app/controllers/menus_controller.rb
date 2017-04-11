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
    # @menu.wildcards = JSON.parse(params[:menu][:wildcards])
    @filename = "#{@menu.name.parameterize}-#{Time.now.to_i}"
    Tempfile.open([@filename, ".png"] , Rails.root.join('tmp')) do |f|
      f << Base64.decode64(params[:preview]['data:image/png;base64,'.length..-1]).force_encoding('UTF-8')
      @menu.preview = f
    end
    @html = params[:rendered_pdf]
    @meta = JSON.parse(params[:menu][:meta])
    pdf = render_to_string pdf: @filename, template: "menus/export.pdf.erb", layout: 'layouts/pdf.html.erb', page_size: @meta['size'], encoding: "UTF-8", javascript_delay: 50, orientation: @meta['orientation'], lowquality: false, no_pdf_compression: false, margin:  { top:0, bottom: 0, left: 0, right: 0 }
    Menu.export(@filename, pdf)
    @menu.rendered_pdf = File.open(Rails.root.join('public/pdf',"#{@filename}.pdf"))
    @menu.society_id = @society.id
    @menu.subdomain = current_user.subdomain
    if @menu.save
      render json: { menu: @menu, :message => "Menu created", ok: true, status: 200}, :status => :ok
    else
      render json: { menu: @menu, errors: @menu.errors, :message => "Unable to create menu", ok: false, status: 422}, :status => :unprocessable_entity
    end
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
    # byebug
    # @menu.wildcards = JSON.parse(params[:menu][:wildcards])
    @menu.assign_attributes(menu_params)
    @filename = "#{@menu.name.parameterize}-#{Time.now.to_i}"
    Tempfile.open([@filename , ".png"] , Rails.root.join('tmp')) do |f|
      f << Base64.decode64(params[:preview]['data:image/png;base64,'.length..-1]).force_encoding('UTF-8')
      @menu.preview = f
    end
    @html = params[:rendered_pdf]
    @meta = JSON.parse(params[:menu][:meta])
    pdf = render_to_string pdf: @filename, template: "menus/export.pdf.erb", layout: 'layouts/pdf.html.erb', page_size: @meta['size'], encoding: "UTF-8", javascript_delay: 50, orientation: @meta['orientation'], lowquality: false, no_pdf_compression: false, margin:  { top:0, bottom: 0, left: 0, right: 0 }
    Menu.export(@filename, pdf)
    @menu.rendered_pdf = File.open(Rails.root.join('public/pdf',"#{@filename}.pdf"))
    if @menu.save
      render json: { menu: @menu, :message => "Menu updated", ok: true, status: 200}, :status => :ok
    else
      render json: { menu: @menu, errors: @menu.errors, :message => "Unable to update menu", ok: false, status: 422}, :status => :unprocessable_entity
    end
    # @menu.save
    # render json: @menu
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
    pdf = render_to_string pdf: @filename, template: "menus/export.pdf.erb", layout: 'layouts/pdf.html.erb', page_size: @meta['size'], encoding: "UTF-8", javascript_delay: 50, orientation: @meta['orientation'], lowquality: false, no_pdf_compression: false, margin:  { top:0, bottom: 0, left: 0, right: 0 }
    Menu.export(@filename, pdf)
    render json: {path: "/pdf/#{@filename}.pdf"}
  end

  def duplicate
    @og = Menu.find(params[:menu_id])
    @duplicate = @og.dup
    @duplicate.name = "#{@og.name} [Duplicate]"
    meta = JSON.parse(@og.meta)
    meta["name"] = "#{@og.name} [Duplicate]"
    @duplicate.meta = JSON.generate(meta)
    @duplicate.rendered_pdf = URI.parse("http:#{@og.rendered_pdf}")
    @duplicate.save
    respond_to do |format|
      format.js { }
      format.html { redirect_to :back , :notice => "Menu copy created" }
    end
  end

  private
    def menu_params
      params.required(:menu).permit(:name, :orientation, :template_id, :layout, :size, :meta, :sections, :components, :wildcards)
    end

    def society_params
      params.required(:society).permit(:name)
    end
end
