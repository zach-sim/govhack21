class AddVenueToCovidLocationOfInterests < ActiveRecord::Migration[6.1]
  def change
    add_column :covid_location_of_interests, :venue, :string
  end
end
