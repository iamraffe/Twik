Rails.application.routes.draw do
  constraints(Subdomain) do
    root "pages#dashboard", as: :subdomain_root
    
    as :user do
        match '/user/confirmation' => 'users/confirmations#update', :via => :patch, :as => :update_user_confirmation
    end

    devise_for :users, :controllers => { :invitations => 'users/invitations', :registrations => "users/registrations", :confirmations => "users/confirmations" }
    resources :users, only: [:index, :destroy, :update, :show]
    resources :subscriptions, only: [:new, :create]

    resources :images
    
    post '/export', to: "menus#export"

    patch '/users/:id/update-payment-method', to: "users#update_payment_method", as: :update_user_payment

    post '/users/:id/add-payment-method', to: "users#add_payment_method", as: :add_user_payment

    delete '/users/:id/delete-payment-method', to: "users#delete_payment_method", as: :delete_user_payment

    resources :menus do
      post "/export", to: "menus#export"
      resources :uploads
      resources :comments do
        put 'upvote', to: 'comments#upvote'
      end
    end
  end

  constraints(PublicAccess) do
    root "accounts#new"
    get '/accounts/verify', to: "accounts#check"
    resources :accounts
  end
end
