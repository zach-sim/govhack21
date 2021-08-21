Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'application#map'

  if Rails.env.production?
    require 'sidekiq/web'
    # TODO: authenticate for this or remove
    mount Sidekiq::Web => "/sidekiq"
  end
end
