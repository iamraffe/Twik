class Account < ActiveRecord::Base
  RESTRICTED_SUBDOMAINS = ['www', 'ftp', 'mail']

  validates :subdomain, presence: true,
                        uniqueness: { case_sensitive: false },
                        format: { with: /\A[\w\-]+\Z/i, message: "Contains invalid characters" },
                        exclusion: { in: RESTRICTED_SUBDOMAINS, message: "Subdomain restricted" }

  before_validation :downcase_subdomain

  before_save :downcase_subdomain

  belongs_to :owner, class_name: "User"

  validates :owner, presence: {message: "Owner can't be blank!"}

  after_create :copy_templates

  accepts_nested_attributes_for :owner

  private
    def downcase_subdomain
      self.subdomain = self.subdomain.downcase
    end

    def copy_templates
      Apartment::Tenant.switch!('public')
      @canon_templates = Template.where(canon: true).load
      Apartment::Tenant.switch!(self.subdomain)
      Template.create(@canon_templates.to_a.map(&:serializable_hash))
    end
end
