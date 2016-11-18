class SubscriptionsController < ApplicationController
  protect_from_forgery except: :webhook

  def new
  end

  def create
    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken],
      :plan => params[:plan_token],
    )
    current_user.update_attributes(stripe_id: customer.id, subscribed: true, subscription_id: customer.subscriptions.first.id, subscription_end: (Date.today + 1.month))

    redirect_to user_path(current_user)

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to user_path(current_user)
  end

  def update
    subscription = Stripe::Subscription.retrieve(current_user.subscription_id)
    subscription.plan = params[:plan_id]
    subscription.save
  end

  
  def webhook
    event = Stripe::Event.retrieve(params["id"])

    case event.type
      when "invoice.payment_succeeded" #renew subscription
        User.where(stripe_id: event.data.object.customer).first.renew
    end
    render status: :ok, json: "success"
  end
end
