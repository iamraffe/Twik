class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  validates :commentable, presence: true
  has_ancestry

  def upvote
    update_attributes(rank: comment.rank.to_i + 1)
  end
end
