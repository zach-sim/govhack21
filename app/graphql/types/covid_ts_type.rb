module Types
  class CovidTsType < Types::BaseObject
    field :id, ID, null: false
    
    field :latitude, Float, null: false
    field :longitude, Float, null: false

    field :name, String, null: false
    field :url, String, null: false
  end
end
