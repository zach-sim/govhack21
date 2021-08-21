class CovidLocationOfInterestSyncJob < ApplicationJob
  queue_as :default

  def perform(*args)
    covid_contact_locations_raw_data = KafkaMessage.where(parsed: false, topic: "govhack-covid_contact_locations")
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
        }
      CovidLocationOfInterest.create!(mappings)
      covid_contact_location.update!(parsed: true)
    end
  end
end
