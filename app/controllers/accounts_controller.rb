class AccountsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:new, :create, :check, :signin, :find]
  # skip_before_action :authenticate_user_from_token!, only: [:new, :create, :check]

  def new
    @account = Account.new
    @account.build_owner(role: "owner")
    render template: "accounts/new", layout: 'landing'
  end

  def signin
    render template: "accounts/signin", layout: 'devise'
  end

  def find
    @account = Account.where(subdomain: params[:subdomain]).first
    if @account.nil?
      flash[:alert] = "Whoops! We are unable find a Twik account by that name"
      redirect_to :back
    else
      redirect_to new_user_session_url(subdomain: @account.subdomain)
    end
  end

  def create
    @account = Account.new(account_params)
    if @account.valid?
      Apartment::Tenant.create(@account.subdomain)
      Apartment::Tenant.switch!(@account.subdomain)
      @account.save
      @account.owner.role = "owner"
      @account.owner.subdomain = @account.subdomain
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
