module Types
  class CovidLocType < Types::BaseObject
    field :id, ID, null: false
    
    field :latitude, Float, null: false
    field :longitude, Float, null: false

    field :alert_details, String, null: false
  end
end
