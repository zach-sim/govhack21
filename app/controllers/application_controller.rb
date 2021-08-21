class ApplicationController < ActionController::Base
  include ActionView::Helpers::TagHelper
  include ReactOnRailsHelper

  def hello_world
    render html: react_component("HelloWorld", props: { from: 'MARS' }, prerender: Rails.env.production?), layout: true
  end
end
