class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  protect_from_forgery with: :null_session, only: Proc.new { |c| c.request.format.json? }
  # protect_from_forgery with: :exception
  before_action :load_schema
  before_action :authenticate_user!
  before_action :authenticate_user_from_token!, unless: :devise_controller?
  before_action :set_mailer_host
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:accept_invitation, keys: [:name, :role])
      devise_parameter_sanitizer.permit(:invite, keys: [:name, :role])
    end

  private

    def load_schema
      Apartment::Tenant.switch!('public')
      return unless request.subdomain.present?

      if current_account
        Apartment::Tenant.switch!(current_account.subdomain)
      else
        redirect_to root_url(subdomain: false)
      end
    end

    def set_mailer_host
      subdomain = current_account ? "#{current_account.subdomain}." : ""
      ActionMailer::Base.default_url_options[:host] = "#{subdomain}twik.us"
    end

    def current_account
      @current_account ||= Account.where(subdomain: request.subdomain).first
    end
    helper_method :current_account

    def after_sign_out_path_for(resource_or_scope)
      new_user_session_path
    end

    def after_accept_path_for(resource)
      users_path
    end

    def user_not_authorized
      flash[:alert] = "Access denied"
      redirect_to (request.referrer || root_path)
    end
end
