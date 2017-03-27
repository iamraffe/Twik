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

module Twik
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.autoload_paths += %W(#{config.root}/lib)
    config.to_prepare do
      Devise::Mailer.layout "layouts/mailer" # email.haml or email.erb
    end
    Raven.configure do |config|
      config.dsn = 'https://c5960e443be449da855c38b10e58baac:0f2f16b8b49b45f7a0e2853585f661fa@sentry.io/152509'
      config.environments = ['production']
    end
  end
end
