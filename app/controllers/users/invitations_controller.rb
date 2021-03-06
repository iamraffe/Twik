# require "byebug"
class Users::InvitationsController < Devise::InvitationsController
  private
    def resource_from_invitation_token
      # byebug
      Apartment::Tenant.switch!(request.subdomain)
      unless params[:invitation_token] && self.resource = resource_class.find_by_invitation_token(params[:invitation_token], true)
        set_flash_message(:alert, :invitation_token_invalid)
        redirect_to after_sign_out_path_for(resource_name)
      end
    end

    def after_accept_path_for(resource)
      root_url
    end

    def after_invite_path_for(resource)
      user_path current_user
    end
end
