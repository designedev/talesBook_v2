class ItemsController < ApplicationController

    PAGE_SIZE = 5;

    def find_by_name
        name = params[:NAME].strip
        type = params[:TYPE].strip
        page = params[:PAGE] || 1
        puts type
        items = Item.where("NAME like ?", "%#{name}%")
        items = items.where(TYPE: type) if type != "ALL"
        items.order("ID ASC").limit(PAGE_SIZE).offset((page.to_i - 1) * PAGE_SIZE)
        render json: {:data => items.as_json}
    end

    def find_by_name_count
        name = params[:NAME].strip
        type = params[:TYPE].strip
        puts type
        count = Item.where("NAME like ?", "%#{name}%")
        count = count.where(TYPE: type) if type != "ALL"
        count = count.count
        render json: {:count => count}
    end

    def find_by_type
        type = params[:TYPE].strip
        page = params[:PAGE] || 1
        items = Item.where("TYPE like ?", "%#{type}%").order("ID ASC").limit(PAGE_SIZE).offset((page.to_i - 1) * PAGE_SIZE)
        render json: {:data => items.as_json}
    end

    def find_by_type_count
        type = params[:TYPE].strip
        count = Item.where("TYPE like ?", "%#{type}%").count
        render json: {:count => count}
    end

    def all_types
        Rails.cache.fetch("item_type", expires_in: 12.hours) do
            types = Item.group("TYPE").select("TYPE").map{|type| type.TYPE}
            render json: {:types => types}
        end
    end
end
