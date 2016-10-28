class Section < ApplicationRecord
  has_many :items
  belongs_to :menu
end
