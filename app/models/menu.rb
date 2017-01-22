class Menu < ActiveRecord::Base
  # has_many :sections
  has_many :archives
  has_many :images, as: :imageable
  belongs_to :template
  belongs_to :society
  after_save :record_archive
  has_attached_file :preview,
  :storage => :s3,
  :s3_credentials => Proc.new{|a| a.instance.s3_credentials },
      :url => "/:subdomain/:id-:subdomain/:style/:basename.:extension",
      :path => ":subdomain/:id-:subdomain/:style/:basename.:extension",
  :styles => {
    :thumb => "500x350>" },
  :convert_options => {
    :thumb => "-quality 75 -strip" }
  validates_attachment_content_type :preview, content_type: /\Aimage\/.*\Z/

  Paperclip.interpolates :subdomain do |attachment, style|
    attachment.instance.subdomain
  end

  def s3_credentials
    {:bucket => ENV["S3_BUCKET_NAME"], :access_key_id => ENV["AWS_ACCESS_KEY_ID"], :secret_access_key => ENV["AWS_SECRET_ACCESS_KEY"], :s3_region => "us-east-1",}
  end

  def self.export(filename, pdf)
    save_path = Rails.root.join('public/pdf',"#{filename}.pdf")
    File.open(save_path, 'wb') do |file|
      file << pdf
    end
  end

  private
    def record_archive
      Archive.create({
        name: self.name,
        preview: self.preview,
        template_id: self.template_id,
        society_id: self.society_id,
        menu_id: self.id,
        meta: self.meta,
        components: self.components,
        sections: self.sections,
        component_styles: self.component_styles,
        subdomain: self.subdomain 
      })
    end
end
