Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root 'articles#index'
  resource :profile, only: [:show, :create] do
    scope module: :profile_relation do
      resources :followings, only: [:index]
      resources :followers, only: [:index]
    end
  end
  resources :articles do
    resource :like, only: [:show, :create, :destroy]
    resources :comments, only: [:index, :create]
    resource :comment, only: [:show]
  end
  resources :accounts, only: [:show] do
    resource :status, only: [:show]
    resource :follow, only: [:create]
    resource :unfollow, only: [:create]
    scope module: :accounts_relation do
      resources :followings, only: [:index]
      resources :followers, only: [:index]
    end
  end
end
