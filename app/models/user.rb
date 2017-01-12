class User < ActiveRecord::Base
  acts_as_token_authenticatable
  enum role: [:user, :designer, :owner]
  after_initialize :set_default_role, :if => :new_record?
  has_attached_file :avatar,
  :storage => :s3,
  :s3_credentials => Proc.new{|a| a.instance.s3_credentials },
      :url => "/:subdomain/:id-:subdomain/:style/:basename.:extension",
      :path => ":subdomain/:id-:subdomain/:style/:basename.:extension",
  # :url => "/system/#{Apartment::Tenant.current}/:style_:filename",
  # :path => ":rails_root/public/system/#{Apartment::Tenant.current}/:style_:filename",
  :styles => {
    :thumb => "100x100#" },
  :convert_options => {
    :thumb => "-quality 75 -strip" }
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  Paperclip.interpolates :subdomain do |attachment, style|
    attachment.instance.subdomain
  end

  def s3_credentials
    {:bucket => ENV["S3_BUCKET_NAME"], :access_key_id => ENV["AWS_ACCESS_KEY_ID"], :secret_access_key => ENV["AWS_SECRET_ACCESS_KEY"], :s3_region => "us-east-1",}
  end

  def set_default_role
    # self.subdomain = Apartment::Tenant.current
    self.role ||= :user
  end

  devise :invitable, :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  # validates :name, presence: true
  has_one :account
  has_many :images

  def as_json(options={})
    super(options.merge({:methods => [:avatar, :avatar_thumb_url, :invitation_accepted?]}))
  end

  def avatar_thumb_url
    avatar.url(:thumb)
  end

  def password_match?
     self.errors[:password] << "Password can't be blank" if password.blank?
     self.errors[:password_confirmation] << "Password confirmation can't be blank" if password_confirmation.blank?
     self.errors[:password_confirmation] << "Passwords do not match" if password != password_confirmation
     password == password_confirmation && !password.blank?
  end

  # new function to set the password without knowing the current
  # password used in our confirmation controller.
  def attempt_set_password(params)
    p = {}
    p[:password] = params[:password]
    p[:password_confirmation] = params[:password_confirmation]
    update_attributes(p)
  end

  # new function to return whether a password has been set
  def has_no_password?
    self.encrypted_password.blank?
  end

  # Devise::Models:unless_confirmed` method doesn't exist in Devise 2.0.0 anymore.
  # Instead you should use `pending_any_confirmation`.
  def only_if_unconfirmed
    pending_any_confirmation {yield}
  end

  def password_required?
    # Password is required if it is being set, but not for new records
    if !persisted?
      false
    else
      !password.nil? || !password_confirmation.nil?
    end
  end

  def renew
    update_attibutes(subscription_date: (Date.today + 1.month))
  end
end
