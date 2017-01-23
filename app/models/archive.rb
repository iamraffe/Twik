class Archive < ApplicationRecord
  belongs_to :menu
  belongs_to :society
  belongs_to :template
  has_attached_file :preview,
  :storage => :s3,
  :s3_credentials => Proc.new{|a| a.instance.s3_credentials },
      :url => "/:subdomain/archives/previews/:id-:subdomain/:style/:basename.:extension",
      :path => ":subdomain/archives/previews/:id-:subdomain/:style/:basename.:extension",
  :styles => {
    :thumb => "500x350>" },
  :convert_options => {
    :thumb => "-quality 75 -strip" }
  validates_attachment_content_type :preview, content_type: /\Aimage\/.*\Z/
  has_attached_file :rendered_pdf,
  :storage => :s3,
  :s3_credentials => Proc.new{|a| a.instance.s3_credentials },
      :url => "/:subdomain/archives/renders/:id-:subdomain/:style/:basename.:extension",
      :path => ":subdomain/archives/renders/:id-:subdomain/:style/:basename.:extension"
  validates_attachment :rendered_pdf, content_type: { content_type: "application/pdf" }

  Paperclip.interpolates :subdomain do |attachment, style|
    attachment.instance.subdomain
  end

  def s3_credentials
    {:bucket => ENV["S3_BUCKET_NAME"], :access_key_id => ENV["AWS_ACCESS_KEY_ID"], :secret_access_key => ENV["AWS_SECRET_ACCESS_KEY"], :s3_region => "us-east-1",}
  end
end
