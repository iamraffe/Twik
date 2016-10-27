class Upload < ActiveRecord::Base
  belongs_to :mediable, polymorphic: true
  has_attached_file :mediable
  validates_attachment_content_type :mediable, content_type: /\Aimage\/.*\Z/
  # validates_attachment_file_name :mediable, matches: [/png\Z/, /jpe?g\Z/]
end
