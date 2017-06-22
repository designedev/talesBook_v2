require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TalesBookV2
  class Application < Rails::Application
    config.assets.paths << Rails.root.join('./ng/node_modules')
    config.action_controller.perform_caching = true
    config.cache_store = :memory_store, { size: 8.megabytes }

  end
end
