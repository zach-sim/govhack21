require 'faraday'
require 'csv'
class VicCovidTestingSitesJob < ApplicationJob
  queue_as :default

  def perform
    url = "https://pausedatahealth01.blob.core.windows.net/testsitemaster/testingsitedata/TestSitesData.csv"
    response = Faraday.get url
    body = response.body.encode('UTF-8', invalid: :replace, undef: :replace, replace: '')
    results = CSV.parse(body, headers: true)
    
    ids = []
    results.each do |result|
      id = result['Site_ID']
      record = CovidTestingSite.where(location: 'VIC', loc_id: id).first_or_initialize
      record.update(
        latitude: result['Latitude'].to_f,
        longitude: result['Longitude'].to_f,
        name: result['Site_Name'],
        url: result["Website"].presence,
      )
      ids << id
    end
    CovidTestingSite.where(location: 'VIC').where.not(loc_id: ids).delete_all
  end
end
