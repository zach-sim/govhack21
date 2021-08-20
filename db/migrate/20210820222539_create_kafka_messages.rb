class CreateKafkaMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :kafka_messages do |t|
      t.text :topic
      t.integer :partition
    
      t.datetime :create_time
      t.text :key
      t.integer :offset  
      t.json :value
      
      t.timestamps
    end
  end
end
