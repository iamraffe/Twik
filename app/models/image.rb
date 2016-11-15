class Image < ApplicationRecord
  has_attached_file :file
  validates_attachment_content_type :file, content_type: /\Aimage\/.*\Z/
  belongs_to :imageable, polymorphic: true
  belongs_to :user

  scope :search_by_title, lambda { |query|
    query.downcase!
   (query ? where(["LOWER(title) ILIKE ?", '%'+ query + '%'])  : {})
  }

  def as_json(options={})
    super(options.merge({:methods => [:file]}))
  end
end
