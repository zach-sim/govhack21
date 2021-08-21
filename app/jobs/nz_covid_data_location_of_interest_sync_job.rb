require 'faraday'
class - < ApplicationJob
  queue_as :default

  def perform(month_year="august-2021", *args)
    url = "https://raw.githubusercontent.com/minhealthnz/nz-covid-data/main/locations-of-interest/#{month_year}/locations-of-interest.geojson"
    response = Faraday.get url
    data = JSON.parse(response.body)
    features = data["features"]
    covid_location_of_interests_mappings = []
    features.each do |feature|
      start_time = feature["properties"]["Start"].to_time
      end_time = feature["properties"]["End"].to_time
      event_time_duration = start_time.to_s+ " - "  + end_time.to_s

      mappings = {
         site: feature["properties"]["Location"],
         alert_details: feature["properties"]["Information"],
         venue: feature["properties"]["Event"],
         alert_date: feature["properties"]["Start"].to_date,
         alert_times: event_time_duration,
         status: "NA",
         alert_type: "NA",
         latitude: feature["geometry"]["coordinates"][1],
         longitude: feature["geometry"]["coordinates"][0],
         created_at: Time.now,
         updated_at: Time.now,
         nz_data: true
      }
      covid_location_of_interests_mappings << mappings

    end
    if covid_location_of_interests_mappings.present?
      CovidLocationOfInterest.insert_all(covid_location_of_interests_mappings)
    end
  end
end
