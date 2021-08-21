# == Schema Information
#
# Table name: kafka_messages
#
#  id          :integer          not null, primary key
#  topic       :text
#  partition   :integer
#  create_time :datetime
#  key         :text
#  offset      :integer
#  value       :json
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  parsed      :boolean          default(FALSE)
#
class KafkaMessage < ApplicationRecord
end
