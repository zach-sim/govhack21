class AddParsedToKafkaMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :kafka_messages, :parsed, :boolean, :default => false
  end
end
