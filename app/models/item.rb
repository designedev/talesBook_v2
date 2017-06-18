class Item < ActiveRecord::Base
    def self.cdn
        #set cloudinary config..
        Cloudinary.config do |config|
            config.cloud_name = 'dd5oaoj8c'
            config.api_key = '513352766825744'
            config.api_secret = 'QXGbgDei66p7ZRVncE9iBbp8m7w'
            config.cdn_subdomain = true
        end

        
        items = Item.all
        items.each { |item| 
            if (item.IMAGE != "" && (!item.IMAGE.start_with? "http://res"))
                item.IMAGE = Cloudinary::Uploader.upload(item.IMAGE)['url']
  	            item.save
            end
        }
    end
end
