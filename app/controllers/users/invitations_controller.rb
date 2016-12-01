# require "byebug"
class Users::InvitationsController < Devise::InvitationsController
  # PUT /resource/invitation
  def update
    raw_invitation_token = update_resource_params[:invitation_token]
    self.resource = accept_resource
    invitation_accepted = resource.errors.empty?

    yield resource if block_given?

    if invitation_accepted
      if Devise.allow_insecure_sign_in_after_accept
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message :notice, flash_message if is_flashing_format?
        resource.update_attributes(subdomain: Apartment::Tenant.current)
        sign_in(resource_name, resource)
        respond_with resource, :location => after_accept_path_for(resource)
      else
        set_flash_message :notice, :updated_not_active if is_flashing_format?
        respond_with resource, :location => new_session_path(resource_name)
      end
    else
      resource.invitation_token = raw_invitation_token
      respond_with_navigational(resource){ render :edit }
    end
  end

  private
    def resource_from_invitation_token
      # byebug
      Apartment::Tenant.switch!(request.subdomain)
      unless params[:invitation_token] && self.resource = resource_class.find_by_invitation_token(params[:invitation_token], true)
        set_flash_message(:alert, :invitation_token_invalid)
        redirect_to after_sign_out_path_for(resource_name)
      end
    end

    def after_invite_path_for(resource)
      user_path current_user
    end
end
