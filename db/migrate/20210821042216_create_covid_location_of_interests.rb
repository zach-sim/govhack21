class CreateCovidLocationOfInterests < ActiveRecord::Migration[6.1]
  def change
    create_table :covid_location_of_interests do |t|
      t.string :site
      t.text :alert_details
      t.date :alert_date
      t.text :alert_times
      t.string :status
      t.string :alert_type
      t.float :latitude
      t.float :longitude

      t.timestamps
    end


  end
end
