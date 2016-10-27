class Subdomain
  def self.matches?(request)
    request.subdomain.present?
    # case request.subdomain
    # when 'www', '', nil
    #   inverse ? true : false
    # else
    #   inverse ? false : true
    # end
  end
end

class PublicAccess
  def self.matches?(request)
    request.subdomain.blank?
    # case request.subdomain
    # when 'www', '', nil
    #   inverse ? true : false
    # else
    #   inverse ? false : true
    # end
  end
end
