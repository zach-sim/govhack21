class CovidContactLocationConsumer < Racecar::Consumer
  subscribes_to "govhack-covid_contact_locations"

  def process_batch(messages)
    now = DateTime.now
    data = messages.map do |message|
      {
        topic: message.topic,
        partition: message.partition,
        create_time: message.create_time,
        key: message.key,
        offset: message.offset,
        value: message.value,
        created_at: now,
        updated_at: now,
      }
    end
    KafkaMessage.insert_all(data)
    CovidLocationOfInterestSyncJob.enqueue(wait: 10.minutes)
  end
end
