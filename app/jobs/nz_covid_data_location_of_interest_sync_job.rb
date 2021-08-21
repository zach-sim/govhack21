require 'faraday'
class NzCovidDataLocationOfInterestSyncJob < ApplicationJob
  queue_as :default

  def perform(month_year="august-2021", *args)
    url = "https://raw.githubusercontent.com/minhealthnz/nz-covid-data/main/locations-of-interest/#{month_year}/locations-of-interest.geojson"
    response = Faraday.get url
    data = JSON.parse(response.body)
    features = data["features"]
    current_nz_ids = []
    features.each do |feature|
      start_time = feature["properties"]["Start"].to_time
      end_time = feature["properties"]["End"].to_time
      event_time_duration = start_time.to_s+ " - "  + end_time.to_s

      nz_id = feature["properties"]["id"]
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
      }

      record = CovidLocationOfInterest.where(nz_id: nz_id).first_or_initialize
      record.update!(mappings)
      current_nz_ids << nz_id
    end
    CovidLocationOfInterest.where.not(nz_id: nil).where.not(nz_id: current_nz_ids).delete_all
  end
end
