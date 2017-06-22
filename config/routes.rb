Rails.application.routes.draw do
	root to: 'main#index'
  
	scope :api do
		get "/items/name/count/:TYPE/:NAME" => "items#find_by_name_count"
		get "/items/name/:TYPE/:NAME/:PAGE" => "items#find_by_name"
		get "/items/types" => "items#all_types"
		
	end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
