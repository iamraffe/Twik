Rails.application.routes.draw do
  constraints(Subdomain) do
    root "pages#dashboard", as: :subdomain_root
    
    as :user do
        match '/user/confirmation' => 'users/confirmations#update', :via => :patch, :as => :update_user_confirmation
    end

    devise_for :users, :controllers => { :invitations => 'users/invitations', :registrations => "users/registrations", :confirmations => "users/confirmations" }
    resources :users, only: [:index, :destroy, :update]
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
