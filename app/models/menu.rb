class Menu < ActiveRecord::Base
  # has_many :sections
  has_many :archives
  has_many :images, as: :imageable
  belongs_to :template
  belongs_to :society
  has_attached_file :preview,

  :storage => :s3,
  :s3_credentials => Proc.new{|a| a.instance.s3_credentials },
      :url => "/:subdomain/:id-:subdomain/:style/:basename.:extension",
      :path => ":subdomain/:id-:subdomain/:style/:basename.:extension",
  # :url => "/system/#{Apartment::Tenant.current}/:style_:filename",
  # :path => ":rails_root/public/system/#{Apartment::Tenant.current}/:style_:filename",
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

  # def fonts
  #   template.select{|object| object['type'] == 'text' }.map{|o| o["fontFamily"]}
  # end

  def self.export(filename, pdf)
    save_path = Rails.root.join('public/pdf',"#{filename}.pdf")
    File.open(save_path, 'wb') do |file|
      file << pdf
    end
  end
end
