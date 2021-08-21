module Types
  class CovidLocType < Types::BaseObject
    field :id, ID, null: false
    
    field :latitude, Float, null: false
    field :longitude, Float, null: false

    field :alert_date, GraphQL::Types::ISO8601Date, null: false
    field :alert_details, String, null: false
    field :alert_times, String, null: false
    field :venue, String, null: true
    field :site, String, null: true
  end
end
