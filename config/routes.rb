Rails.application.routes.draw do
  constraints(Subdomain) do
    root "menus#index", as: :subdomain_root
    devise_for :users, :controllers => { :invitations => 'users/invitations', :registrations => "users/registrations" }
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

    resources :accounts
  end
end
