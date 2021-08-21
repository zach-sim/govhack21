class ApplicationController < ActionController::Base
  def hello_world
    render component: 'HelloWorld', props: { from: 'MARS' }, prerender: true
  end
end
