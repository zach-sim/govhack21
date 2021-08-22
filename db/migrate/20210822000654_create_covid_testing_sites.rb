class CreateCovidTestingSites < ActiveRecord::Migration[6.1]
  def change
    create_table :covid_testing_sites do |t|
      t.float :latitude
      t.float :longitude

      t.text :location
      t.integer :loc_id

      t.text :name
      t.text :url

      t.timestamps
    end
  end
end
