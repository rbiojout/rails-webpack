Rails.application.routes.draw do
  get 'static/home'

  get 'static/faq'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static#home'
end
