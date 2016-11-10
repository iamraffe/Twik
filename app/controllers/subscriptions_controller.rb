class SubscriptionsController < ApplicationController
  def new
  end

  def create
    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken],
      :plan => params[:plan_token],
    )
    current_user.update_attributes(stripe_id: customer.id, subscribed: true, subscription_id: customer.subscriptions.first.id)

    redirect_to subdomain_root_path

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_subscription_path
  end

  def update
    subscription = Stripe::Subscription.retrieve(current_user.subscription_id)
    subscription.plan = params[:plan_id]
    subscription.save
  end
end
