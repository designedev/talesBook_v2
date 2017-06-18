Rails.application.routes.draw do
	root to: 'main#index'
  
	scope :api do
		get "/items/name/count/:NAME" => "items#find_by_name_count"
		get "/items/name/:NAME/:PAGE" => "items#find_by_name"

		get "/items/type/count/:TYPE" => "items#find_by_type_count"
		get "/items/type/:TYPE/:PAGE" => "items#find_by_type"
		
	end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
