class CovidLocationOfInterestSyncJob < ApplicationJob
  queue_as :default

  def perform(*args)
    covid_contact_locations_raw_data = KafkaMessage.where(parsed: false, topic: "govhack-covid_contact_locations")
    covid_location_of_interests_mappings = []
    covid_contact_locations_raw_data.find_each do | covid_contact_location |
      formatted_value = JSON.parse(covid_contact_location.value)
      mappings = {
        site: formatted_value["site"],
        alert_details: formatted_value["alert"],
        venue: formatted_value["venue"],
        alert_date: formatted_value["date"],
        alert_times: formatted_value["times"],
        status: formatted_value["status"],
        alert_type: formatted_value["alert_type"],
        latitude: formatted_value["y"],
        longitude: formatted_value["x"],
        created_at: Time.now,
        updated_at: Time.now
        }
      covid_location_of_interests_mappings << mappings
    end
    if covid_contact_locations_raw_data.present?
      CovidLocationOfInterest.insert_all(covid_location_of_interests_mappings)
      covid_contact_locations_raw_data.update_all(parsed: true)
    end
  end
end
