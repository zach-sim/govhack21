class AddNzIdToCovidLocationOfInterests < ActiveRecord::Migration[6.1]
  def change
    add_column :covid_location_of_interests, :nz_id, :string, null: true
    remove_column :covid_location_of_interests, :nz_data, :boolean, default: false
  end
end
