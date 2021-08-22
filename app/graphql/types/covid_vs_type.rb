module Types
  class CovidVsType < Types::BaseObject
    field :id, ID, null: false
    
    field :latitude, Float, null: false
    field :longitude, Float, null: false

    field :name, String, null: true
    field :url, String, null: true
  end
end
