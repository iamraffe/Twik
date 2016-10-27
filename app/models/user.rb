class User < ActiveRecord::Base
  enum role: [:user, :designer, :owner]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :user
  end

  devise :invitable, :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :name, presence: true
  has_one :account

end
