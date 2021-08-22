require 'faraday'
require 'csv'
class NswCovidTestingSitesJob < ApplicationJob
  queue_as :default

  def perform
    url = "https://data.nsw.gov.au/data/dataset/21c72b00-0834-464d-80f1-75fec38454ce/resource/85da884f-a9f5-4cb3-95e8-d6b81b0d2e3a/download/nsw-health-covid-19-test-clinics-20210822.csv"
    response = Faraday.get url
    results = CSV.parse(response.body, headers: true)
    
    CovidTestingSite.where(location: 'NSW').delete_all
    data = results.map do |result|
      now = DateTime.now
      {
        location: 'NSW',
        latitude: result['Latitude'].to_f,
        longitude: result['Longitude'].to_f,
        name: result['Title'],
        url: ['Clinic Website'].presence,
        created_at: now,
        updated_at: now,
      }
    end
    CovidTestingSite.insert_all!(data)
  end
end
