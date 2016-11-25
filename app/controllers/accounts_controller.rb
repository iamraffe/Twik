class AccountsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:new, :create, :check]
  # skip_before_action :authenticate_user_from_token!, only: [:new, :create, :check]

  def new
    @account = Account.new
    @account.build_owner(role: "owner")
    render template: "accounts/new", layout: 'landing'
  end

  def create
    @account = Account.new(account_params)
    if @account.valid?
      Apartment::Tenant.create(@account.subdomain)
      Apartment::Tenant.switch!(@account.subdomain)
      @account.save
      @account.owner.role = "owner"
      @account.owner.save
      render json: @account.to_json
    else
      render json: {errors: @account.errors, status: 400, ok: false}, :status => :bad_request
    end
  end

  def check
    render json: Account.where(subdomain: params[:subdomain]).count
  end

  private
    def account_params
      params.require(:account).permit(:subdomain, owner_attributes: [:name, :email, :password, :password_confirmation])
    end
end
